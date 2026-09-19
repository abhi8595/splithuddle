import {
  HandCoins,
  MousePointerClick,
  Send,
  Smartphone,
  Package,
  ReceiptText,
} from "lucide-react";

function DottedRow() {
  return (
    <div aria-hidden="true" className="mt-6 flex flex-wrap gap-[7px]">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="h-[7px] w-[7px] rounded-full bg-[#C5D8F5]"
        />
      ))}
    </div>
  );
}

function StepLabel({
  step,
  align = "left",
}: {
  step: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-[12px] font-bold tracking-[0.28em] text-[#9DB4D0] uppercase">
        Step
      </p>
      <p className="-mt-1 text-[34px] leading-none font-extrabold tracking-tight text-[#0B2B5B]">
        {step}
      </p>
    </div>
  );
}

function ThemeCircle({
  children,
  bg,
  shadow,
  ring,
}: {
  children: React.ReactNode;
  bg: string;
  shadow: string;
  ring: string;
}) {
  return (
    <div
      className={`group relative mx-auto flex h-52 w-52 items-center justify-center rounded-full ${bg} ${shadow} transition duration-300 hover:scale-[1.03] sm:h-60 sm:w-60 md:mx-0`}
    >
      <span
        aria-hidden="true"
        className="absolute top-6 left-8 h-10 w-16 rounded-full bg-white/20 blur-[2px]"
      />
      {/* ring color token used by inner badge via parent */}
      <span aria-hidden="true" className={`hidden ${ring}`} />
      {children}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      id="how"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto w-full max-w-[1020px] px-4 py-14 sm:px-6 md:py-20">
        {/* Header — site theme */}
        <div className="text-center">
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
        </div>

        <div className="relative mt-10 md:mt-14">
          {/* vertical dotted spine (desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 bottom-4 left-1/2 hidden -translate-x-1/2 border-l-2 border-dotted border-[#C5D8F5] md:block"
          />

          {/* ---------- STEP 01 ---------- */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-0">
            {/* text — left */}
            <div className="order-2 text-center md:order-1 md:pr-16 md:text-left">
              <h3 className="text-xl font-extrabold text-[#0B2B5B] sm:text-[22px]">
                Create Your Split
              </h3>
              <p className="mx-auto mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-slate-500 md:mx-0">
                Select &ldquo;Split Bill&rdquo; in SplitHuddle and follow the
                sequence of steps. Add your expense, choose an existing group
                or create a new one — it takes less than a minute and works
                even if your friends don&rsquo;t have the app installed.
              </p>
              <div className="flex justify-center md:justify-start">
                <DottedRow />
              </div>
            </div>
            {/* visual — right */}
            <div className="order-1 md:order-2 md:pl-16">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <StepLabel step="01" />
                <ThemeCircle
                  bg="bg-[#2B7FFF]"
                  shadow="shadow-[0_18px_40px_rgba(43,127,255,0.35)]"
                  ring="ring-[#2B7FFF]"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="flex h-24 w-[52px] items-center justify-center rounded-[10px] border-2 border-[#0B2B5B] bg-white shadow-lg">
                      <span className="flex h-full w-full flex-col items-center justify-between rounded-[8px] bg-white p-1.5">
                        <span className="h-1 w-6 rounded-full bg-[#0B2B5B]" />
                        <ReceiptText size={26} className="text-[#0B2B5B]" />
                        <span className="h-4 w-full rounded bg-[#EDF4FF]" />
                        <span className="h-4 w-full rounded bg-[#EDF4FF]" />
                      </span>
                    </span>
                    <span className="absolute -right-9 -bottom-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B2B5B] shadow-lg ring-4 ring-[#2B7FFF]">
                      <MousePointerClick size={22} />
                    </span>
                    <Smartphone
                      size={18}
                      className="absolute -top-3 -right-4 text-white/90"
                    />
                  </div>
                </ThemeCircle>
              </div>
            </div>
          </div>

          {/* mobile connector */}
          <div
            aria-hidden="true"
            className="mx-auto my-8 flex flex-col items-center gap-1.5 md:hidden"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-[6px] w-[6px] rounded-full bg-[#C5D8F5]"
              />
            ))}
          </div>

          {/* ---------- STEP 02 ---------- */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-0">
            {/* visual — left */}
            <div className="md:pr-16">
              <div className="flex flex-col items-center gap-3 md:items-end md:text-right">
                <StepLabel step="02" align="right" />
                <ThemeCircle
                  bg="bg-[#22C15E]"
                  shadow="shadow-[0_18px_40px_rgba(34,193,94,0.35)]"
                  ring="ring-[#22C15E]"
                >
                  <div className="relative flex items-end justify-center">
                    <span className="flex h-16 w-28 items-center justify-center rounded-[6px] bg-white/95 shadow-lg">
                      <span className="flex h-full w-full flex-col">
                        <span className="mx-auto h-3 w-10 rounded-b bg-[#0B7A55]/20" />
                        <Package size={26} className="mx-auto mt-1 text-[#0B7A55]" />
                      </span>
                    </span>
                    <span className="absolute -top-9 flex h-20 w-11 rotate-[-8deg] items-center justify-center rounded-[8px] border-2 border-[#0B2B5B] bg-white shadow-xl">
                      <span className="h-1 w-5 rounded-full bg-[#C5D8F5]" />
                      <Send size={16} className="absolute text-[#22C15E]" />
                    </span>
                  </div>
                </ThemeCircle>
              </div>
            </div>
            {/* text — right */}
            <div className="text-center md:pl-16 md:text-left">
              <h3 className="text-xl font-extrabold text-[#0B2B5B] sm:text-[22px]">
                Share Link for FREE!
              </h3>
              <p className="mx-auto mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-slate-500 md:mx-0">
                Proceed to share and enter no extra info. The best part is we
                generate the split link to the right address — and more
                importantly it opens on any chat app. Your friend taps the
                link, sees their share and pays via UPI. No app download, no
                signup needed.
              </p>
              <div className="flex justify-center md:justify-start">
                <DottedRow />
              </div>
            </div>
          </div>

          {/* mobile connector */}
          <div
            aria-hidden="true"
            className="mx-auto my-8 flex flex-col items-center gap-1.5 md:hidden"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-[6px] w-[6px] rounded-full bg-[#C5D8F5]"
              />
            ))}
          </div>

          {/* ---------- STEP 03 ---------- */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-0">
            {/* text — left */}
            <div className="order-2 text-center md:order-1 md:pr-16 md:text-left">
              <h3 className="text-xl font-extrabold text-[#0B2B5B] sm:text-[22px]">
                Get Paid Fast
              </h3>
              <p className="mx-auto mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-slate-500 md:mx-0">
                We&rsquo;ll send a speedy payment update upon receiving your
                money. For your peace of mind, you get updates every step of
                the way — your friend pays, you confirm, and the balance is
                settled. Simple, fast and done!
              </p>
              <div className="flex justify-center md:justify-start">
                <DottedRow />
              </div>
            </div>
            {/* visual — right */}
            <div className="order-1 md:order-2 md:pl-16">
              <div className="flex flex-col items-center gap-3 md:items-start">
                <StepLabel step="03" />
                <ThemeCircle
                  bg="bg-[#6C5CE7]"
                  shadow="shadow-[0_18px_40px_rgba(108,92,231,0.35)]"
                  ring="ring-[#6C5CE7]"
                >
                  <div className="relative flex items-center justify-center">
                    <HandCoins
                      size={72}
                      className="text-white"
                      strokeWidth={1.6}
                    />
                    <span className="absolute -right-4 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-extrabold text-[#6C5CE7] shadow">
                      ₹
                    </span>
                    <span className="absolute -right-2 bottom-1 h-3 w-3 rounded-full bg-white/80 shadow" />
                    <span className="absolute right-4 -bottom-2 h-2.5 w-2.5 rounded-full bg-white/60 shadow" />
                  </div>
                </ThemeCircle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
