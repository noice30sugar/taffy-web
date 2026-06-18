import type { ReactNode } from "react";

export interface StatDelta {
  /** "up" = spending rose (bad → red); "down" = spending fell (good → green). Matches the app's changeUp/changeDown semantics. */
  direction: "up" | "down";
  value: ReactNode;
}

export interface StatProps {
  /** Caption above the figure. */
  label?: ReactNode;
  /** The headline figure — rendered with mono, tabular digits for financial alignment. */
  value: ReactNode;
  delta?: StatDelta;
  className?: string;
}

/** A financial figure block: dim label, mono tabular value, and an optional up/down delta colored by the app's spending semantics. */
export default function Stat({ label, value, delta, className = "" }: StatProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <span className="text-sm text-fg-dim">{label}</span>}
      <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-fg">
        {value}
      </span>
      {delta && (
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            delta.direction === "up" ? "text-change-up" : "text-change-down"
          }`}
        >
          <span aria-hidden>{delta.direction === "up" ? "↑" : "↓"}</span>
          {delta.value}
        </span>
      )}
    </div>
  );
}
