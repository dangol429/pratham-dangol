import type { ReactNode } from "react";

interface EyebrowLabelProps {
  children: ReactNode;
  /** "muted" is for section-level eyebrows, where the accent square alone
   *  carries the colour and the label sits back with the page text. */
  tone?: "accent" | "muted";
  className?: string;
}

export function EyebrowLabel({ children, tone = "accent", className = "" }: EyebrowLabelProps) {
  return (
    // items-start (not items-center) keeps the bullet on the first line when
    // a long label wraps on narrow screens, instead of floating it between
    // the two lines. mt offset optically centres it against line one.
    <span
      className={`inline-flex items-start gap-2 font-mono text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] ${
        tone === "muted" ? "text-foreground/75" : "text-accent"
      } ${className}`}
    >
      <span className="mt-[0.4em] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
