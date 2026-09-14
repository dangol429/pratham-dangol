import { TECH_CATEGORIES, type Tech } from "@/data/tech";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";
import { SectionWrapper } from "./SectionWrapper";

function SkillItem({ skill }: { skill: Tech }) {
  const Icon = skill.icon;
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm text-muted">
      <Icon
        className="h-4 w-4 shrink-0"
        style={skill.color ? { color: skill.color } : undefined}
        aria-hidden="true"
      />
      {skill.label}
    </span>
  );
}

export function Stack() {
  return (
    <SectionWrapper id="stack">
      <SectionIntro eyebrow="Technical depth" heading="What I reach for, and why.">
        Not a proficiency chart. Grouped by why, not just what.
      </SectionIntro>

      <Reveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8"
          >
            <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{category.principle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
              {category.skills.map((skill, index) => (
                <span key={skill.label} className="inline-flex items-center gap-x-3">
                  <SkillItem skill={skill} />
                  {index < category.skills.length - 1 && (
                    <span className="text-foreground/20" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </SectionWrapper>
  );
}
