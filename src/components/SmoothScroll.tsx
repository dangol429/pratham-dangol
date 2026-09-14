"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Momentum scrolling for the main page scroll.
 *
 * Lenis drives the real scroll position (rather than transforming a wrapper),
 * so IntersectionObserver-based triggers (framer-motion's whileInView in
 * <Reveal>, and the <SteppedList> viewport pause) and CSS `position: sticky`
 * on <StickyColumn> all keep working without extra syncing.
 *
 * Anything that scrolls internally can opt out with `data-lenis-prevent`.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Native scroll under prefers-reduced-motion, no easing, no RAF loop.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 0.9, // responsive with a little trailing ease, not floaty
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Leave touch alone: native momentum already feels right on mobile and
      // overriding it tends to fight the OS.
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
