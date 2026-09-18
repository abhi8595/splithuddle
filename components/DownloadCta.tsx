import ComingSoonButton from "@/components/ComingSoonButton";

function GooglePlayMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#00D2FF"
        d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.2-.6-.6-.6-1.2V3c0-.6.2-1 .6-1.2Z"
      />
      <path
        fill="#FFE000"
        d="m16.9 8.7-3.2 3.3L3.6 1.8c.3-.2.8-.2 1.2.1l12.1 6.8Z"
      />
      <path
        fill="#FF3A44"
        d="m16.9 15.3-12.1 6.8c-.4.3-.9.3-1.2.1l10.1-10.2 3.2 3.3Z"
      />
      <path
        fill="#00F076"
        d="m20.5 10.5-3.6 1.5-3.2-3.3 3.2-3.2 3.6 1.5c1 .4 1 2.5 0 3.5Z"
      />
    </svg>
  );
}

function AppStoreMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.365 1.43c0 1.14-.43 2.08-1.27 2.8-.91.78-1.94 1.23-3.07 1.16-.05-1.12.43-2.08 1.28-2.83C14.21 1.75 15.34 1.3 16.3 1.24c.02.06.04.12.065.19ZM20.37 17.52c-.51 1.17-1.14 2.22-1.89 3.15-.99 1.23-1.8 1.86-2.43 1.86-.63 0-1.32-.42-2.07-.42-.78 0-1.53.39-2.13.39-.66 0-1.5-.54-2.52-1.83-1.47-1.86-2.46-4.2-2.49-6.63 0-2.07.81-3.84 2.16-5.13.9-.87 1.98-1.38 3.24-1.44.63 0 1.53.42 2.16.42.6 0 1.62-.51 2.73-.42 1.14.09 2.13.54 2.94 1.35-.09.06-1.77 1.02-1.74 3.09.03 2.46 2.16 3.27 2.19 3.3-.03.09-.33 1.17-1.11 2.31Z"
      />
    </svg>
  );
}

function PaperPlane() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 26 46 6 30 46l-6.5-12.5L6 26Z"
        stroke="#22C15E"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 33.5 46 6 30 46l-2-8.5-4.5-4Z"
        fill="#22C15E"
        opacity="0.35"
      />
      <path d="M23.5 33.5 46 6" stroke="#22C15E" strokeWidth="1.6" />
    </svg>
  );
}

export default function DownloadCta() {
  return (
    <section
      aria-labelledby="download-heading"
      id="download"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-14 md:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[#0B1E36] px-5 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9">
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="max-w-[520px]">
              <span className="inline-flex items-center rounded-full bg-[#1FAF5D] px-2.5 py-[3px] text-[9px] font-extrabold tracking-[0.12em] text-white uppercase">
                Get started
              </span>
              <h2
                id="download-heading"
                className="mt-2.5 text-[26px] leading-[1.15] font-extrabold tracking-tight text-white md:text-[30px]"
              >
                Download SplitHuddle
              </h2>
              <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-[#B9C4D8]">
                Join thousands of people already splitting, settling and
                managing their money together.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ComingSoonButton
                  label="Get it on Google Play"
                  message="Coming soon on Google Play!"
                  className="inline-flex h-[48px] items-center gap-2.5 rounded-lg border border-white/25 bg-black px-3.5 text-white transition hover:border-white/50"
                >
                  <GooglePlayMark />
                  <span className="leading-tight">
                    <span className="block text-[9px] font-medium tracking-wide text-slate-300 uppercase">
                      Get it on
                    </span>
                    <span className="block text-[15px] font-semibold">
                      Google Play
                    </span>
                  </span>
                </ComingSoonButton>

               
              </div>
            </div>

            {/* Right doodle */}
            <div
              aria-hidden="true"
              className="relative hidden h-[150px] w-[300px] shrink-0 sm:block md:h-[160px] md:w-[360px]"
            >
              <p className="absolute top-2 left-2 -rotate-[8deg] font-[cursive] text-[17px] leading-[1.25] font-bold text-white italic md:text-[19px]">
                Better
                <br />
                money habits,
                <br />
                together
              </p>

              <div className="absolute top-1 right-4 rotate-[22deg] md:right-6">
                <PaperPlane />
              </div>

              <svg
                viewBox="0 0 160 40"
                fill="none"
                className="absolute top-[78px] right-8 h-[32px] w-[140px] md:right-10"
              >
                <path
                  d="M6 32 C 48 34, 78 14, 152 6"
                  stroke="#22C15E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="0.8 8"
                />
                <circle cx="6" cy="32" r="2.6" fill="#22C15E" />
              </svg>
            </div>
          </div>

          {/* Bottom hills */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 h-[78px] w-full md:h-[92px]"
          >
            <path
              d="M0 100 C 90 100, 130 48, 220 58 C 310 68, 350 38, 460 52 C 540 62, 590 100, 660 100 L 0 100 Z"
              fill="#0F766E"
              opacity="0.8"
            />
            <path
              d="M0 100 C 70 100, 110 62, 200 70 C 290 78, 330 52, 430 64 C 520 74, 560 100, 630 100 L 0 100 Z"
              fill="#14B8A6"
              opacity="0.72"
            />
            <path
              d="M30 100 C 110 72, 170 44, 260 56 C 330 66, 380 86, 450 100 Z"
              fill="#5EEAD4"
              opacity="0.28"
            />
            <path
              d="M700 100 C 760 72, 810 24, 900 36 C 980 46, 1030 20, 1100 32 L 1100 100 Z"
              fill="#1D4ED8"
              opacity="0.9"
            />
            <path
              d="M740 100 C 800 64, 850 30, 940 42 C 1010 52, 1055 38, 1100 48 L 1100 100 Z"
              fill="#3B82F6"
              opacity="0.82"
            />
            <path
              d="M820 100 C 880 54, 940 22, 1020 40 C 1060 50, 1085 72, 1100 76 L 1100 100 Z"
              fill="#93C5FD"
              opacity="0.32"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


