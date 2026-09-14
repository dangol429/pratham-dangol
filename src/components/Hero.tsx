import { BackgroundTexture } from "./BackgroundTexture";
import { EyebrowLabel } from "./EyebrowLabel";
import { LinkArrow } from "./LinkArrow";
import { PhotoFrame } from "./PhotoFrame/PhotoFrame";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";
import { RotatingHeadline } from "./RotatingHeadline";

export function Hero() {
  return (
    <div
      className="relative isolate overflow-hidden font-general"
      style={{ height: "77vh" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-content px-6 pt-16 md:pt-14">
        {/* items-start aligns the eyebrow's top edge with the top of the
            photo; the wider lg gap opens up negative space between them. */}
        <Reveal className="grid items-start gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-6">
            <EyebrowLabel>PRATHAM DANGOL · FRONTEND DEVELOPER</EyebrowLabel>

            <RotatingHeadline className="mt-6" />

            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted">
              I&apos;m a frontend developer working remotely with{" "}
              {/* Emphasis via accent colour at the same weight as the
                  surrounding copy — <strong> keeps the semantics. */}
              <strong className="font-normal text-accent">
                3+ years building production React and TypeScript
              </strong>{" "}
              applications — from real-time features to{" "}
              <strong className="font-normal text-accent">
                fully tested, reliable interfaces
              </strong>{" "}
              using GraphQL, Cypress, and Jest.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Pill href="#work" variant="primary">
                View my work
                <LinkArrow direction="down-right" />
              </Pill>
              <Pill href="#contact" variant="secondary">
                Get in touch
                <LinkArrow direction="down-right" />
              </Pill>
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
              Remote · Open to roles &amp; contracts
            </p>
          </div>

          {/* No border, no rounding, no card — just the image, faded into the
              background on its left/top edges. */}
          <div className="hidden lg:col-span-6 lg:-mr-6 lg:block xl:-mr-10">
            <PhotoFrame
              imageSrc="/img/profile.png"
              bordered={false}
              frameClassName="rounded-none"
              page="hero"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
