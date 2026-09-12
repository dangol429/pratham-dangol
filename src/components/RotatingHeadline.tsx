"use client";

import { useEffect, useState } from "react";
import { GlitchText } from "./GlitchText";

export const HERO_PHRASES = [
  "I build frontends that are fast, tested, and built to last.",
  "I use AI tooling to ship production features faster.",
  "I care about the whole system, not just the UI layer.",
  "I turn messy requirements into reliable products.",
];

// Longest phrase by character count — rendered invisibly in normal flow so
// the rotator always reserves exactly the height its tallest wrap needs, at
// any viewport width. This tracks the headline's clamp() sizing exactly
// (unlike a hardcoded min-height per breakpoint), so it can't drift out of
// sync and let a phrase overflow into the content below.
const LONGEST_PHRASE = HERO_PHRASES.reduce((longest, phrase) =>
  phrase.length > longest.length ? phrase : longest,
);

const CYCLE_MS = 5000;

const HEADLINE_TEXT_CLASSES =
  "text-[clamp(1.75rem,5vw,3rem)] font-sans font-extrabold tracking-tight";

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
    <div className={`relative ${className}`}>
      {/*
        Invisible spacer in normal flow — same font/clamp classes as the
        real headline below — so this container is always exactly tall
        enough for the longest phrase's wrap at the current viewport width.
        This is what keeps the layout stable across 1-3 line phrases.
      */}
      <div aria-hidden="true" className={`invisible ${HEADLINE_TEXT_CLASSES}`}>
        {LONGEST_PHRASE}
      </div>

      <GlitchText
        text={HERO_PHRASES[index]}
        as="h1"
        className={`absolute inset-0 top-0 text-foreground ${HEADLINE_TEXT_CLASSES}`}
      />
    </div>
  );
}
