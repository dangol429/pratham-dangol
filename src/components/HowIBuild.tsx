import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";
import { SectionWrapper } from "./SectionWrapper";

const STEPS = [
  {
    index: "01",
    title: "Understand the domain",
    description:
      "Before writing a line of code, I map the users, constraints, and end goal. I want the actual workflow, not just the feature request.",
  },
  {
    index: "02",
    title: "Isolate the core",
    description: "I identify the workflows that matter most and build around them first.",
  },
  {
    index: "03",
    title: "Build with leverage",
    description:
      "I use AI tooling to accelerate implementation and exploration, but I drive the architecture and stay accountable for the code.",
  },
  {
    index: "04",
    title: "Keep the system coherent",
    description:
      "As the product grows, I care about boundaries: architecture, data, APIs, UI. Every feature should make the system better, not just bigger.",
  },
  {
    index: "05",
    title: "Ship, learn, iterate",
    description:
      "I prioritize getting a working version in front of real use rather than predicting everything upfront.",
  },
];

export function HowIBuild() {
  return (
    <SectionWrapper id="how-i-build">
      <SectionIntro eyebrow="How I build" heading="How I actually work.">
        Five steps I default to on every build — from a weekend project to a growing product. No
        process theater, just what keeps things honest as scope grows.
      </SectionIntro>

      <Reveal className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-8">
        {STEPS.map((step) => (
          <div key={step.index} className="border-t border-foreground/10 pt-6">
            <span className="font-mono text-sm text-accent">{step.index}</span>
            <h3 className="mt-3 text-base font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </div>
        ))}
      </Reveal>
    </SectionWrapper>
  );
}
