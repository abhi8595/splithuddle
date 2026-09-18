import Image from "next/image";
import {
  MessageCircleOff,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

const ITEMS = [
  {
    icon: <SlidersHorizontal size={20} aria-hidden="true" />,
    title: "More control",
    text: "Keep track of what you owe and what you're owed.",
  },
  {
    icon: <MessageCircleOff size={20} aria-hidden="true" />,
    title: "Less awkwardness",
    text: 'No more "who paid for what?" conversations.',
  },
  {
    icon: <TrendingUp size={20} aria-hidden="true" />,
    title: "Better money habits",
    text: "Spend smarter with insights and budgets.",
  },
  {
    icon: <ShieldCheck size={20} aria-hidden="true" />,
    title: "Simple & secure",
    text: "Your data stays on your device. Always.",
  },
];

export default function RealLife() {
  return (
    <section
      aria-labelledby="real-life-heading"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto grid w-full max-w-[1100px] items-stretch gap-6 px-4 py-14 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        {/* Left visual */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#E9F3FF] to-[#D9F0E2]">
          <div className="relative h-full min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[480px]">
            <Image
              src="/built.png"
              alt="Friends on a trip — SplitHuddle works for trips, roommates and daily life"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>

        {/* Right card */}
        <div className="rounded-2xl bg-[#F2F7FF] p-6 sm:p-8 md:p-10">
          <span className="inline-flex items-center rounded-full bg-[#E1EBFD] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-[#1F6BFF] uppercase">
            Why SplitHuddle
          </span>
          <h2
            id="real-life-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-[#0B2B5B] md:text-[36px] md:leading-[1.15]"
          >
            Built for real life
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-slate-500">
            Whether it&apos;s a weekend trip, your home, or daily expenses,
            SplitHuddle adapts to your life — not the other way around.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE8FD] text-[#1F6BFF]">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[15px] font-bold text-[#16264A]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
