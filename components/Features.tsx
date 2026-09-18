import { ArrowRight, Link2, Send, Sparkles } from "lucide-react";
import {
  BarsIcon,
  BotIcon,
  CoinIcon,
  GroupsIcon,
  HomeIcon,
  MemberIcon,
  PieIcon,
  RecurIcon,
  TapIcon,
  UpiIcon,
  WalletIcon,
  WeatherIcon,
} from "@/components/FeatureIcons";
import type { ReactNode } from "react";

const BLUE = "bg-[#2B7FFF]";
const GREEN = "bg-[#22C15E]";
const PURPLE = "bg-[#6C5CE7]";

type Feature = {
  title: string;
  text: string;
  iconBg: string;
  icon: ReactNode;
  accent?: "blue" | "green" | "purple";
};

const HIGHLIGHT: Feature[] = [
  {
    title: "Groups",
    text: "Create groups for trips, roommates, family, events and more.",
    iconBg: BLUE,
    icon: <GroupsIcon />,
    accent: "blue",
  },
  {
    title: "Claim & Split",
    text: "Let everyone claim their share and Split handles the split.",
    iconBg: BLUE,
    icon: <TapIcon />,
    accent: "blue",
  },
  {
    title: "Shared Spaces",
    text: "Keep shared household or recurring expenses organized in one space.",
    iconBg: BLUE,
    icon: <HomeIcon />,
    accent: "blue",
  },
];

const FEATURES: Feature[] = [
  {
    title: "Smart Splitting",
    text: "Equal, percentage, exact amount or item-wise.",
    iconBg: BLUE,
    icon: <PieIcon />,
  },
  {
    title: "Lend & Borrow",
    text: "Track money you've lent or borrowed and keep balances clear.",
    iconBg: BLUE,
    icon: <CoinIcon />,
  },
  {
    title: "Pockets & Budgets",
    text: "Organize personal money and stay on budget.",
    iconBg: BLUE,
    icon: <WalletIcon />,
  },
  {
    title: "Recurring Expenses",
    text: "Track regular expenses automatically.",
    iconBg: PURPLE,
    icon: <RecurIcon />,
    accent: "purple",
  },
  {
    title: "Reports & Insights",
    text: "Track spending with clear reports.",
    iconBg: BLUE,
    icon: <BarsIcon />,
  },
  {
    title: "Ask Split",
    text: "Ask questions about balances, settlements and more.",
    iconBg: BLUE,
    icon: <BotIcon />,
  },
  {
    title: "Money Weather",
    text: "Get a quick view of your current money situation.",
    iconBg: BLUE,
    icon: <WeatherIcon />,
  },
  {
    title: "UPI Settlements",
    text: "Make settling up easier with UPI details.",
    iconBg: BLUE,
    icon: <UpiIcon />,
  },
  {
    title: "Saved Members",
    text: "Save frequent people and add them quickly.",
    iconBg: GREEN,
    icon: <MemberIcon />,
    accent: "green",
  },
  {
    title: "Saved Split Rules",
    text: "Save common splits like 60/40 and reuse them.",
    iconBg: PURPLE,
    icon: (
      <span
        aria-hidden="true"
        className="text-[11px] font-extrabold tracking-tight sm:text-[12px]"
      >
        60/40
      </span>
    ),
    accent: "purple",
  },
];

const accentRing: Record<string, string> = {
  blue: "group-hover:ring-[#2B7FFF]/25",
  green: "group-hover:ring-[#22C15E]/25",
  purple: "group-hover:ring-[#6C5CE7]/25",
};

function SmallCard({ f, index }: { f: Feature; index: number }) {
  return (
    <li
      className={`feature-card group relative flex h-full flex-col rounded-2xl border border-[#E3ECF7] bg-white p-4 shadow-[0_1px_0_rgba(15,40,80,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9DBF3] hover:shadow-[0_16px_40px_-20px_rgba(31,107,255,0.35)] sm:p-5 ${accentRing[f.accent ?? "blue"]}`}
      style={{ animationDelay: `${Math.min(index * 40, 360)}ms` }}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm ring-4 ring-transparent transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${f.iconBg}`}
      >
        {f.icon}
      </span>

      <h3 className="mt-3 text-[15px] font-bold tracking-tight text-[#16264A] sm:text-[16px]">
        {f.title}
      </h3>

      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#64748B] sm:text-[13.5px]">
        {f.text}
      </p>

      <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#9DB4D0] transition-colors duration-300 group-hover:text-[#2B7FFF]">
        Learn more
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </li>
  );
}

function SplitLinksCard() {
  return (
    <li className="feature-card relative col-span-1 overflow-hidden rounded-2xl border border-[#BFE8D0] bg-gradient-to-br from-[#EAF4FF] via-[#E8F7EE] to-[#D5F0E0] p-5 shadow-[0_10px_30px_-18px_rgba(34,193,94,0.45)] sm:col-span-2 sm:p-6 lg:col-span-2 xl:col-span-2">
      {/* soft glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-8 h-36 w-36 rounded-full bg-[#2B7FFF]/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-4 h-28 w-28 rounded-full bg-[#22C15E]/20 blur-2xl"
      />

      <div className="relative z-10 flex h-full min-h-[168px] flex-col sm:min-h-[180px]">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#2B7FFF] text-white shadow-[0_10px_20px_-8px_rgba(43,127,255,0.8)] sm:h-[52px] sm:w-[52px]">
            <Link2 size={24} aria-hidden="true" />
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#0B7A55] shadow-sm backdrop-blur">
            <Sparkles size={12} aria-hidden="true" />
            No app needed
          </span>
        </div>

        <h3 className="relative z-10 mt-4 text-[17px] font-bold tracking-tight text-[#16264A] sm:text-[18px]">
          Split Links
        </h3>

        <p className="relative z-10 mt-1.5 max-w-[28ch] text-[13.5px] leading-relaxed text-[#4B6280] sm:max-w-[32ch] sm:text-[14px]">
          Share a bill with anyone through a simple link — no app required.
        </p>

        <div className="relative z-10 mt-auto flex items-center justify-between pt-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2B7FFF]">
            Create a link
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-lg bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-[#2B7FFF] shadow-sm backdrop-blur">
              split.app/l/…
            </span>
          </div>
        </div>
      </div>

      <Send
        aria-hidden="true"
        size={56}
        fill="currentColor"
        className="animate-float-soft pointer-events-none absolute top-[28%] right-5 text-[#2B7FFF]/90 sm:right-8 sm:top-[30%]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 180 90"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 h-[72px] w-[70%] sm:h-[88px] sm:w-[62%]"
      >
        <path
          d="M0 90 C60 90 95 52 180 42 L180 90 Z"
          fill="#A9E8C4"
          opacity="0.55"
        />
        <path
          d="M0 90 C50 88 75 38 135 26 C160 21 172 20 180 19 L180 90 Z"
          fill="#7BD9A5"
          opacity="0.8"
        />
      </svg>
    </li>
  );
}

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      id="features"
      className="scroll-mt-20 overflow-hidden bg-white"
    >
      {/* subtle top wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(43,127,255,0.08),_transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14 md:py-20 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFF7EA] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-[#0B7A55] uppercase sm:px-4 sm:text-[12px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C15E]" />
              Features
            </span>

            <h2
              id="features-heading"
              className="mt-3 text-[28px] font-extrabold tracking-tight text-balance text-[#0B2B5B] sm:mt-4 sm:text-3xl md:text-[38px] md:leading-[1.15]"
            >
              Everything you need to manage{" "}
              <span className="bg-gradient-to-r from-[#1F6BFF] to-[#22C15E] bg-clip-text text-transparent">
                shared money
              </span>
            </h2>

            <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-slate-500 sm:mt-3 sm:text-[14.5px] md:text-[15px]">
              Split expenses, manage groups, track loans, organize your
              spending, and settle up — all in one place.
            </p>
          </div>

          {/* Decorative aside — tablet+ */}
          <div
            aria-hidden="true"
            className="hidden shrink-0 self-start text-right sm:block md:self-end md:rotate-[4deg]"
          >
            <p className="font-[cursive] text-[16px] leading-tight font-bold text-[#1F6BFF] italic sm:text-[18px]">
              More than just
              <br />
              bill splitting!
            </p>
            <svg
              width="40"
              height="44"
              viewBox="0 0 40 44"
              fill="none"
              className="ml-auto mt-1"
            >
              <path
                d="M32 2C28 14 20 28 6 36M6 36l7-1M6 36l2-7"
                stroke="#1F6BFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Mobile callout chip */}
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D7E6FF] bg-[#F3F8FF] px-3 py-1.5 text-[12px] font-semibold text-[#1F6BFF] sm:hidden">
          <Sparkles size={13} aria-hidden="true" />
          More than just bill splitting
        </p>

        {/* Feature grid
            Mobile: 1 col
            sm: 2 cols
            lg: 3 cols
            xl: 5 cols (matches original wide desktop layout)
        */}
        <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          <SplitLinksCard />

          {HIGHLIGHT.map((f, i) => (
            <SmallCard key={f.title} f={f} index={i + 1} />
          ))}

          {FEATURES.map((f, i) => (
            <SmallCard key={f.title} f={f} index={i + 4} />
          ))}
        </ul>

      
      </div>
    </section>
  );
}
