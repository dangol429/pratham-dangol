import type { ReactNode } from "react";

interface MockupCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

// A flat mockup surface: the content leads, and the label sits underneath as
// a caption rather than in window chrome. Intentionally fixed-dark regardless
// of site theme (a light-mode terminal/mockup reads as inauthentic).
export function MockupCard({ label, children, className = "" }: MockupCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-ink px-6 py-8 ${className}`}
    >
      {children}
      <div className="mt-8 border-t border-white/10 pt-5">
        <p className="truncate font-mono text-xs text-white/35">{label}</p>
      </div>
    </div>
  );
}
