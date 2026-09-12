import { About } from "@/components/About";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Hero } from "@/components/Hero";
import { HowIBuild } from "@/components/HowIBuild";
import { Marquee } from "@/components/Marquee";
import { SelectedWork } from "@/components/SelectedWork";
import { Stack } from "@/components/Stack";

const TECH_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "GraphQL",
  "Cypress",
  "Jest",
  "Tailwind CSS",
  "FastAPI",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={TECH_STACK} />
      <SelectedWork />
      <HowIBuild />
      <About />
      <Stack />
      <ClosingCTA />
    </>
  );
}
