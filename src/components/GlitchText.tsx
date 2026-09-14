"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type GlitchTextTag = "h1" | "h2" | "h3" | "span" | "div";

interface GlitchTextProps {
  text: string;
  as?: GlitchTextTag;
  className?: string;
}

// Total glitch burst duration. Long enough to actually read the RGB-split
// happening rather than catching a single flicker frame.
const GLITCH_MS = 560;

// Each keyframe value is repeated in pairs and paired with these times, so
// the animation *snaps* to a position and *holds* it (~110ms) rather than
// easing smoothly between positions. That hold is what makes the steps read
// as discrete glitch frames. Four held frames, then settle.
const STEP_TIMES = [0, 0.05, 0.25, 0.3, 0.5, 0.55, 0.75, 0.8, 1];

// Chromatic-aberration layers: duplicate text tinted toward one RGB channel,
// composited with mix-blend-mode: difference (reads clearly on both light
// and dark surfaces, unlike "screen" which washes out on light backgrounds)
// and jittered a few px horizontally.
const RGB_LAYERS = [
  {
    color: "#ff3b5c",
    x: [0, 6, 6, -5, -5, 4, 4, -2, 0],
    opacity: [0, 0.9, 0.9, 0.6, 0.6, 0.85, 0.85, 0.4, 0],
  },
  {
    color: "#39ffb0",
    x: [0, -5, -5, 4, 4, -3, -3, 2, 0],
    opacity: [0, 0.85, 0.85, 0.55, 0.55, 0.8, 0.8, 0.35, 0],
  },
  {
    color: "#3b8dff",
    x: [0, 4, 4, -6, -6, 2, 2, 3, 0],
    opacity: [0, 0.9, 0.9, 0.5, 0.5, 0.75, 0.75, 0.4, 0],
  },
];

// Horizontal "slice" bands — a thin clipped strip that jumps sideways and
// holds, mimicking a scanline tear. The two bands alternate across the
// window so there are four distinct tears rather than one blip.
const SLICE_LAYERS = [
  {
    color: "#ff3b5c",
    band: "inset(22% 0 62% 0)",
    x: [0, 11, 11, 0, 0, 7, 7, 0, 0],
    opacity: [0, 1, 1, 0, 0, 1, 1, 0, 0],
  },
  {
    color: "#3b8dff",
    band: "inset(58% 0 20% 0)",
    x: [0, 0, 0, -10, -10, 0, 0, -6, 0],
    opacity: [0, 0, 0, 1, 1, 0, 0, 1, 0],
  },
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
                transition={{ duration: GLITCH_MS / 1000, times: STEP_TIMES, ease: "linear" }}
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
                animate={{ x: layer.x, opacity: layer.opacity }}
                transition={{ duration: GLITCH_MS / 1000, times: STEP_TIMES, ease: "linear" }}
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
