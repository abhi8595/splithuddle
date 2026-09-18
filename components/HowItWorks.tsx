
import {
  ArrowRight,
  Check,
  MessageCircle,
  ReceiptText,
} from "lucide-react";

function StepArrow() {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 flex items-center justify-center py-1 md:w-8 md:shrink-0 md:self-start md:pt-[92px]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6E6FF] bg-white text-[#1F6BFF] shadow-[0_4px_12px_rgba(31,107,255,0.12)]">
        <ArrowRight size={16} className="rotate-90 md:rotate-0" />
      </span>
    </span>
  );
}

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      id="how"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 py-14 text-center md:py-20">
        <span className="inline-flex items-center rounded-full bg-[#E8F0FE] px-4 py-1.5 text-[12px] font-bold tracking-[0.08em] text-[#1F6BFF] uppercase">
          How it works
        </span>
        <h2
          id="how-heading"
          className="mt-4 text-3xl font-extrabold tracking-tight text-balance text-[#0B2B5B] md:text-[40px] md:leading-[1.15]"
        >
          Three steps from bill to paid
        </h2>
        <p className="mx-auto mt-2 max-w-[60ch] text-[15.5px] text-slate-500">
          It&rsquo;s simple, fast and works even if your friends don&rsquo;t
          have the app.
        </p>

        <ol className="relative mt-12 flex flex-col items-stretch gap-1 text-left md:flex-row md:gap-0">
          {/* desktop connector line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[110px] right-[8%] left-[8%] hidden h-px border-t border-dashed border-[#C5D8F5] md:block"
          />

          {/* 1 — Split in the app */}
          <li className="group flex-1 rounded-2xl border border-[#D9E8FA] bg-white p-4 shadow-[0_8px_24px_rgba(15,50,110,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(43,127,255,0.12)]">
            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#EDF4FF]">
              <span className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#2B7FFF] text-[16px] font-extrabold text-white shadow-[0_6px_14px_rgba(43,127,255,0.35)]">
                1
              </span>
              <div
                aria-hidden="true"
                className="absolute h-[96px] w-[150px] rounded-full bg-[#CFE3FF]"
              />
              <div
                aria-hidden="true"
                className="relative transition duration-300 group-hover:scale-[1.04]"
              >
                <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#2B7FFF] text-white shadow-md ring-4 ring-white">
                  <ReceiptText size={30} />
                </div>
              </div>
            </div>
            <div className="px-2 pt-4 pb-1">
              <h3 className="text-[17px] font-bold text-[#16264A]">
                Split in the app
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#64748B]">
                Add expenses, choose group or create a new one.
              </p>
            </div>
          </li>

          <StepArrow />

          {/* 2 — Share on any chat app */}
          <li className="group flex-1 rounded-2xl border border-[#CDEED8] bg-white p-4 shadow-[0_8px_24px_rgba(15,50,110,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(34,193,94,0.12)]">
            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#EAF9F0]">
              <span className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#22C15E] text-[16px] font-extrabold text-white shadow-[0_6px_14px_rgba(34,193,94,0.35)]">
                2
              </span>
              <div
                aria-hidden="true"
                className="absolute h-[104px] w-[140px] -rotate-6 rounded-full bg-[#C4F0D3]"
              />
              <div
                aria-hidden="true"
                className="relative transition duration-300 group-hover:scale-[1.04]"
              >
                <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#22C15E] text-white shadow-md ring-4 ring-white">
                  <MessageCircle size={30} />
                </div>
              </div>
            </div>
            <div className="px-2 pt-4 pb-1">
              <h3 className="text-[17px] font-bold text-[#16264A]">
                Share on any chat app
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#64748B]">
                Send the split link on SMS, email or any messenger. No app
                needed.
              </p>
            </div>
          </li>

          <StepArrow />

          {/* 3 — Get paid */}
          <li className="group flex-1 rounded-2xl border border-[#DCD5FA] bg-white p-4 shadow-[0_8px_24px_rgba(15,50,110,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(108,92,231,0.12)]">
            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#F1EEFF]">
              <span className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#6C5CE7] text-[16px] font-extrabold text-white shadow-[0_6px_14px_rgba(108,92,231,0.35)]">
                3
              </span>
              <div
                aria-hidden="true"
                className="absolute h-[96px] w-[150px] rounded-full bg-[#DCD5FA]"
              />
              <div
                aria-hidden="true"
                className="relative transition duration-300 group-hover:scale-[1.04]"
              >
                <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[22px] rounded-bl-[6px] bg-white shadow-md ring-1 ring-[#E3ECF7]">
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#22C15E] text-white">
                    <Check size={30} strokeWidth={4} />
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2 pt-4 pb-1">
              <h3 className="text-[17px] font-bold text-[#16264A]">
                Get paid
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#64748B]">
                Your friend pays via UPI and you confirm. Done!
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
