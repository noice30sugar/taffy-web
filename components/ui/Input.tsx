import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Render in the error state (pink ring) — pair with a message in your form. @default false */
  invalid?: boolean;
};

/** Text input matching the app's `.inputFieldStyle()`: ink-2 fill, hairline border, gold focus ring. */
export default function Input({ invalid = false, className = "", ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`w-full rounded-2xl border bg-ink-2 px-5 py-3.5 text-fg placeholder:text-fg-faint outline-none transition ${
        invalid
          ? "border-pink/60 focus:border-pink focus:ring-2 focus:ring-pink/25"
          : "border-line focus:border-gold/60 focus:ring-2 focus:ring-gold/25"
      } ${className}`}
      {...props}
    />
  );
}
