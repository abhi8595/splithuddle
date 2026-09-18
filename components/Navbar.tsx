import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ComingSoonButton from "@/components/ComingSoonButton";

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
      width={32}
      height={32}
      className="h-8 w-8 rounded-[10px] object-cover"
    />
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-4 px-5"
      >
        <a
          href="#top"
          className="flex min-h-[44px] items-center gap-2 text-[19px] font-extrabold tracking-tight text-[#0B2B5B]"
        >
          <LogoMark />
          SplitHuddle
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-slate-700 hover:text-[#0B2B5B]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ComingSoonButton
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#1F6BFF] px-5 py-2.5 text-[14.5px] font-semibold whitespace-nowrap text-white shadow-[0_6px_16px_-6px_rgba(31,107,255,0.6)] hover:bg-[#1A5FE8]"
        >
          Get the app
          <ArrowRight size={16} aria-hidden="true" />
        </ComingSoonButton>
      </nav>
    </header>
  );
}
