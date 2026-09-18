"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SplitFetchError,
  getAnySplitLink,
  isClaimLink,
  type AnyLinkData,
  type ClaimLinkData,
  type SplitLinkPublicData,
} from "@/lib/split";
import {
  GuestBadState,
  GuestLoadingSkeleton,
  GuestShell,
  linkErrorCopy,
} from "@/components/guest";
import SplitView from "@/app/[groupSlug]/[token]/SplitView";
import ClaimView from "@/app/claim/[token]/ClaimView";

type RouterState =
  | { status: "loading" }
  | {
      status: "bad";
      kind: "invalid" | "offline" | "http" | "config" | "expired" | "revoked";
    }
  | { status: "ready"; data: AnyLinkData };

/**
 * Legacy fallback: old links used /split/<token>. Fetch once by token,
 * then render the balance view (kind=balance / unset) or the claim view
 * (kind=claim). The pre-fetched payload is passed down so each view
 * does NOT fetch a second time.
 */
export default function SplitFallback({ token }: { token: string }) {
  const [state, setState] = useState<RouterState>({ status: "loading" });
  const [retryCount, setRetryCount] = useState(0);

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await getAnySplitLink(token);
      if (data.status === "expired") {
        setState({ status: "bad", kind: "expired" });
        return;
      }
      if (data.status === "revoked") {
        setState({ status: "bad", kind: "revoked" });
        return;
      }
      setState({ status: "ready", data });
    } catch (err) {
      if (err instanceof SplitFetchError) {
        if (err.kind === "invalid") setState({ status: "bad", kind: "invalid" });
        else if (err.kind === "offline") setState({ status: "bad", kind: "offline" });
        else if (err.kind === "config") setState({ status: "bad", kind: "config" });
        else setState({ status: "bad", kind: "http" });
      } else {
        setState({ status: "bad", kind: "http" });
      }
    }
  }, [token]);

  useEffect(() => {
    // Fetch-on-mount (+ on Retry) is the intended use of an effect here;
    // completion handlers update state asynchronously, no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load, retryCount]);

  if (state.status === "ready") {
    if (isClaimLink(state.data)) {
      return (
        <ClaimView token={token} initialData={state.data as ClaimLinkData} />
      );
    }
    return (
      <SplitView
        token={token}
        initialData={state.data as SplitLinkPublicData}
      />
    );
  }

  const copy = state.status === "bad" ? linkErrorCopy(state.kind) : null;

  return (
    <GuestShell>
      {state.status === "loading" && (
        <GuestLoadingSkeleton label="Loading…" />
      )}
      {copy && (
        <GuestBadState
          title={copy.title}
          message={copy.message}
          onRetry={() => setRetryCount((c) => c + 1)}
        />
      )}
    </GuestShell>
  );
}
