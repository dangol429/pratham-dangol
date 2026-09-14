import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/data/work";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { LinkArrow } from "@/components/LinkArrow";
import { Pill } from "@/components/Pill";
import { SteppedList } from "@/components/SteppedList";
import { Tag } from "@/components/Tag";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.name,
    description: study.tagline,
  };
}

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-2 border-t border-foreground/10 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent sm:tracking-[0.2em]">
        {label}
      </p>
      <p className="text-[15px] leading-[1.7] text-muted">{children}</p>
    </div>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-content px-6 pb-24 pt-8 md:pb-32">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">&larr;</span>
        Selected work
      </Link>

      <header className="mt-10 border-b border-foreground/10 pb-4">
        <EyebrowLabel tone="muted">Case study / {study.index}</EyebrowLabel>
      </header>

      <h1 className="mt-8 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-foreground">
        {study.name}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{study.tagline}</p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-foreground/10 py-5 font-mono text-xs text-muted">
        <span>{study.role}</span>
        {/* Only a real address earns a slot here; an unshipped project's
            placeholder url would just repeat the In progress flag. */}
        {study.href && (
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            {study.url}
            <LinkArrow />
          </a>
        )}
        {study.year && <span>{study.year}</span>}
        {study.inProgress && <span className="text-accent">In progress</span>}
      </div>

      {study.intro && (
        <p className="mt-8 max-w-2xl text-[15px] leading-[1.7] text-muted">
          {study.intro}
        </p>
      )}

      {study.screenshot && (
        <div className="mt-14 overflow-hidden rounded-2xl border border-foreground/10 bg-ink">
          <Image
            src={study.screenshot.src}
            alt={study.screenshot.alt}
            width={1200}
            height={750}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <Field label="Problem">{study.problem}</Field>
          <Field label="What I built">{study.whatIBuilt}</Field>
          <Field label="Key decision">{study.keyDecision}</Field>
          {study.alsoTrue && <Field label="Also true">{study.alsoTrue}</Field>}
        </div>

        <aside className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Built with
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {study.stepper.label.split(" · ")[1] ?? "Modules"}
          </p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-ink px-5 py-7">
            <SteppedList rows={study.stepper.rows} />
          </div>
        </aside>
      </div>

      <div className="mt-20 flex flex-wrap items-center gap-4 border-t border-foreground/10 pt-10">
        {study.href && (
          <Pill href={study.href} external target="_blank" rel="noopener noreferrer">
            Visit {study.url}
            <LinkArrow />
          </Pill>
        )}
        {study.repoHref && (
          <Pill
            href={study.repoHref}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            View repo
            <LinkArrow />
          </Pill>
        )}
        <Pill href="/#contact" variant="secondary">
          Get in touch
          <LinkArrow direction="right" />
        </Pill>
      </div>
    </article>
  );
}
