// Shared types + API client for the public group-share guest page.
// Backend is already live; these endpoints need no auth.
// Base URL comes ONLY from NEXT_PUBLIC_SPLITO_FUNCTIONS_URL.

export interface Participant {
  memberId: string;
  name: string;
  shareAmount: number;
  status: "pending" | "viewed" | "accepted" | "paid" | "disputed";
  isClaimed: boolean;
  disputeReason?: string;
}

export interface BalanceLineItem {
  title: string;
  amount: number;
  share: number;
}

export interface SplitLinkPublicData {
  expenseTitle: string;
  totalAmount: number;
  currency: string; // e.g. "INR"
  paidByName: string;
  participants: Participant[];
  status: "active" | "expired" | "revoked";
  payeeUpiId?: string;
  kind?: "balance";
  lineItems?: BalanceLineItem[];
}

// --- Claim links (/claim/[token]) ---

export interface ClaimLineItem {
  id: string;
  title: string;
  amount: number;
}

export interface ClaimLinkData {
  expenseTitle: string;
  totalAmount: number;
  currency: string; // e.g. "INR"
  paidByName: string;
  participants: Participant[];
  status: "active" | "expired" | "revoked";
  kind?: "claim";
  lineItems?: ClaimLineItem[];
}

/** Either link shape; the /split/[token] fallback routes on `kind`. */
export type AnyLinkData = SplitLinkPublicData | ClaimLinkData;

export function isClaimLink(data: AnyLinkData): data is ClaimLinkData {
  return (data as ClaimLinkData).kind === "claim";
}

export interface ClaimSubmission {
  memberId: string;
  guestName: string;
  lineIds: string[];
}

export interface ClaimRecord {
  memberId: string;
  guestName: string;
  lineIds: string[];
}

export interface ClaimsResponse {
  claims: ClaimRecord[];
}

export type FetchErrorKind = "invalid" | "offline" | "http" | "config";

export class SplitFetchError extends Error {
  kind: FetchErrorKind;
  status?: number;
  constructor(kind: FetchErrorKind, message: string, status?: number) {
    super(message);
    this.kind = kind;
    this.status = status;
  }
}

const TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2; // 2 retries => up to 3 attempts total

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_SPLITO_FUNCTIONS_URL;
  if (!base || base.trim() === "") {
    throw new SplitFetchError(
      "config",
      "Backend URL is not configured (NEXT_PUBLIC_SPLITO_FUNCTIONS_URL)."
    );
  }
  return base.replace(/\/+$/, "");
}

function isOfflineError(err: unknown): boolean {
  if (typeof navigator !== "undefined" && !navigator.onLine) return true;
  // Undici / browsers surface network failures as TypeError: fetch failed
  return err instanceof TypeError;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function requestWithRetries(
  buildUrl: () => string,
  init: RequestInit
): Promise<Response> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetchWithTimeout(buildUrl(), init, TIMEOUT_MS);
    } catch (err) {
      lastError = err;
      // AbortError from our own timeout: retry if attempts remain.
      if (attempt === MAX_RETRIES) break;
      // Small linear backoff so we don't hammer the rate-limited backend.
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Network request failed");
}

/** GET get-split-link?token=<token>. 4xx => invalid/unknown link. */
export async function getAnySplitLink(token: string): Promise<AnyLinkData> {
  const base = getBaseUrl();
  let res: Response;
  try {
    res = await requestWithRetries(
      () => `${base}/get-split-link?token=${encodeURIComponent(token)}`,
      { method: "GET", cache: "no-store" }
    );
  } catch (err) {
    if (isOfflineError(err)) {
      throw new SplitFetchError(
        "offline",
        "You appear to be offline. Check your connection and try again."
      );
    }
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new SplitFetchError(
        "http",
        "The request timed out. Please try again."
      );
    }
    throw new SplitFetchError("http", "Something went wrong. Please retry.");
  }

  if (res.status >= 400 && res.status < 500) {
    throw new SplitFetchError(
      "invalid",
      "This link is invalid or no longer exists.",
      res.status
    );
  }
  if (!res.ok) {
    throw new SplitFetchError(
      "http",
      "Something went wrong loading this link. Please retry.",
      res.status
    );
  }
  return (await res.json()) as AnyLinkData;
}

/** Same fetch, typed for balance links. */
export async function getSplitLink(token: string): Promise<SplitLinkPublicData> {
  return (await getAnySplitLink(token)) as SplitLinkPublicData;
}

/** Same fetch, typed for claim links. */
export async function getClaimLink(token: string): Promise<ClaimLinkData> {
  return (await getAnySplitLink(token)) as ClaimLinkData;
}

/**
 * POST submit-claim { token, memberId, guestName, lineIds }.
 * Resubmitting OVERWRITES previous picks. One-shot: caller disables UI while pending.
 */
export async function submitClaim(
  token: string,
  submission: ClaimSubmission
): Promise<void> {
  const base = getBaseUrl();
  let res: Response;
  try {
    res = await requestWithRetries(() => `${base}/submit-claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        memberId: submission.memberId,
        guestName: submission.guestName,
        lineIds: submission.lineIds,
      }),
    });
  } catch (err) {
    if (isOfflineError(err)) {
      throw new SplitFetchError(
        "offline",
        "You appear to be offline. Check your connection and try again."
      );
    }
    throw new SplitFetchError(
      "http",
      "Could not send your picks. Please try again."
    );
  }
  if (res.status >= 400 && res.status < 500) {
    throw new SplitFetchError(
      "invalid",
      "This link is no longer valid.",
      res.status
    );
  }
  if (!res.ok) {
    throw new SplitFetchError(
      "http",
      "Could not send your picks. Please try again.",
      res.status
    );
  }
}

/**
 * GET get-claims?token=<token>. Best-effort transparency counts.
 * Callers should ignore failures: ticking still works without counts.
 */
export async function getClaims(token: string): Promise<ClaimsResponse> {
  const base = getBaseUrl();
  let res: Response;
  try {
    res = await requestWithRetries(
      () => `${base}/get-claims?token=${encodeURIComponent(token)}`,
      { method: "GET", cache: "no-store" }
    );
  } catch (err) {
    if (isOfflineError(err)) {
      throw new SplitFetchError(
        "offline",
        "You appear to be offline. Check your connection and try again."
      );
    }
    throw new SplitFetchError(
      "http",
      "Could not load other picks. Please try again."
    );
  }
  if (!res.ok) {
    throw new SplitFetchError(
      "http",
      "Could not load other picks. Please try again.",
      res.status
    );
  }
  const body = (await res.json()) as Partial<ClaimsResponse>;
  return { claims: Array.isArray(body.claims) ? body.claims : [] };
}

/** POST mark-paid?token=<token> { participantId }. One-shot: caller disables UI while pending. */
export async function markPaid(
  token: string,
  participantId: string
): Promise<void> {
  const base = getBaseUrl();
  let res: Response;
  try {
    res = await requestWithRetries(
      () => `${base}/mark-paid?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId }),
      }
    );
  } catch (err) {
    if (isOfflineError(err)) {
      throw new SplitFetchError(
        "offline",
        "You appear to be offline. Check your connection and try again."
      );
    }
    throw new SplitFetchError(
      "http",
      "Could not confirm your payment. Please try again."
    );
  }
  if (res.status >= 400 && res.status < 500) {
    throw new SplitFetchError(
      "invalid",
      "This link is no longer valid.",
      res.status
    );
  }
  if (!res.ok) {
    throw new SplitFetchError(
      "http",
      "Could not confirm your payment. Please try again.",
      res.status
    );
  }
}

/** POST dispute-split?token=<token> { participantId, reason? }. */
export async function disputeSplit(
  token: string,
  participantId: string,
  reason?: string
): Promise<void> {
  const base = getBaseUrl();
  let res: Response;
  try {
    res = await requestWithRetries(
      () => `${base}/dispute-split?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, reason: reason ?? "" }),
      }
    );
  } catch (err) {
    if (isOfflineError(err)) {
      throw new SplitFetchError(
        "offline",
        "You appear to be offline. Check your connection and try again."
      );
    }
    throw new SplitFetchError(
      "http",
      "Could not send your note. Please try again."
    );
  }
  if (res.status >= 400 && res.status < 500) {
    throw new SplitFetchError(
      "invalid",
      "This link is no longer valid.",
      res.status
    );
  }
  if (!res.ok) {
    throw new SplitFetchError(
      "http",
      "Could not send your note. Please try again.",
      res.status
    );
  }
}

/** "goa-trip" -> "Goa Trip". Display-only prettifier for the URL slug. */
export function prettyPrintSlug(slug: string): string {
  try {
    const decoded = decodeURIComponent(slug);
    return decoded
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

/** Format an amount with the payload currency, falling back to INR/₹. */
export function formatAmount(amount: number, currency?: string): string {
  const code = (currency || "INR").toUpperCase();
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₹${amount.toFixed(2)}`;
  }
}

/** Build the UPI intent link. Amount is capped at 2 decimals per spec. */
export function buildUpiLink(opts: {
  payeeUpiId: string;
  paidByName: string;
  amount: number;
  expenseTitle: string;
}): string {
  const params = new URLSearchParams({
    pa: opts.payeeUpiId,
    pn: opts.paidByName,
    am: opts.amount.toFixed(2),
    cu: "INR",
    tn: opts.expenseTitle,
  });
  return `upi://pay?${params.toString()}`;
}

export const DISPUTE_MAX_LENGTH = 280;
