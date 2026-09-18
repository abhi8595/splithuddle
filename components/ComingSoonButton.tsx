"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";

export default function ComingSoonButton({
  className,
  children,
  label = "Get the app",
  message = "Coming soon — we're launching shortly!",
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
  message?: string;
}) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setShow(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setShow(false), 2600);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
      {show && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#0B2B5B] px-5 py-3 text-[14px] font-semibold whitespace-nowrap text-white shadow-[0_16px_40px_-12px_rgba(11,43,91,0.6)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22C15E]">
            <Rocket size={15} aria-hidden="true" />
          </span>
          {message}
        </div>
      )}
    </>
  );
}
