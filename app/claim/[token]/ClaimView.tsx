"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SplitFetchError,
  formatAmount,
  getClaimLink,
  getClaims,
  submitClaim,
  type ClaimLineItem,
  type ClaimLinkData,
  type ClaimRecord,
} from "@/lib/split";
import {
  GuestBadState,
  GuestLoadingSkeleton,
  GuestShell,
  TOUCH,
  linkErrorCopy,
} from "@/components/guest";

type LoadState =
  | { status: "loading" }
  | {
      status: "bad";
      kind: "invalid" | "offline" | "http" | "config" | "expired" | "revoked";
    }
  | { status: "ready"; data: ClaimLinkData };

/** Only entries WITH a non-empty string id are tickable. */
function tickableLines(data: ClaimLinkData): ClaimLineItem[] {
  const raw = (data.lineItems ?? []) as unknown[];
  return raw.filter(
    (l): l is ClaimLineItem =>
      !!l &&
      typeof l === "object" &&
      typeof (l as { id?: unknown }).id === "string" &&
      ((l as { id: string }).id.length > 0)
  );
}

export default function ClaimView({
  token,
  initialData,
}: {
  token: string;
  /** Pre-fetched link (used by the /split/[token] fallback so it fetches once). */
  initialData?: ClaimLinkData;
}) {
  const singleSlot =
    initialData && initialData.participants.length === 1
      ? initialData.participants[0]
      : null;

  const [loadState, setLoadState] = useState<LoadState>(
    initialData ? { status: "ready", data: initialData } : { status: "loading" }
  );
  const [retryCount, setRetryCount] = useState(0);

  const [memberId, setMemberId] = useState<string | null>(
    singleSlot?.memberId ?? null
  );
  const [guestName, setGuestName] = useState(singleSlot?.name ?? "");
  const [nameTouched, setNameTouched] = useState(false);
  const [ticked, setTicked] = useState<string[]>([]);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);

  const [submitted, setSubmitted] = useState<{
    total: number;
    count: number;
  } | null>(null);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState({ status: "loading" });
    try {
      const data = await getClaimLink(token);
      if (data.status === "expired") {
        setLoadState({ status: "bad", kind: "expired" });
        return;
      }
      if (data.status === "revoked") {
        setLoadState({ status: "bad", kind: "revoked" });
        return;
      }
      setLoadState({ status: "ready", data });
      // Single slot: pre-select it right away.
      if (data.participants.length === 1) {
        setMemberId(data.participants[0].memberId);
        setGuestName(data.participants[0].name);
      }
    } catch (err) {
      if (err instanceof SplitFetchError) {
        if (err.kind === "invalid") setLoadState({ status: "bad", kind: "invalid" });
        else if (err.kind === "offline") setLoadState({ status: "bad", kind: "offline" });
        else if (err.kind === "config") setLoadState({ status: "bad", kind: "config" });
        else setLoadState({ status: "bad", kind: "http" });
      } else {
        setLoadState({ status: "bad", kind: "http" });
      }
    }
  }, [token]);

  useEffect(() => {
    // Skip the fetch when the fallback route already loaded this link.
    // A Retry still refetches fresh data.
    if (initialData && retryCount === 0) return;
    // Fetch-on-mount (+ on Retry) is the intended use of an effect here;
    // completion handlers update state asynchronously, no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [initialData, load, retryCount]);

  // Transparency counts: best-effort, refreshed on load. Failures are
  // ignored on purpose - ticking works fine without counts.
  useEffect(() => {
    let live = true;
    getClaims(token)
      .then((res) => {
        if (live) setClaims(res.claims);
      })
      .catch(() => {
        // ignore - counts stay hidden, ticks still work
      });
    return () => {
      live = false;
    };
  }, [token, retryCount]);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  const data = loadState.status === "ready" ? loadState.data : null;
  const slot = useMemo(
    () => data?.participants.find((p) => p.memberId === memberId) ?? null,
    [data, memberId]
  );
  const lines = useMemo(() => (data ? tickableLines(data) : []), [data]);
  const amountById = useMemo(
    () => new Map(lines.map((l) => [l.id, l.amount])),
    [lines]
  );

  // Per-line "others picked this" counts, excluding the guest's own slot.
  // Other guests' names are NEVER shown.
  const otherCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of claims) {
      if (!c || c.memberId === memberId) continue;
      for (const id of c.lineIds ?? []) {
        m.set(id, (m.get(id) ?? 0) + 1);
      }
    }
    return m;
  }, [claims, memberId]);

  const tickedTotal = useMemo(
    () => ticked.reduce((sum, id) => sum + (amountById.get(id) ?? 0), 0),
    [ticked, amountById]
  );

  const chooseSlot = useCallback(
    (id: string) => {
      const next = data?.participants.find((p) => p.memberId === id) ?? null;
      setMemberId(id);
      setSubmitError(null);
      if (!next) return;
      // Keep a hand-typed name; otherwise follow the new slot's name.
      if (!nameTouched) setGuestName(next.name);
    },
    [data, nameTouched]
  );

  const toggleLine = useCallback((id: string) => {
    setTicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const displayName = (guestName.trim() || slot?.name || "").trim();
  const canSubmit = !!slot && displayName.length > 0 && ticked.length > 0 && !pending;

  const handleSubmit = useCallback(async () => {
    if (!slot || pending) return;
    const name = (guestName.trim() || slot.name).trim();
    if (!name || ticked.length === 0) return;
    setPending(true);
    setSubmitError(null);
    try {
      await submitClaim(token, {
        memberId: slot.memberId,
        guestName: name,
        lineIds: ticked,
      });
      setSubmitted({ total: tickedTotal, count: ticked.length });
      setSubmittedOnce(true);
    } catch (err) {
      setSubmitError(
        err instanceof SplitFetchError
          ? err.message
          : "Could not send your picks. Please try again."
      );
    } finally {
      setPending(false);
    }
  }, [guestName, pending, slot, ticked, tickedTotal, token]);

  const badCopy =
    loadState.status === "bad" ? linkErrorCopy(loadState.kind) : null;

  return (
    <GuestShell headerNote="No app needed">
      {loadState.status === "loading" && (
        <GuestLoadingSkeleton label="Loading the bill…" />
      )}

      {badCopy && (
        <GuestBadState
          title={badCopy.title}
          message={badCopy.message}
          onRetry={retry}
        />
      )}

      {data && submitted && (
        <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm">
          <p
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl"
            aria-hidden="true"
          >
            ✓
          </p>
          <h2 className="mt-3 text-xl font-bold text-slate-900">Sent ✓</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            {data.paidByName} will approve your picks.
          </p>
          <p className="mt-3 font-mono text-2xl font-extrabold text-slate-900">
            {formatAmount(submitted.total, data.currency)}
          </p>
          <p className="mt-1 text-base text-slate-500">
            {submitted.count} {submitted.count === 1 ? "item" : "items"} claimed
            as {displayName}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className={`${TOUCH} mt-5 inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-5 text-base font-semibold text-slate-800`}
          >
            Edit picks
          </button>
        </div>
      )}

      {data && !submitted && (
        <div className="space-y-4">
          {/* Title hero */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              {data.expenseTitle}
            </h1>
            <p className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-slate-900">
              {formatAmount(data.totalAmount, data.currency)}
            </p>
            <p className="mt-1 text-base text-slate-600">
              Paid by {data.paidByName} - tick the lines that were yours.
            </p>
          </section>

          {/* Identity */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Who are you?</h2>
            {data.participants.length === 0 ? (
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                This link has no name slots on it. Ask the owner for a fresh
                link.
              </p>
            ) : data.participants.length === 1 ? (
              <p className="mt-2 text-base text-slate-600">
                Paying as{" "}
                <strong className="text-slate-900">
                  {data.participants[0].name}
                </strong>
              </p>
            ) : !slot ? (
              <>
                <p className="mt-1 text-base text-slate-600">
                  Pick your slot to start ticking.
                </p>
                <ul className="mt-3 space-y-2">
                  {data.participants.map((p) => (
                    <li key={p.memberId}>
                      <button
                        type="button"
                        onClick={() => chooseSlot(p.memberId)}
                        className={`${TOUCH} flex w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-left text-base font-semibold text-slate-900`}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMemberId(null);
                  setSubmitError(null);
                }}
                className="mt-2 inline-flex min-h-[44px] items-center text-base font-semibold text-[#1A5FE8] underline-offset-2"
              >
                Paying as {slot.name} - switch
              </button>
            )}

            {slot && (
              <div className="mt-3">
                <label
                  htmlFor="claim-guest-name"
                  className="block text-base font-semibold text-slate-900"
                >
                  Your name
                </label>
                <input
                  id="claim-guest-name"
                  type="text"
                  value={guestName}
                  autoComplete="name"
                  maxLength={60}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setNameTouched(true);
                  }}
                  placeholder={slot.name}
                  className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1F6BFF] focus:outline-none"
                />
              </div>
            )}
          </section>

          {/* Bill lines */}
          {slot && (
            <section
              aria-label="Bill lines"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">
                Tick what you ate
              </h2>
              {lines.length === 0 ? (
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  This link has no bill lines to tick. Ask the owner for a
                  fresh link.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {lines.map((line) => {
                    const checked = ticked.includes(line.id);
                    const others = otherCounts.get(line.id) ?? 0;
                    return (
                      <li key={line.id}>
                        <label
                          className={`${TOUCH} flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2 ${
                            checked
                              ? "border-[#1F6BFF] bg-[#EAF1FF]"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleLine(line.id)}
                            className="h-5 w-5 shrink-0 accent-[#1F6BFF]"
                            aria-label={`${line.title}, ${formatAmount(line.amount, data.currency)}`}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-semibold text-slate-900">
                              {line.title}
                            </span>
                            {others > 0 && (
                              <span className="block text-sm text-slate-500">
                                {others === 1
                                  ? "1 other picked this"
                                  : `×${others} others picked this`}
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 font-mono text-base font-semibold text-slate-900">
                            {formatAmount(line.amount, data.currency)}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>
      )}

      {/* Sticky live total + submit */}
      {data && !submitted && slot && lines.length > 0 && (
        <div
          className="sticky bottom-0 -mx-4 mt-4 border-t border-slate-200 bg-white/95 px-4 pt-3 backdrop-blur"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto w-full max-w-[600px]">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-base text-slate-600">
                Your total{" "}
                <span className="text-slate-400">
                  ({ticked.length} {ticked.length === 1 ? "item" : "items"})
                </span>
              </p>
              <p
                className="font-mono text-xl font-extrabold text-slate-900"
                aria-live="polite"
              >
                {formatAmount(tickedTotal, data.currency)}
              </p>
            </div>
            {submitError && (
              <div
                role="alert"
                className="mt-2 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <p className="text-base text-red-800">{submitError}</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={pending}
                  className={`${TOUCH} mt-2 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 text-base font-semibold text-white disabled:opacity-70`}
                >
                  Try again
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`${TOUCH} mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#1F6BFF] px-5 text-base font-semibold text-white hover:bg-[#1A5FE8] disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {pending
                ? "Sending…"
                : submittedOnce
                  ? "Update picks"
                  : "Send my picks"}
            </button>
            {!displayName || ticked.length === 0 ? (
              <p className="mt-1 pb-1 text-center text-sm text-slate-500">
                {!displayName
                  ? "Add your name above to send."
                  : "Tick at least one line to send."}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </GuestShell>
  );
}
