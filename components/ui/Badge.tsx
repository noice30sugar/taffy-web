import type { CSSProperties, ReactNode } from "react";

type Tone = "gold" | "sage" | "silver" | "neutral";

const tones: Record<Tone, string> = {
  gold: "border-gold/30 bg-gold/10 text-gold",
  sage: "border-sage/30 bg-sage/10 text-sage",
  silver: "border-silver/30 bg-silver/10 text-silver",
  neutral: "border-line bg-ink-2 text-fg-dim",
};

export interface BadgeProps {
  /** Accent family. Ignored when `color` is set. @default "gold" */
  tone?: Tone;
  /** Override with a raw category-bucket color (e.g. a `var(--color-cat-emerald)` or hex) for the app's category pills. */
  color?: string;
  /** Leading status dot in the current text color. @default false */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

/** Eyebrow / status pill (uppercase, tracked) and the app's category "bucket" tag. Pass `color` for a category pill. */
export default function Badge({
  tone = "gold",
  color,
  dot = false,
  className = "",
  children,
}: BadgeProps) {
  const colorStyle: CSSProperties | undefined = color
    ? {
        color,
        borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
      }
    : undefined;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${
        color ? "" : tones[tone]
      } ${className}`}
      style={colorStyle}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
