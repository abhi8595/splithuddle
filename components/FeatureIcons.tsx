import type { ReactNode } from "react";

/**
 * Hand-drawn feature glyphs matching the SplitHuddle feature artwork:
 * white strokes on the colored tiles (blue / purple / green).
 */
function Svg({
  children,
  size = 22,
  filled = false,
}: {
  children: ReactNode;
  size?: number;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Groups - two member busts. */
export function GroupsIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
      <circle cx="16.8" cy="9" r="2.5" />
      <path d="M15.8 14.5c2.9.2 4.6 1.6 5.1 4.3" />
    </Svg>
  );
}

/** Claim and Split - fingertip tap with signal arcs. */
export function TapIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="10.3" y="7" width="3.4" height="9" rx="1.7" />
      <path d="M10.3 12H8a1.7 1.7 0 0 0-1.7 1.9l.7 3.6a3 3 0 0 0 3 2.5h4.2a3 3 0 0 0 2.9-2.3l.7-3.8a1.7 1.7 0 0 0-1.9-2H13.7" />
      <path d="M5.2 5.2A7 7 0 0 1 12 3.5M3 8.4A10.5 10.5 0 0 1 12 1.5" opacity="0.85" />
    </Svg>
  );
}

/** Shared Spaces - home. */
export function HomeIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M4 11.2 12 4l8 7.2" />
      <path d="M6.2 9.8V20h11.6V9.8" />
      <path d="M10.2 20v-5h3.6v5" />
    </Svg>
  );
}

/** Smart Splitting - pie with a filled slice. */
export function PieIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12V4" />
      <path d="M12 12l5.7 5.7" />
      <path d="M12 12 12 4a8 8 0 0 1 8 8Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Lend and Borrow - coin with rupee mark. */
export function CoinIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.4 7.5h7.2M8.4 10.2h7.2M8.4 7.5c4.6 0 6.8 1.3 6.8 3.4 0 1.9-2.4 3.6-6 3.6" />
      <path d="M8.4 10.2v6.3" />
    </Svg>
  );
}

/** Pockets and Budgets - wallet. */
export function WalletIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="3" y="6" width="18" height="14" rx="3" />
      <path d="M3 10h18" opacity="0.85" />
      <circle cx="17" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Recurring Expenses - calendar with refresh arrow. */
export function RecurIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M8.5 3v4M15.5 3v4" />
      <path d="M8.5 17.2a3.3 3.3 0 0 1 .7-6.5" />
      <path d="M15.5 13.3a3.3 3.3 0 0 1-.7 6.5" />
      <path d="M9.2 10.7v2.4h2.4M14.8 19.8v-2.4h-2.4" />
    </Svg>
  );
}

/** Reports and Insights - ascending bars. */
export function BarsIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M4 20h16" opacity="0.85" />
      <path d="M7 20v-5M12 20V9M17 20V5" strokeWidth={2.6} />
    </Svg>
  );
}

/** Ask Split - bot face. */
export function BotIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M12 9V5.5" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" stroke="none" />
      <rect x="5" y="9" width="14" height="11" rx="3.5" />
      <circle cx="9.7" cy="13.8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="13.8" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9.8 16.8c.7.5 1.4.7 2.2.7s1.5-.2 2.2-.7" />
    </Svg>
  );
}

/** Money Weather - sun peeking over a cloud. */
export function WeatherIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M9 3.5v1.4M4 8.5h1.4M5.5 5l1 1M12.5 5l-1 1" />
      <path d="M8.5 20h8a3.4 3.4 0 0 0 .7-6.7A4.8 4.8 0 0 0 8 14.2 2.9 2.9 0 0 0 8.5 20Z" />
    </Svg>
  );
}

/** UPI Settlements - phone with rupee mark. */
export function UpiIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.3 18.5h3.4" />
      <path d="M10 8h4M10 9.8h4M10 8c2.4 0 3.4.8 3.4 1.9S12 12 10 12M10 9.8V13" />
    </Svg>
  );
}

/** Saved Members - single member bust. */
export function MemberIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.3 20c.8-3.8 3.4-5.6 6.7-5.6s5.9 1.8 6.7 5.6" />
    </Svg>
  );
}
