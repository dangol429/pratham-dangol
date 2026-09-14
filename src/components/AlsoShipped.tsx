import type { AlsoShippedItem } from "@/data/work";
import { EyebrowLabel } from "./EyebrowLabel";
import { LinkArrow } from "./LinkArrow";
import { Pill } from "./Pill";
import { Tag } from "./Tag";

interface AlsoShippedProps {
  items: AlsoShippedItem[];
}

export function AlsoShipped({ items }: AlsoShippedProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-20 border-t border-foreground/10 pt-16 md:mt-28 md:pt-20">
      <EyebrowLabel>Also shipped</EyebrowLabel>

      <div className="mt-8 divide-y divide-foreground/10">
        {items.map((item) => (
          <div key={item.index} className="flex flex-wrap items-center justify-between gap-6 py-6">
            <div className="min-w-[240px] flex-1">
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">{item.index} —</span>{" "}
                <span className="text-foreground">{item.name}</span> · {item.url}
              </p>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            {item.href && (
              <Pill href={item.href} variant="secondary" className="px-4 py-2 text-xs">
                Case study
                <LinkArrow />
              </Pill>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
