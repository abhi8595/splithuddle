import Image from "next/image";
import {
  MessageCircle,
  BellOff,
  Zap,
} from "lucide-react";

const MINI = [
  {
    icon: <MessageCircle size={20} aria-hidden="true" />,
    circle: "bg-[#22C15E] text-white",
    label: "Any chat app",
  },
  {
    icon: <BellOff size={20} aria-hidden="true" />,
    circle: "bg-[#E8F0FE] text-[#1F6BFF]",
    label: "No install",
  },
  {
    icon: <Zap size={20} aria-hidden="true" />,
    circle: "bg-[#E8F0FE] text-[#1F6BFF]",
    label: "Instant payments",
  },
];

export default function Spotlight() {
  return (
    <section
      aria-labelledby="spotlight-heading"
      className="scroll-mt-20 bg-[#F4F9FF]"
    >
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2">
        {/* Left copy */}
        <div className="max-w-[520px]">
          <span className="inline-flex items-center rounded-full bg-[#DFF7EA] px-4 py-1.5 text-[12px] font-bold tracking-[0.08em] text-[#0B7A55] uppercase">
            No-app friend spotlight
          </span>
          <h2
            id="spotlight-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-balance text-[#0B2B5B] md:text-[38px] md:leading-[1.15]"
          >
            Your friends don&rsquo;t need SplitHuddle to split with you.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-slate-500">
            Create a split, share it through any chat app, and let your friend
            see exactly what they owe. They can settle their share without
            installing SplitHuddle.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {MINI.map((m) => (
              <li key={m.label} className="flex flex-col items-start gap-2">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${m.circle}`}
                >
                  {m.icon}
                </span>
                <span className="text-[13px] font-semibold text-[#16264A]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right visual: no-app friend view */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#D9F4E3] to-[#BDEBD2]"
          />
          <Image
            src="/noappsection.png"
            alt="Friend view without the app showing what they owe and pay options"
            width={1024}
            height={768}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="relative h-auto w-full rounded-2xl object-contain drop-shadow-[0_24px_60px_rgba(11,43,91,0.25)]"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
