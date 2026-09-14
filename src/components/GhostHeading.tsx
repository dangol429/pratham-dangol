type HeadingTag = "h1" | "h2" | "h3" | "span";

interface GhostHeadingProps {
  text: string;
  repeat?: number;
  as?: HeadingTag;
  className?: string;
}

export function GhostHeading({ text, repeat = 2, as = "h2", className = "" }: GhostHeadingProps) {
  const Tag = as;
  const ghosts = Array.from({ length: repeat });

  return (
    <div className="relative block w-full">
      {ghosts.map((_, index) => {
        const depth = index + 1;
        const opacity = Math.max(0.04, 0.14 - depth * 0.05);
        return (
          <Tag
            key={depth}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 select-none font-display font-bold tracking-tight text-foreground ${className}`}
            style={{
              opacity,
              transform: `translate(${depth * 3}px, ${depth * 3}px)`,
            }}
          >
            {text}
          </Tag>
        );
      })}
      <Tag className={`relative font-display font-bold tracking-tight text-foreground ${className}`}>
        {text}
      </Tag>
    </div>
  );
}
