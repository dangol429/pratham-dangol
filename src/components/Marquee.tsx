import type { Tech } from "@/data/tech";

interface MarqueeProps {
  items: Tech[];
  className?: string;
}

// Repeated enough times that total content width comfortably exceeds even
// ultra-wide viewports. With only 2 copies, a short items list left a visible
// gap (and a jump) once the copies ran out before the loop reset.
const REPEAT_COUNT = 6;

export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div
      className={`group overflow-hidden py-12 ${className}`}
      style={{ background: "var(--color-background)" }}
    >
      <div className="flex w-max animate-marquee gap-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {Array.from({ length: REPEAT_COUNT }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            className="flex shrink-0 gap-16"
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <span
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-3 whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted"
                >
                  {/* No brand color here; the icons inherit text-muted so the
                      strip reads as one monochrome line. */}
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
