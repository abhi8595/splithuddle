import type { Metadata } from "next";
import SplitFallback from "./SplitFallback";

export const metadata: Metadata = {
  title: "Pay your share • SplitHuddle",
  description:
    "Open your payment link and settle up in the browser. No app needed.",
};

export default async function SplitLegacyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // Legacy links used /split/<token>. The fallback fetches by token and
  // renders the balance or claim view based on the link kind.
  return <SplitFallback key={token} token={token} />;
}
