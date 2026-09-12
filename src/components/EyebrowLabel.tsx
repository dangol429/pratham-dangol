import type { ReactNode } from "react";

interface EyebrowLabelProps {
  children: ReactNode;
  className?: string;
}

export function EyebrowLabel({ children, className = "" }: EyebrowLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
