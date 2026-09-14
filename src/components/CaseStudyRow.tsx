import Image from "next/image";
import type { CaseStudy } from "@/data/work";
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

function Field({
  label,
  emphasis = false,
  children,
}: {
  label: string;
  emphasis?: boolean;
  children: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent sm:tracking-[0.2em]">
        {label}
      </p>
      <p className={`text-sm leading-relaxed ${emphasis ? "text-foreground/80" : "text-muted"}`}>
        {children}
      </p>
    </div>
  );
}

export function CaseStudyRow({ study, reverse = false }: CaseStudyRowProps) {
  return (
    <div className="border-t border-foreground/10 py-16 first:border-t-0 first:pt-0 md:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/10 pb-5">
        <span className="font-mono text-sm text-muted">
          <span className="text-foreground/70">{study.index} /</span> {study.url}
        </span>
        {study.inProgress ? (
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            In progress
          </span>
        ) : study.year ? (
          <span className="font-mono text-sm text-muted">{study.year}</span>
        ) : null}
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <StickyColumn className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <div className="space-y-6">
            {study.screenshot && (
              <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-ink">
                <Image
                  src={study.screenshot.src}
                  alt={study.screenshot.alt}
                  width={1200}
                  height={750}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            )}

            <MockupCard label={study.stepper.label}>
              <SteppedList rows={study.stepper.rows} />
            </MockupCard>
          </div>
        </StickyColumn>

        <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
          {/* The name is the way out to the live product; the arrow is what
              signals that. The button below goes to the case study instead. */}
          <h3 className="text-3xl font-bold text-foreground md:text-4xl">
            {study.href ? (
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 underline-offset-[6px] transition-colors hover:text-accent hover:underline"
              >
                {study.name}
                <LinkArrow className="mt-1.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              study.name
            )}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{study.tagline}</p>

          <div className="mt-10 space-y-8">
            <Field label="Problem">{study.problem}</Field>
            <Field label="What I built">{study.whatIBuilt}</Field>
            <Field label="Key decision" emphasis>
              {study.keyDecision}
            </Field>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Pill href={`/work/${study.slug}`}>
                Case study
                <LinkArrow direction="right" />
              </Pill>

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
