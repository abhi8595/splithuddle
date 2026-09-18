import Image from "next/image";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

function LogoMark() {
  return (
    <Image
      src="/logo.png"
      alt="SplitHuddle logo"
      width={28}
      height={28}
      className="h-7 w-7 rounded-[9px] object-cover"
    />
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-[#0B2B5B]">
              SplitHuddle
            </span>
            <span className="block text-[11px] text-slate-400">
              Track. Split. Settle.
            </span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-[32px] items-center text-[13px] font-medium text-slate-500 hover:text-[#0B2B5B]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[12px] text-slate-400">© 2026 SplitHuddle</p>
      </div>
    </footer>
  );
}
