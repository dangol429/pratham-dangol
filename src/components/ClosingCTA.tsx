import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/data/site";
import { EyebrowLabel } from "./EyebrowLabel";
import { GhostHeading } from "./GhostHeading";
import { LinkArrow } from "./LinkArrow";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";
import { SectionWrapper } from "./SectionWrapper";

export function ClosingCTA() {
  return (
    <SectionWrapper id="contact">
      <Reveal className="rounded-3xl border border-foreground/10 bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <EyebrowLabel>Next</EyebrowLabel>

          <GhostHeading
            as="h2"
            text="Bring me the whole problem."
            repeat={1}
            className="mt-6 text-[clamp(2rem,6vw,3.5rem)]"
          />

          <p className="mt-6 text-base leading-relaxed text-muted">
            Tell me what you&apos;re building, what&apos;s getting in the way, and what
            you&apos;re working with. A paragraph is enough to start.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Pill href={`mailto:${CONTACT_EMAIL}`} variant="primary">
              Get in touch
              <LinkArrow />
            </Pill>
            {SOCIAL_LINKS.map((social) => (
              <Pill
                key={social.label}
                href={social.href}
                external
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                {social.label}
                <LinkArrow />
              </Pill>
            ))}
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            Open to remote roles &amp; freelance · Replies within a business day · Remote
            worldwide
          </p>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
