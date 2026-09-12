import { EyebrowLabel } from "./EyebrowLabel";
import { PhotoFrame } from "./PhotoFrame";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";
import { RotatingHeadline } from "./RotatingHeadline";

export function Hero() {
  return (
    <div className="mx-auto max-w-content px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <Reveal className="grid items-stretch gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EyebrowLabel>PRATHAM DANGOL · FRONTEND DEVELOPER</EyebrowLabel>

          <RotatingHeadline className="mt-6" />

          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted">
            I&apos;m a frontend developer based in Birgunj, Nepal, working
            remotely with{" "}
            <strong className="font-semibold text-foreground">
              2+ years building production React and TypeScript
            </strong>{" "}
            applications — from real-time features to{" "}
            <strong className="font-semibold text-foreground">
              fully tested, reliable interfaces
            </strong>{" "}
            using GraphQL, Cypress, and Jest.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Pill href="#work" variant="primary">
              View my work
            </Pill>
            <Pill href="#contact" variant="secondary">
              Get in touch
            </Pill>
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            Birgunj, Nepal · Remote · Open to roles &amp; contracts
          </p>
        </div>

        <div className="hidden lg:col-span-5 lg:-mr-6 lg:block xl:-mr-10">
          <PhotoFrame
            frameClassName="rounded-2xl rounded-r-none"
            aspectClassName="h-full"
            imageSrc="/img/profile.png"
          />
        </div>
      </Reveal>
    </div>
  );
}
