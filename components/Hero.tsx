import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ComingSoonButton from "@/components/ComingSoonButton";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden bg-white">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 pt-10 pb-14 md:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-6 lg:pb-20">
        {/* Left copy */}
        <div className="max-w-[560px]">
          <span className="inline-flex items-center rounded-full bg-[#DFF7EA] px-4 py-1.5 text-[13.5px] font-semibold text-[#0B7A55]">
            Track. Split. Settle.
          </span>
          <h1
            id="hero-heading"
            className="mt-5 text-[42px] leading-[1.06] font-extrabold tracking-tight text-balance text-[#0B2B5B] sm:text-[54px] lg:text-[58px]"
          >
            Track. Split. Settle.{" "}
            <span className="text-[#009E6A]">All in one</span> app.
          </h1>
          <p className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-slate-600">
            From everyday expenses to trips, roommates, loans, budgets, and
            shared bills - SplitHuddle makes managing money together simple.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ComingSoonButton
              className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full bg-[#1F6BFF] px-7 text-[15.5px] font-semibold whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgba(31,107,255,0.7)] hover:bg-[#1A5FE8] sm:w-auto"
            >
              Get the app
              <ArrowRight size={17} aria-hidden="true" />
            </ComingSoonButton>
            <a
              href="#features"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[1.5px] border-[#BFD4FF] bg-white px-6 text-[15.5px] font-semibold whitespace-nowrap text-[#0B2B5B] hover:border-[#1F6BFF]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-[#1F6BFF] text-[#1F6BFF]">
                <Play size={11} aria-hidden="true" className="ml-px" fill="currentColor" />
              </span>
              Explore features
            </a>
          </div>
          <p className="mt-6 flex items-start gap-2 text-[13px] leading-relaxed text-slate-500">
            <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0E9F6E]" />
            <span>
              No complicated setup. No account required.
              <br />
              Your data stays on your device.
            </span>
          </p>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto w-full max-w-[640px]">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/hero.png"
              alt="Smiling person holding a phone surrounded by SplitHuddle features: Split Bills, Track Spending, Manage Groups and Settle Up"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
