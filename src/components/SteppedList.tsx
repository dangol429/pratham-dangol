"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface SteppedListRow {
  label: string;
  sublabel?: string;
}

interface SteppedListProps {
  rows: SteppedListRow[];
  /** Time each row stays active before advancing, in ms. */
  stepMs?: number;
  className?: string;
}

// Fixed dark palette (white/accent-vivid), matching TerminalCard's
// intentional theme-independence, this is a UI mockup, not page chrome, so
// it should read the same in light or dark mode.
export function SteppedList({ rows, stepMs = 1350, className = "" }: SteppedListProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only animate while the card is actually visible, no wasted work
  // off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !inView || rows.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rows.length);
    }, stepMs);
    return () => clearInterval(id);
  }, [shouldReduceMotion, inView, rows.length, stepMs]);

  return (
    <div ref={containerRef} className={`font-mono text-sm ${className}`}>
      {rows.map((row, index) => {
        const isActive = shouldReduceMotion ? index === 0 : index === activeIndex;
        const isLast = index === rows.length - 1;

        return (
          <div key={`${row.label}-${index}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-[background-color,box-shadow,border-color] duration-[220ms] ease-out ${
                  isActive
                    ? "border-accent-vivid bg-accent-vivid shadow-[0_0_0_4px_rgba(168,255,96,0.22),0_0_10px_2px_rgba(168,255,96,0.55)]"
                    : "border-white/25 bg-transparent"
                }`}
              />
              {!isLast && <span aria-hidden="true" className="w-px flex-1 bg-white/15" />}
            </div>

            <p className={`pb-6 ${isLast ? "!pb-0" : ""}`}>
              <span
                className={`transition-[color,font-weight] duration-[220ms] ease-out ${
                  isActive ? "font-semibold text-white" : "font-normal text-white/45"
                }`}
              >
                {row.label}
              </span>
              {row.sublabel && <span className="ml-2 text-white/35">{row.sublabel}</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
}
