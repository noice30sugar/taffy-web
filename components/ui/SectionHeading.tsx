import type { ReactNode } from "react";
import Badge from "./Badge";

export interface SectionHeadingProps {
  /** Small uppercase label above the title (rendered as a gold Badge). */
  eyebrow?: string;
  title: ReactNode;
  /** Supporting paragraph below the title. */
  subtitle?: ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  className?: string;
}

/** Section header for marketing blocks: gold eyebrow + Jakarta title + dim subtitle. Mirrors the app's screen-header rhythm. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <Badge tone="gold" dot className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-extrabold leading-[1.1] text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-fg-dim">{subtitle}</p>
      )}
    </div>
  );
}
