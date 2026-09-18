import type { Metadata } from "next";
import ClaimView from "./ClaimView";

export const metadata: Metadata = {
  title: "Tick what you ate • SplitHuddle",
  description:
    "Open your bill link, tick the lines that were yours, and send your picks. No app needed.",
};

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ClaimView key={token} token={token} />;
}
