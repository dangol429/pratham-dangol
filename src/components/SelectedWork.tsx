import { ALSO_SHIPPED, CASE_STUDIES } from "@/data/work";
import { AlsoShipped } from "./AlsoShipped";
import { CaseStudyRow } from "./CaseStudyRow";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";
import { SectionWrapper } from "./SectionWrapper";

export function SelectedWork() {
  return (
    <SectionWrapper id="work">
      <SectionIntro
        eyebrow="Selected work"
        heading="A few things I've shipped."
      >
        A handful of products I&apos;ve designed, built, and shipped end-to-end
        — from system design and UI through production code, tests, and deploys.
      </SectionIntro>

      <div className="mt-16 md:mt-20">
        {CASE_STUDIES.map((study, index) => (
          <Reveal key={study.index}>
            <CaseStudyRow study={study} reverse={index % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <AlsoShipped items={ALSO_SHIPPED} />
    </SectionWrapper>
  );
}
