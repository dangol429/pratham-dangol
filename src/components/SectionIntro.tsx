import type { ReactNode } from "react";
import { EyebrowLabel } from "./EyebrowLabel";
import { GhostHeading } from "./GhostHeading";
import { Reveal } from "./Reveal";

interface SectionIntroProps {
  eyebrow: string;
  heading: string;
  children: ReactNode;
}

export function SectionIntro({ eyebrow, heading, children }: SectionIntroProps) {
  return (
    <Reveal>
      {/* The rule stops at the heading column's width. lg:gap-16 is 4rem, so
          a 6-of-12 column is calc(50% - 2rem). */}
      <div className="border-b border-foreground/10 pb-4 lg:w-[calc(50%-2rem)]">
        <EyebrowLabel tone="muted">{eyebrow}</EyebrowLabel>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <GhostHeading
            as="h2"
            text={heading}
            repeat={1}
            className="text-[clamp(1.75rem,4.5vw,2.25rem)]"
          />
        </div>
        <div className="lg:col-span-6">
          <p className="text-base leading-relaxed text-muted">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}
