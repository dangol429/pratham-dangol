import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens: values are CSS custom properties defined in
        // globals.css and flipped by the .dark / .light class next-themes
        // applies to <html>. Components reference these names only — never
        // raw hex — so light/dark mode requires no per-component edits.
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        // Fixed, theme-independent tokens for surfaces that intentionally
        // stay dark regardless of site theme (e.g. the terminal mockups).
        ink: "#0A0A0A",
        "accent-vivid": "#A8FF60",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        // General Sans — every title on the site, not just the hero.
        display: [
          "var(--font-general-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "72rem",
      },
      spacing: {
        "section-sm": "4rem",
        "section-lg": "6rem",
      },
      keyframes: {
        // Shifts by exactly one copy's width (1 / REPEAT_COUNT in
        // Marquee.tsx, currently 6 copies) so the loop is seamless.
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-16.6667%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
