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
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
      spacing: {
        "section-sm": "6.25rem",
        "section-lg": "10rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
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
