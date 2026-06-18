import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition outline-none active:scale-[0.98] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Primary: marketing gold fill, ink label — the lead action.
  primary: "bg-gold text-ink hover:brightness-105 focus-visible:ring-gold/40",
  // Secondary: sage accent — calmer, supporting action.
  secondary: "bg-sage text-ink hover:brightness-105 focus-visible:ring-sage/40",
  // Ghost: hairline outline on ink — tertiary / low-emphasis.
  ghost:
    "border border-line bg-transparent text-fg hover:bg-ink-2 focus-visible:ring-line",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: Variant;
  /** Control height + padding. @default "md" */
  size?: Size;
  children: ReactNode;
}

/** The app's primary tappable action, translated to the web. Gold = lead, sage = supporting, ghost = low-emphasis. */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
