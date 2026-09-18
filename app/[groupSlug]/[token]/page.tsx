import type { Metadata } from "next";
import { prettyPrintSlug } from "@/lib/split";
import SplitView from "./SplitView";

type PageParams = { groupSlug: string; token: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { groupSlug } = await params;
  const groupName = prettyPrintSlug(groupSlug);
  return {
    title: `${groupName} • SplitHuddle`,
    description: `Pay your share for ${groupName} - no app needed.`,
  };
}

export default async function GroupSharePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { groupSlug, token } = await params;
  // groupSlug is display-only; everything is fetched by token alone.
  // Never 404 on slug mismatch — titles come from the API payload.
  // key={token} remounts the client view per link so one-shot action
  // state never leaks between links.
  return <SplitView key={token} groupSlug={groupSlug} token={token} />;
}
