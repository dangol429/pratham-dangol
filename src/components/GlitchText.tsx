"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type GlitchTextTag = "h1" | "h2" | "h3" | "span" | "div";

interface GlitchTextProps {
  text: string;
  as?: GlitchTextTag;
  className?: string;
}

// Total glitch burst duration — stays in the 150-250ms "fast flicker" range
// requested, never a slow effect.
const GLITCH_MS = 200;

// Chromatic-aberration layers: duplicate text tinted toward one RGB channel,
// composited with mix-blend-mode: difference (reads clearly on both light
// and dark surfaces, unlike "screen" which washes out on light backgrounds)
// and jittered a few px horizontally.
const RGB_LAYERS = [
  { color: "#ff3b5c", x: [0, 3, -2, 1, 0], opacity: [0, 0.85, 0.7, 0.5, 0] },
  { color: "#39ffb0", x: [0, -3, 2, -1, 0], opacity: [0, 0.8, 0.65, 0.45, 0] },
  { color: "#3b8dff", x: [0, 2, -3, 2, 0], opacity: [0, 0.85, 0.6, 0.5, 0] },
];

// Brief horizontal "slice" bands — a thin clipped strip that jumps sideways
// for a beat then resets, mimicking a scanline tear.
const SLICE_LAYERS = [
  { color: "#ff3b5c", band: "inset(22% 0 62% 0)", x: [0, 0, 8, 0, 0] },
  { color: "#3b8dff", band: "inset(58% 0 20% 0)", x: [0, 0, 0, -7, 0] },
];

export function GlitchText({ text, as: Tag = "span", className = "" }: GlitchTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [prevText, setPrevText] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const [glitchId, setGlitchId] = useState(0);

  // Adjusting state during render (React's documented pattern for "reset
  // state when a prop changes") instead of in an effect — reduced-motion
  // hard-cuts by simply never entering the glitching branch.
  if (text !== prevText) {
    setPrevText(text);
    if (!shouldReduceMotion) {
      setGlitching(true);
      setGlitchId((id) => id + 1);
    }
  }

  // The timer itself is a legitimate effect: synchronizing with an external
  // clock to end the glitch burst after GLITCH_MS.
  useEffect(() => {
    if (glitchId === 0) return;
    const timeout = setTimeout(() => setGlitching(false), GLITCH_MS);
    return () => clearTimeout(timeout);
  }, [glitchId]);

  return (
    <Tag className={className}>
      <span className="relative block w-full">
        {/* Clean base layer — always present, this is what's announced to AT. */}
        <span className="block">{text}</span>

        {glitching && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 top-0 block w-full">
            {RGB_LAYERS.map((layer, i) => (
              <motion.span
                key={`rgb-${glitchId}-${i}`}
                className="absolute inset-0 top-0 block w-full"
                style={{ color: layer.color, mixBlendMode: "difference", willChange: "transform, opacity" }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: layer.x, opacity: layer.opacity }}
                transition={{ duration: GLITCH_MS / 1000, ease: "easeOut" }}
              >
                {text}
              </motion.span>
            ))}

            {SLICE_LAYERS.map((layer, i) => (
              <motion.span
                key={`slice-${glitchId}-${i}`}
                className="absolute inset-0 top-0 block w-full"
                style={{
                  color: layer.color,
                  clipPath: layer.band,
                  mixBlendMode: "difference",
                  willChange: "transform, opacity, clip-path",
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: layer.x, opacity: [0, 1, 0, 1, 0] }}
                transition={{ duration: GLITCH_MS / 1000, ease: "linear" }}
              >
                {text}
              </motion.span>
            ))}
          </span>
        )}
      </span>
    </Tag>
  );
}
