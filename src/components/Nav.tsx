"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import { Logo } from "./Logo";
import { Pill } from "./Pill";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-content">
        <div className="relative flex items-center justify-between gap-4 rounded-full border border-foreground/10 bg-background/40 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-md sm:px-6">
          <div className="flex flex-1">
            <Logo />
          </div>

          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden md:block">
              <Pill href="/#contact" variant="primary" className="text-xs">
                Hire me <span aria-hidden="true">↗</span>
              </Pill>
            </div>

            <ThemeToggle />

            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L15 15M15 1L1 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M1 4H15M1 8H15M1 12H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="mt-3 rounded-2xl border border-foreground/10 bg-background/90 px-6 py-4 shadow-lg shadow-black/10 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Pill
                  href="/#contact"
                  variant="primary"
                  className="text-xs"
                  onClick={() => setOpen(false)}
                >
                  Hire me <span aria-hidden="true">↗</span>
                </Pill>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
