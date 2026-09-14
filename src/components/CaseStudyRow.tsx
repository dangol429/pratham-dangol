import type { CaseStudy } from "@/data/work";
import { EyebrowLabel } from "./EyebrowLabel";
import { LinkArrow } from "./LinkArrow";
import { MockupCard } from "./MockupCard";
import { Pill } from "./Pill";
import { SteppedList } from "./SteppedList";
import { StickyColumn } from "./StickyColumn";
import { Tag } from "./Tag";

interface CaseStudyRowProps {
  study: CaseStudy;
  reverse?: boolean;
}

export function CaseStudyRow({ study, reverse = false }: CaseStudyRowProps) {
  return (
    <div className="border-t border-foreground/10 py-16 first:border-t-0 first:pt-0 md:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="font-mono text-sm text-muted">
          <span className="text-accent">{study.index} —</span> {study.url}
        </span>
        {study.inProgress ? (
          <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-xs uppercase tracking-widest text-accent">
            In progress
          </span>
        ) : study.year ? (
          <span className="rounded-full border border-foreground/10 px-2.5 py-0.5 font-mono text-xs text-muted">
            {study.year}
          </span>
        ) : null}
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <StickyColumn className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <MockupCard label={study.stepper.label}>
            <SteppedList rows={study.stepper.rows} />
          </MockupCard>
        </StickyColumn>

        <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">{study.name}</h3>
          <p className="mt-2 text-muted">{study.tagline}</p>

          <div className="mt-8 space-y-6">
            <div>
              <EyebrowLabel>Problem</EyebrowLabel>
              <p className="mt-2 text-sm leading-relaxed text-muted">{study.problem}</p>
            </div>

            <div>
              <EyebrowLabel>What I built</EyebrowLabel>
              <p className="mt-2 text-sm leading-relaxed text-muted">{study.whatIBuilt}</p>
            </div>

            <div className="border-l-2 border-accent/60 bg-accent/[0.04] py-3 pl-4">
              <EyebrowLabel>Key decision</EyebrowLabel>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {study.keyDecision}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {study.inProgress ? (
                <Pill variant="secondary" className="cursor-default opacity-60" disabled>
                  In progress
                </Pill>
              ) : (
                study.href && (
                  <Pill
                    href={study.href}
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    Case study
                    <LinkArrow />
                  </Pill>
                )
              )}

              {study.repoHref && (
                <a
                  href={study.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted underline-offset-4 transition-colors hover:text-foreground"
                >
                  Repo
                  <LinkArrow />
                </a>
              )}
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {study.inProgress ? "Status: In progress" : `Role: ${study.role}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
