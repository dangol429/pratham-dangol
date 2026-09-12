"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// Avoids a hydration mismatch without the "setState in an effect" pattern:
// resolvedTheme is genuinely undefined on the server/first client render,
// so we render a neutral icon until this flips true post-hydration.
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M8 0.75V2.25M8 13.75V15.25M15.25 8H13.75M2.25 8H0.75M13.127 2.873L12.066 3.934M3.934 12.066L2.873 13.127M13.127 13.127L12.066 12.066M3.934 3.934L2.873 2.873"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14 9.5A6.25 6.25 0 1 1 6.5 2a5 5 0 0 0 7.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-foreground/15 text-foreground transition-colors hover:border-foreground/30"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
