import Link from "next/link";
import { CONTACT_EMAIL, NAV_LINKS, SOCIAL_LINKS } from "@/data/site";
import { EyebrowLabel } from "./EyebrowLabel";
import { LinkArrow } from "./LinkArrow";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <Reveal className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Frontend developer building fast, tested interfaces — remotely.
            </p>
          </div>

          <div>
            <EyebrowLabel>Navigate</EyebrowLabel>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <EyebrowLabel>Contact</EyebrowLabel>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {CONTACT_EMAIL}
              <LinkArrow />
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {social.label}
                  <LinkArrow />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div
          className="mt-16 overflow-hidden md:mt-20"
          style={{ maxHeight: "clamp(3.5rem, 16vw, 10rem)" }}
          aria-hidden="true"
        >
          <p
            className="select-none text-center font-sans font-extrabold text-foreground/10"
            style={{
              fontSize: "clamp(4rem, 24vw, 15rem)",
              lineHeight: 0.8,
              WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
            }}
          >
            PRATHAM
          </p>
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted/70">
          © 2026 Pratham Dangol. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
