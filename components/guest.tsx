import type { ReactNode } from "react";

/**
 * Shared chrome for public guest pages (balance + claim).
 * One light theme, one accent (brand #1F6BFF), same cards/buttons/spacing.
 */

export const TOUCH = "min-h-[44px]";

export function GuestShell({
  headerRight,
  headerNote = "No app needed to pay",
  children,
}: {
  headerRight?: string;
  headerNote?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-[#1A5FE8]"
      >
        Skip to content
      </a>
      <div className="mx-auto w-full max-w-[600px] px-4 pb-10 pt-5 text-base">
        <header className="flex items-center justify-between gap-3">
          <p className="text-lg font-extrabold tracking-tight">SplitHuddle</p>
          {headerRight && (
            <p
              className="truncate text-base font-medium text-slate-600"
              title={headerRight}
            >
              {headerRight}
            </p>
          )}
        </header>
        <p className="mt-1 text-base text-slate-500">{headerNote}</p>

        <main id="main" className="mt-4">{children}</main>

        <footer className="mt-6 text-center">
          <a
            href="#"
            className={`${TOUCH} inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-800`}
          >
            Get SplitHuddle app
          </a>
          <p className="mt-2 text-sm text-slate-400">
            Split bills with friends, no spreadsheets.
          </p>
        </footer>
      </div>
    </div>
  );
}

export function GuestBadState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl" aria-hidden="true">
        {title.includes("offline") || title.includes("Offline")
          ? "📡"
          : title.includes("Invalid")
            ? "🔗"
            : "⏸️"}
      </p>
      <h2 className="mt-3 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-base leading-relaxed text-slate-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className={`${TOUCH} mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#1F6BFF] px-5 text-base font-semibold text-white hover:bg-[#1A5FE8]`}
      >
        Retry
      </button>
    </div>
  );
}

/** Friendly full-page copy for a failed link load. Shared by both guest pages. */
export function linkErrorCopy(kind: string): { title: string; message: string } {
  switch (kind) {
    case "invalid":
      return {
        title: "Invalid link",
        message:
          "We couldn't find this link. It may be mistyped or no longer shared - ask the owner for a fresh link.",
      };
    case "offline":
      return {
        title: "You're offline",
        message: "Check your connection and try again.",
      };
    case "expired":
      return {
        title: "Link expired",
        message:
          "This link has expired. Please ask the owner for a fresh link.",
      };
    case "revoked":
      return {
        title: "Link cancelled",
        message:
          "This link was cancelled by the owner. Check with them for the latest details.",
      };
    default:
      return {
        title: "Something went wrong",
        message: "Something went wrong loading this link. Please try again.",
      };
  }
}

export function GuestLoadingSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-label={label}>
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-6 w-48 rounded bg-slate-200" />
        <div className="mt-2 h-12 w-40 rounded bg-slate-200" />
        <div className="mt-5 flex gap-3">
          <div className="h-11 flex-1 rounded-xl bg-slate-200" />
          <div className="h-11 flex-1 rounded-xl bg-slate-200" />
        </div>
      </div>
      <div className="mt-4 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-3 space-y-2">
          <div className="h-5 rounded bg-slate-100" />
          <div className="h-5 rounded bg-slate-100" />
          <div className="h-5 rounded bg-slate-100" />
        </div>
      </div>
      <p className="mt-4 text-center text-base text-slate-500">{label}</p>
    </div>
  );
}
