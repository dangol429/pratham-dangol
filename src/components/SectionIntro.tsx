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
      <EyebrowLabel>{eyebrow}</EyebrowLabel>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-16">
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
