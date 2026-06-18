import type { ReactNode } from "react";

export interface CardProps {
  /** Render the app's signature corner-bracket accents (gold L-marks in each corner). @default false */
  cornerAccent?: boolean;
  /** Elevation surface. @default "card" */
  surface?: "card" | "elevated" | "grouped";
  className?: string;
  children: ReactNode;
}

const surfaces = {
  card: "bg-ink-3 shadow-card",
  elevated: "bg-ink-4 shadow-elevated",
  grouped: "bg-ink-grouped",
} as const;

/** Content container matching the app's card surfaces. Set `cornerAccent` for Taffy's signature bracketed-corner treatment. */
export default function Card({
  cornerAccent = false,
  surface = "card",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-line p-6 ${surfaces[surface]} ${className}`}
    >
      {cornerAccent && <CornerAccents />}
      {children}
    </div>
  );
}

/** Four gold L-brackets — the iOS `CornerAccent` (1.5px stroke), recreated for the web. */
function CornerAccents() {
  const mark = "pointer-events-none absolute h-5 w-5 border-gold/70";
  return (
    <>
      <span className={`${mark} left-2 top-2 rounded-tl border-l-[1.5px] border-t-[1.5px]`} />
      <span className={`${mark} right-2 top-2 rounded-tr border-r-[1.5px] border-t-[1.5px]`} />
      <span className={`${mark} bottom-2 left-2 rounded-bl border-b-[1.5px] border-l-[1.5px]`} />
      <span className={`${mark} bottom-2 right-2 rounded-br border-b-[1.5px] border-r-[1.5px]`} />
    </>
  );
}
