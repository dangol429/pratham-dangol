import type { SteppedListRow } from "@/components/SteppedList";

export interface TerminalLine {
  text: string;
  tone?: "default" | "muted" | "accent";
}

export interface CaseStudy {
  index: string;
  name: string;
  url: string;
  year?: string;
  inProgress?: boolean;
  tagline: string;
  problem: string;
  whatIBuilt: string;
  keyDecision: string;
  tags: string[];
  role: string;
  /** Live site. Rendered as the primary "Case study →" link. */
  href?: string;
  /** Public source repo, rendered as a smaller secondary link. */
  repoHref?: string;
  stepper: {
    label: string;
    rows: SteppedListRow[];
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    name: "Sathi",
    url: "sathi-puce.vercel.app",
    year: "2026",
    tagline: "A verified-professional community, built around trust before content.",
    problem:
      "Nepali professionals have no dedicated space to connect by verified profession, and students have no visibility into what those career paths actually look like day to day.",
    whatIBuilt:
      "A verified-professional community platform with profile verification, a niche-based feed, a custom reputation system called Dhog, and a real-time messaging widget called Kura.",
    keyDecision:
      "Verification and reputation are the trust layer the whole feed design depends on — built first, before any content features.",
    // TODO(Pratham): confirm real backend/DB stack so these tags aren't guessed.
    tags: ["React", "TypeScript"],
    role: "Sole Developer & Designer",
    href: "https://sathi-puce.vercel.app/",
    // Rows derived from the whatIBuilt copy above (profile verification,
    // niche feed, Dhog, Kura) — not new claims, just restructured.
    stepper: {
      label: "sathi — modules",
      rows: [
        { label: "Profile verification", sublabel: "verified only" },
        { label: "Niche-based feed", sublabel: "by profession" },
        { label: "Reputation — Dhog", sublabel: "trust score" },
        { label: "Messaging — Kura", sublabel: "real-time" },
      ],
    },
  },
  {
    index: "02",
    name: "Fretwork",
    url: "fretworkforguitar.com",
    // TODO(Pratham): confirm the year this shipped.
    tagline: "A fast, clutter-free chord reference for guitar players.",
    problem:
      "Existing guitar chord references are cluttered or paywalled for a simple lookup task.",
    whatIBuilt: "A fast, clean chord/reference tool for guitar players.",
    // TODO(Pratham): what was the key technical/product decision here? Ask before publishing.
    keyDecision:
      "TODO — add the specific decision that shaped this build (Pratham to confirm).",
    // TODO(Pratham): confirm real stack.
    tags: ["Stack TBD"],
    role: "Sole Developer",
    href: "https://fretworkforguitar.com",
    repoHref: "https://github.com/dangol429/Fretwork",
    // Rows derived from the previous terminal mockup's content (chord
    // search, diagram rendering, variations, caching).
    stepper: {
      label: "fretwork — modules",
      rows: [
        { label: "Chord search", sublabel: "instant" },
        { label: "Diagram rendering", sublabel: "clean SVG" },
        { label: "Variations", sublabel: "multiple voicings" },
        { label: "Caching", sublabel: "instant repeat lookups" },
      ],
    },
  },
  {
    index: "03",
    name: "Finance Tracker",
    url: "in development",
    inProgress: true,
    tagline: "A personal finance tracker, and a hands-on way to learn backend engineering.",
    // TODO(Pratham): fill in the actual problem this solves for you.
    problem: "TODO — add the problem this project solves (Pratham to confirm).",
    whatIBuilt:
      "A personal finance tracker built with FastAPI as part of a structured Python learning track.",
    // TODO(Pratham): fill in the key decision.
    keyDecision: "TODO — add the key decision behind this build (Pratham to confirm).",
    // TODO(Pratham): confirm DB choice / any other stack pieces.
    tags: ["FastAPI", "Python"],
    role: "In progress",
    // Rows derived from the previous terminal mockup's content (uvicorn
    // server, db connection, transactions/budgets routes).
    stepper: {
      label: "finance-tracker — modules",
      rows: [
        { label: "API server", sublabel: "FastAPI" },
        { label: "Database", sublabel: "connected" },
        { label: "Transactions", sublabel: "/transactions" },
        { label: "Budgets", sublabel: "/budgets" },
      ],
    },
  },
];

export interface AlsoShippedItem {
  index: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  href?: string;
}

// TODO(Pratham): add any smaller/older shipped projects here — title, url,
// one-line description, tech tags, and an optional case-study link. The
// "Also shipped" section stays hidden until this array has entries.
export const ALSO_SHIPPED: AlsoShippedItem[] = [];
