import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";
import { SectionWrapper } from "./SectionWrapper";
import { Tag } from "./Tag";

interface StackCategory {
  title: string;
  principle: string;
  tags: string[];
}

const CATEGORIES: StackCategory[] = [
  {
    title: "Frontend & UI",
    principle: "The interface is part of the product, not a layer added at the end.",
    tags: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    title: "Testing & Quality",
    principle: "I'd rather catch a regression in CI than in a bug report.",
    tags: ["Cypress", "Jest"],
  },
  {
    title: "Backend & Data",
    principle: "I prefer simple systems that keep important logic close to the data.",
    // TODO(Pratham): confirm the real DB/stack beyond FastAPI + Python.
    tags: ["FastAPI", "Python", "DB TBD"],
  },
  {
    title: "Tooling & Workflow",
    principle:
      "Simple, boring tooling that gets out of the way — fewer moving parts between a commit and a deploy.",
    // TODO(Pratham): confirm the full tooling list. Vercel is inferred from the Sathi
    // deploy URL and Git is assumed — add/remove to match what you actually use
    // (CI, editor, design tools, etc.).
    tags: ["Git", "GitHub", "Vercel"],
  },
];

export function Stack() {
  return (
    <SectionWrapper id="stack">
      <SectionIntro eyebrow="Technical depth" heading="What I reach for, and why.">
        Not a proficiency chart. Grouped by why, not just what.
      </SectionIntro>

      <Reveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20">
        {CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8"
          >
            <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{category.principle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </SectionWrapper>
  );
}
