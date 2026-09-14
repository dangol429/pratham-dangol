import { ALGOBULLS_LINKEDIN } from "@/data/site";
import { EyebrowLabel } from "./EyebrowLabel";
import { GhostHeading } from "./GhostHeading";
import { PhotoFrame } from "./PhotoFrame/PhotoFrame";
import { Reveal } from "./Reveal";
import { StickyColumn } from "./StickyColumn";
import { SectionWrapper } from "./SectionWrapper";

interface TimelineItem {
  role: string;
  company: string;
  /** Links the company name only — the location stays plain text. */
  companyHref?: string;
  location?: string;
  dates: string;
  description?: string;
}

const TIMELINE: TimelineItem[] = [
  {
    role: "Frontend Developer",
    company: "AlgoBulls",
    companyHref: ALGOBULLS_LINKEDIN,
    location: "Remote, US",
    dates: "Jan 2025 — Present",
    description:
      "Work on Strategy Builder, RunScreen, Phoenix, and an internal SEO audit agent for an AI algorithmic trading platform.",
  },
  {
    role: "Intern → Frontend Developer",
    company: "AlgoBulls",
    companyHref: ALGOBULLS_LINKEDIN,
    location: "Remote, US",
    dates: "Jan 2024 — Jan 2025",
  },
  {
    role: "Full-Stack Developer",
    company: "OntTech Solutions",
    location: "Remote, Australia",
    dates: "Aug 2023 — Dec 2024",
    description: "Freelance full-stack work on an elderly-care platform.",
  },
  {
    role: "Full-Stack Developer Intern",
    // TODO(Pratham): confirm exact dates and location for this internship.
    company: "Solar Secure Solutions",
    dates: "During university",
  },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <EyebrowLabel>About</EyebrowLabel>

      <Reveal className="mt-6 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <StickyColumn className="lg:col-span-4">
          {/* Same portrait as the hero, same grayscale→colour hover. The hero
              copy is decorative (empty alt); this one carries the real alt so
              screen readers announce it once, not twice. */}
          <PhotoFrame
            imageSrc="/img/profile.png"
            imageAlt="Pratham Dangol"
            className="max-w-xs sm:max-w-sm lg:max-w-none"
          />

          <div className="mt-8 space-y-6">
            <div>
              <EyebrowLabel>Education</EyebrowLabel>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                B.E. Computer Science
                <br />
                VTU Bangalore (Acharya Institute of Technology)
                <br />
                2019 — 2023
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                +2 Computer Science
                <br />
                Bernhardt College, Kathmandu
              </p>
            </div>

            <div>
              <EyebrowLabel>Languages</EyebrowLabel>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                English, Nepali, Hindi
              </p>
            </div>
          </div>
        </StickyColumn>

        <div className="lg:col-span-8">
          <GhostHeading
            as="h2"
            text="I'd rather own the whole problem."
            repeat={1}
            className="text-[clamp(1.75rem,4.5vw,2.25rem)]"
          />

          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a frontend developer working across React, TypeScript,
              and modern frontend tooling. I gravitate toward products where
              understanding the workflow matters as much as the implementation.
            </p>
            <p>
              That shows up in how I&apos;ve worked — freelancing full-stack on
              a care platform for an Australian client, then moving from intern
              to full-time frontend engineer on an algorithmic trading platform,
              where I&apos;ve worked across everything from strategy-builder UIs
              to an internal SEO audit agent.
            </p>
            <p>
              Outside of client work, I&apos;m deepening my backend fundamentals
              through FastAPI and Python — mostly so the systems I build
              end-to-end make sense on both sides of the API, not just the UI.
            </p>
          </div>

          <div className="mt-14">
            <EyebrowLabel>Where the hours went</EyebrowLabel>

            <div className="mt-6">
              {TIMELINE.map((item) => (
                <div
                  key={`${item.role}-${item.dates}`}
                  className="border-t border-foreground/10 py-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-1.5 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      <h3 className="text-base font-bold text-foreground">
                        {item.role}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {item.dates}
                    </span>
                  </div>
                  <p className="mt-1 pl-4 font-mono text-xs text-muted">
                    {item.companyHref ? (
                      <a
                        href={item.companyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {item.description && (
                    <p className="mt-3 pl-4 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
