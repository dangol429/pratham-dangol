import { About } from "@/components/About";
import { BackgroundTexture } from "@/components/BackgroundTexture";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Hero } from "@/components/Hero";
import { HowIBuild } from "@/components/HowIBuild";
import { Marquee } from "@/components/Marquee";
import { SelectedWork } from "@/components/SelectedWork";
import { Stack } from "@/components/Stack";
import { MARQUEE_TECH } from "@/data/tech";

export default function Home() {
  return (
    <>
      <Hero />
      <BackgroundTexture />

      <Marquee items={MARQUEE_TECH} />
      <SelectedWork />
      <HowIBuild />
      <About />
      <Stack />
      <ClosingCTA />
    </>
  );
}
