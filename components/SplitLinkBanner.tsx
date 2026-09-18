import { ArrowRight, Link2 } from "lucide-react";
import Image from "next/image";

export default function SplitLinkBanner() {
  return (
    <section aria-labelledby="split-link-heading" className="bg-white">
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-10 md:pb-14">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#CDEED8] bg-gradient-to-r from-[#EAF9F0] to-[#E4F6EB] px-6 py-6 md:flex-row md:gap-6 md:px-8">
          {/* icon + copy */}
          <div className="flex w-full items-start gap-4 md:flex-1">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#22C15E] text-white">
              <Link2 size={22} aria-hidden="true" />
            </span>
            <span>
              <h2
                id="split-link-heading"
                className="text-[16.5px] leading-snug font-bold text-balance text-[#0B2B5B] md:text-[18px]"
              >
                Need to split with someone who doesn&rsquo;t use SplitHuddle?
              </h2>
              <p className="mt-1 text-[13.5px] leading-relaxed text-slate-500">
                No problem. Share a Split Link and they&rsquo;re ready to go.
              </p>
            </span>
          </div>

          {/* CTA */}
          <a
            href="#features"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#D5EEDF] bg-white px-6 text-[13.5px] font-semibold whitespace-nowrap text-[#0B7A55] shadow-sm hover:border-[#0B7A55]"
          >
            Learn more
            <ArrowRight size={15} aria-hidden="true" />
          </a>

          {/* illustration */}
          <div
            aria-hidden="true"
            className="relative h-[120px] w-[230px] shrink-0 md:h-[140px] md:w-[290px]"
          >
            <Image
              src="/hero2.png"
              alt=""
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
