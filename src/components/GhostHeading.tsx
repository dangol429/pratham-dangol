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
        const opacity = Math.max(0.06, 0.26 - depth * 0.07);
        return (
          <Tag
            key={depth}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 select-none font-sans font-extrabold tracking-tight text-foreground ${className}`}
            style={{
              opacity,
              transform: `translate(${depth * 4}px, ${depth * 4}px)`,
            }}
          >
            {text}
          </Tag>
        );
      })}
      <Tag className={`relative font-sans font-extrabold tracking-tight text-foreground ${className}`}>
        {text}
      </Tag>
    </div>
  );
}
