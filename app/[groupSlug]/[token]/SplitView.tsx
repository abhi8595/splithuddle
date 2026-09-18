"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DISPUTE_MAX_LENGTH,
  SplitFetchError,
  buildUpiLink,
  disputeSplit,
  formatAmount,
  getSplitLink,
  markPaid,
  prettyPrintSlug,
  type Participant,
  type SplitLinkPublicData,
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
  | { status: "bad"; kind: "invalid" | "offline" | "http" | "config" | "expired" | "revoked"; message: string }
  | { status: "ready"; data: SplitLinkPublicData };

type DoneState = { type: "paid" } | { type: "disputed" } | null;

function storageKey(token: string) {
  return `splithuddle:participant:${token}`;
}

function statusBadge(status: Participant["status"]): string {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "disputed":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "accepted":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "viewed":
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

export default function SplitView({
  groupSlug,
  token,
  initialData,
}: {
  groupSlug?: string;
  token: string;
  /** Pre-fetched link (used by the /split/[token] fallback so it fetches once). */
  initialData?: SplitLinkPublicData;
}) {
  const groupName = useMemo(
    () => (groupSlug ? prettyPrintSlug(groupSlug) : null),
    [groupSlug]
  );
  const [loadState, setLoadState] = useState<LoadState>(
    initialData ? { status: "ready", data: initialData } : { status: "loading" }
  );
  const [retryCount, setRetryCount] = useState(0);

  // Note: <SplitView> is keyed by token (see page.tsx), so mounting state
  // starts fresh per link — no reset effect needed on token change.
  const [participantId, setParticipantId] = useState<string | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(storageKey(token));
    } catch {
      return null;
    }
  });
  const [done, setDone] = useState<DoneState>(null);

  const [payPending, setPayPending] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputePending, setDisputePending] = useState(false);
  const [disputeError, setDisputeError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState({ status: "loading" });
    try {
      const data = await getSplitLink(token);
      if (data.status === "expired") {
        setLoadState({
          status: "bad",
          kind: "expired",
          message: "This payment link has expired. Please ask the group owner for a fresh link.",
        });
        return;
      }
      if (data.status === "revoked") {
        setLoadState({
          status: "bad",
          kind: "revoked",
          message: "This payment link was cancelled by the group owner. Check with them for the latest details.",
        });
        return;
      }
      setLoadState({ status: "ready", data });
    } catch (err) {
      if (err instanceof SplitFetchError) {
        if (err.kind === "invalid") {
          setLoadState({
            status: "bad",
            kind: "invalid",
            message: "We couldn't find this payment link. It may be mistyped or no longer shared - ask the group owner for a fresh link.",
          });
        } else if (err.kind === "offline") {
          setLoadState({
            status: "bad",
            kind: "offline",
            message: "You appear to be offline. Check your connection and try again.",
          });
        } else if (err.kind === "config") {
          setLoadState({ status: "bad", kind: "config", message: err.message });
        } else {
          setLoadState({
            status: "bad",
            kind: "http",
            message: "Something went wrong loading this link. Please try again.",
          });
        }
      } else {
        setLoadState({
          status: "bad",
          kind: "http",
          message: "Something went wrong loading this link. Please try again.",
        });
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

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  const data = loadState.status === "ready" ? loadState.data : null;
  const participant: Participant | null = useMemo(() => {
    if (!data) return null;
    return data.participants.find((p) => p.memberId === participantId) ?? null;
  }, [data, participantId]);

  // Surface already-settled states without asking the guest to act again.
  const settled: DoneState = useMemo(() => {
    if (done) return done;
    if (participant?.status === "paid") return { type: "paid" };
    if (participant?.status === "disputed") return { type: "disputed" };
    return null;
  }, [done, participant]);

  const chooseParticipant = useCallback(
    (id: string) => {
      setParticipantId(id);
      setDone(null);
      setPayError(null);
      setDisputeOpen(false);
      setDisputeError(null);
      try {
        localStorage.setItem(storageKey(token), id);
      } catch {
        // Storage is a convenience only; ignore failures.
      }
    },
    [token]
  );

  const switchName = useCallback(() => {
    setParticipantId(null);
    setDone(null);
    setPayError(null);
    setDisputeOpen(false);
    setDisputeError(null);
    try {
      localStorage.removeItem(storageKey(token));
    } catch {
      // ignore
    }
  }, [token]);

  const handlePaid = useCallback(async () => {
    if (!participant || payPending) return;
    setPayPending(true);
    setPayError(null);
    try {
      await markPaid(token, participant.memberId);
      setDone({ type: "paid" });
    } catch (err) {
      setPayError(
        err instanceof SplitFetchError
          ? err.message
          : "Could not confirm your payment. Please try again."
      );
    } finally {
      setPayPending(false);
    }
  }, [participant, payPending, token]);

  const handleDispute = useCallback(async () => {
    if (!participant || disputePending) return;
    const reason = disputeReason.trim().slice(0, DISPUTE_MAX_LENGTH);
    setDisputePending(true);
    setDisputeError(null);
    try {
      await disputeSplit(token, participant.memberId, reason);
      setDone({ type: "disputed" });
    } catch (err) {
      setDisputeError(
        err instanceof SplitFetchError
          ? err.message
          : "Could not send your note. Please try again."
      );
    } finally {
      setDisputePending(false);
    }
  }, [disputePending, disputeReason, participant, token]);

  const upiLink = useMemo(() => {
    if (!data?.payeeUpiId || !participant) return null;
    return buildUpiLink({
      payeeUpiId: data.payeeUpiId,
      paidByName: data.paidByName,
      amount: participant.shareAmount,
      expenseTitle: data.expenseTitle,
    });
  }, [data, participant]);

  const badCopy =
    loadState.status === "bad" ? linkErrorCopy(loadState.kind) : null;

  return (
    <GuestShell headerRight={groupName ?? undefined}>
      {loadState.status === "loading" && (
        <GuestLoadingSkeleton label="Loading your share…" />
      )}

      {badCopy && (
        <GuestBadState
          title={badCopy.title}
          message={badCopy.message}
          onRetry={retry}
        />
      )}

          {data && settled?.type === "paid" && (
            <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm">
              <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl" aria-hidden="true">
                ✓
              </p>
              <h2 className="mt-3 text-xl font-bold text-slate-900">Paid ✓</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {data.paidByName} will confirm your payment of{" "}
                <strong className="text-slate-900">
                  {participant
                    ? formatAmount(participant.shareAmount, data.currency)
                    : formatAmount(data.totalAmount, data.currency)}
                </strong>
                .
              </p>
              {participant && (
                <button
                  type="button"
                  onClick={switchName}
                  className={`${TOUCH} mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-700`}
                >
                  Not {participant.name}? Switch
                </button>
              )}
            </div>
          )}

          {data && settled?.type === "disputed" && (
            <div className="rounded-2xl border border-amber-200 bg-white p-6 text-center shadow-sm">
              <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl" aria-hidden="true">
                ✎
              </p>
              <h2 className="mt-3 text-xl font-bold text-slate-900">Noted</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                Noted - {data.paidByName} will review and get back to you.
              </p>
              {participant && (
                <button
                  type="button"
                  onClick={switchName}
                  className={`${TOUCH} mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-700`}
                >
                  Not {participant.name}? Switch
                </button>
              )}
            </div>
          )}

          {data && !settled && !participant && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {data.expenseTitle}
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Who are you?
              </h2>
              <p className="mt-1 text-base text-slate-600">
                Pick your name to see what you owe. {data.paidByName} paid for
                everyone upfront.
              </p>
              {data.participants.length === 0 ? (
                <p className="mt-4 text-base text-slate-600">
                  Nobody is listed on this link. Ask the group owner for a
                  fresh link.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {data.participants.map((p) => (
                    <li key={p.memberId}>
                      <button
                        type="button"
                        onClick={() => chooseParticipant(p.memberId)}
                        className={`${TOUCH} flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-left text-base active:border-[#7AA5FF]`}
                      >
                        <span>
                          <span className="block font-semibold text-slate-900">
                            {p.name}
                          </span>
                          <span className="block text-base text-slate-600">
                            Owes {formatAmount(p.shareAmount, data.currency)}
                          </span>
                        </span>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-sm font-medium ${statusBadge(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {data && !settled && participant && (
            <div className="space-y-4">
              {/* Hero card */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {data.expenseTitle}
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Hey {participant.name}, you owe{" "}
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {formatAmount(participant.shareAmount, data.currency)}
                  </span>
                </h2>
                <p className="mt-2 text-base text-slate-600">
                  {data.paidByName} paid {formatAmount(data.totalAmount, data.currency)} upfront.
                </p>
                <button
                  type="button"
                  onClick={switchName}
                  className="mt-2 inline-flex min-h-[44px] items-center text-base font-semibold text-[#1A5FE8] underline-offset-2 active:underline"
                >
                  Not {participant.name}? Switch
                </button>
              </section>

              {/* Why breakdown */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">
                  Why this amount
                </h3>
                {data.lineItems && data.lineItems.length > 0 ? (
                  <ul className="mt-3 divide-y divide-dashed divide-slate-200">
                    {data.lineItems.map((item, i) => (
                      <li
                        key={`${item.title}-${i}`}
                        className="flex items-baseline justify-between gap-3 py-2.5"
                      >
                        <span className="text-base text-slate-700">
                          {item.title}
                        </span>
                        <span className="shrink-0 font-mono text-base font-semibold text-slate-900">
                          {formatAmount(item.share, data.currency)}
                        </span>
                      </li>
                    ))}
                    <li className="flex items-baseline justify-between gap-3 pt-3">
                      <span className="text-base font-bold text-slate-900">
                        Your total
                      </span>
                      <span className="shrink-0 font-mono text-base font-bold text-slate-900">
                        {formatAmount(participant.shareAmount, data.currency)}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    Your share of “{data.expenseTitle}” is{" "}
                    <strong className="text-slate-900">
                      {formatAmount(participant.shareAmount, data.currency)}
                    </strong>
                    .
                  </p>
                )}
              </section>

              {/* Actions */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3">
                  {upiLink && (
                    <a
                      href={upiLink}
                      className={`${TOUCH} inline-flex w-full items-center justify-center rounded-xl bg-[#1F6BFF] px-5 text-base font-semibold text-white active:bg-[#1A5FE8]`}
                    >
                      Pay via UPI • {formatAmount(participant.shareAmount, data.currency)}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handlePaid}
                    disabled={payPending}
                    className={`${TOUCH} inline-flex w-full items-center justify-center rounded-xl border-2 px-5 text-base font-semibold ${
                      payPending
                        ? "cursor-wait border-green-300 bg-green-50 text-green-700"
                        : "border-green-600 bg-white text-green-700 active:bg-green-50"
                    } disabled:opacity-70`}
                  >
                    {payPending ? "Confirming…" : "I've paid"}
                  </button>
                  {upiLink && (
                    <p className="text-center text-base text-slate-500">
                      After paying in your UPI app, come back here and tap
                      “I’ve paid”.
                    </p>
                  )}
                  {payError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-4"
                    >
                      <p className="text-base text-red-800">{payError}</p>
                      <button
                        type="button"
                        onClick={handlePaid}
                        disabled={payPending}
                        className={`${TOUCH} mt-2 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 text-base font-semibold text-white disabled:opacity-70`}
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  {!disputeOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDisputeOpen(true);
                        setDisputeError(null);
                      }}
                      className={`${TOUCH} inline-flex w-full items-center justify-center rounded-xl px-5 text-base font-semibold text-slate-600 underline-offset-2 active:underline`}
                    >
                      Something is wrong
                    </button>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <label
                        htmlFor="dispute-reason"
                        className="block text-base font-semibold text-slate-900"
                      >
                        What’s wrong? <span className="font-normal text-slate-500">(optional)</span>
                      </label>
                      <textarea
                        id="dispute-reason"
                        value={disputeReason}
                        onChange={(e) =>
                          setDisputeReason(e.target.value.slice(0, DISPUTE_MAX_LENGTH))
                        }
                        maxLength={DISPUTE_MAX_LENGTH}
                        rows={3}
                        placeholder="e.g. I wasn’t on this trip, wrong amount…"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1F6BFF] focus:outline-none"
                      />
                      <p className="mt-1 text-right text-sm text-slate-500">
                        {disputeReason.length}/{DISPUTE_MAX_LENGTH}
                      </p>
                      {disputeError && (
                        <p role="alert" className="mt-1 text-base text-red-700">
                          {disputeError}
                        </p>
                      )}
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDisputeOpen(false);
                            setDisputeError(null);
                          }}
                          disabled={disputePending}
                          className={`${TOUCH} inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-700 disabled:opacity-70`}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleDispute}
                          disabled={disputePending}
                          className={`${TOUCH} inline-flex flex-1 items-center justify-center rounded-xl bg-amber-500 px-4 text-base font-semibold text-white active:bg-amber-600 disabled:opacity-70`}
                        >
                          {disputePending ? "Sending…" : "Send"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
    </GuestShell>
  );
}
