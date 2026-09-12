import type { ReactNode } from "react";

interface MockupCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

// Shared "fake app window" chrome — traffic-light dots + label bar over a
// dark card. Intentionally fixed-dark regardless of site theme (a
// light-mode terminal/mockup reads as inauthentic), used by both
// TerminalCard and the stepper-list mockup cards.
export function MockupCard({
  label,
  children,
  className = "",
}: MockupCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-ink ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span
          className="h-2.5 w-2.5 rounded-full bg-white/15"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-white/15"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-white/15"
          aria-hidden="true"
        />
        <span className="ml-2 truncate font-mono text-xs text-white/40">
          {label}
        </span>
      </div>
      <div className="px-5 py-8">{children}</div>
    </div>
  );
}
