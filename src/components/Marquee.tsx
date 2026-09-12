interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div
      className={`group overflow-hidden border-y border-white/10 bg-ink py-12 ${className}`}
    >
      <div className="flex w-max animate-marquee gap-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 gap-16">
          {items.map((item) => (
            <span
              key={item}
              className="whitespace-nowrap font-mono text-sm uppercase tracking-widest text-white/50"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-16" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap font-mono text-sm uppercase tracking-widest text-white/50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
