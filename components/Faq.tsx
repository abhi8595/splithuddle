import Image from "next/image";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Does my friend need the app?",
    a: "No. They open your link in the browser, see what they owe, and pay. Only you need SplitHuddle.",
  },
  {
    q: "How does UPI work? Is it safe?",
    a: "Your friend pays you directly over their own UPI app, then taps that they paid. You confirm it in SplitHuddle with one tap — we never touch your money.",
  },
  {
    q: "Is SplitHuddle free to use?",
    a: "Yes. Splitting, sharing links, and settling up cost nothing.",
  },
  {
    q: "What happens if there's a dispute?",
    a: "Their note lands with you in the app, and you review it together before anything is marked paid.",
  },
];

export default function Faq() {
  return (
    <section aria-labelledby="faq-heading" id="faq" className="scroll-mt-20 bg-white">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-14 md:py-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-[#F2F7FF] p-6 sm:p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left copy + accordion */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[#E1EBFD] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-[#1F6BFF] uppercase">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2B5B] md:text-[34px]"
            >
              Got questions?
            </h2>
            <p className="mt-2 text-[14.5px] text-slate-500">
              Here are some common questions from our users.
            </p>

            <div className="mt-6 space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-[#E3ECF7] bg-white px-4"
                >
                  <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[14px] font-semibold text-[#16264A] marker:hidden [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 transition-transform duration-300 group-open:rotate-45 group-open:text-[#1F6BFF]">
                      <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="pb-4 text-[13.5px] leading-relaxed text-slate-500">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <Image
              src="/question.png"
              alt="Person with a question mark — still have questions?"
              width={800}
              height={800}
              sizes="(max-width: 1024px) 100vw, 420px"
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
