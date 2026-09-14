"use client";

import { useEffect, useState } from "react";
import { GlitchText } from "./GlitchText";

// Kept to a similar length on purpose: every phrase shares one reserved
// height, so one that wraps to fewer lines than the tallest leaves dead space
// above the paragraph below. At these lengths they all wrap to two lines on
// desktop, which means no slack at all.
export const HERO_PHRASES = [
  "I build fast, tested frontends that last.",
  "I use AI tooling to ship features faster.",
  "I care about the system, not just the UI.",
  "I turn vague requests into real products.",
];

const CYCLE_MS = 5000;

// One step down in size from the previous clamp(1.75rem,5vw,3rem), with
// tighter leading for denser stacking. font-bold (700) rather than
// extrabold: 700 is General Sans's heaviest real weight, and 800 would be
// synthesised.
const HEADLINE_TEXT_CLASSES =
  "text-[clamp(1.5rem,4vw,2.5rem)] font-display font-bold leading-[1.08] tracking-tight";

interface RotatingHeadlineProps {
  className?: string;
}

export function RotatingHeadline({ className = "" }: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;

    const tick = () => setIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    const start = () => {
      id = setInterval(tick, CYCLE_MS);
    };
    const stop = () => {
      if (id) clearInterval(id);
    };

    if (document.visibilityState === "visible") start();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    // Every phrase is stacked into the same grid cell, so the row is exactly
    // as tall as whichever one wraps tallest at the current width. Measuring
    // the longest string instead would be wrong: the most characters and the
    // most lines aren't the same phrase once a long word forces an early wrap.
    <div className={`grid ${className}`}>
      {HERO_PHRASES.map((phrase) => (
        <div
          key={phrase}
          aria-hidden="true"
          className={`invisible [grid-area:1/1] ${HEADLINE_TEXT_CLASSES}`}
        >
          {phrase}
        </div>
      ))}

      {/* Centred in that cell rather than pinned to the top, so any slack
          splits above and below instead of pooling between the headline and
          the paragraph under it. */}
      <div className="flex items-center [grid-area:1/1]">
        <GlitchText
          text={HERO_PHRASES[index]}
          as="h1"
          className={`text-foreground ${HEADLINE_TEXT_CLASSES}`}
        />
      </div>
    </div>
  );
}
