import type { SteppedListRow } from "@/components/SteppedList";

export interface TerminalLine {
  text: string;
  tone?: "default" | "muted" | "accent";
}

export interface CaseStudy {
  index: string;
  /** URL segment for the case study page at /work/[slug]. */
  slug: string;
  name: string;
  url: string;
  year?: string;
  inProgress?: boolean;
  tagline: string;
  /** Opening paragraph on the case study page, under the meta row. Omitted
   *  until there's something to say beyond the tagline. */
  intro?: string;
  problem: string;
  whatIBuilt: string;
  keyDecision: string;
  /** Optional closing note on the case study page, for anything that doesn't
   *  belong under the three headings above. */
  alsoTrue?: string;
  tags: string[];
  role: string;
  /** Live site. The project name links here, and so does the footer button on
   *  the case study page. */
  href?: string;
  /** Public source repo, rendered as a smaller secondary link. */
  repoHref?: string;
  /** Screenshot of the live site. Takes the place of the stepper mockup when
   *  there's something real to show. Captured at 1200x750. */
  screenshot?: { src: string; alt: string };
  stepper: {
    label: string;
    rows: SteppedListRow[];
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    slug: "sathi",
    name: "Sathi",
    url: "sathi-puce.vercel.app",
    year: "2026",
    tagline:
      "A verified-professional community, built around trust before content.",
    problem:
      "No platform anchored professional identity to a verifiable source, so feeds ranked self-reported titles and low-signal engagement identically. Nepali students had no reliable way to see what a given career path actually involves.",
    whatIBuilt:
      "Next.js App Router and TypeScript on Vercel, with Supabase for Postgres, row-level security, object storage, and realtime. LinkedIn OAuth gates verification, so every profile resolves to a checkable identity. Niche filtering runs through URL query params against one server-rendered feed rather than separate routes, keeping it crawlable. Dhog scores reputation; Kura handles realtime messaging.",
    keyDecision:
      "Reputation weighting sits in the query layer, not moderation policy. Verified activity carries more weight, so brigading loses leverage structurally rather than after review.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "LinkedIn OAuth",
      "Realtime",
      "Vercel",
    ],
    role: "Sole Developer & Designer",
    href: "https://sathi-puce.vercel.app/",
    screenshot: {
      src: "/img/sathi.webp",
      alt: "The Sathi landing page: 'Where Nepal asks Nepal', with verified-professional post cards alongside it.",
    },
    stepper: {
      label: "sathi · modules",
      rows: [
        { label: "Profile verification", sublabel: "verified only" },
        { label: "Niche-based feed", sublabel: "by profession" },
        { label: "Reputation · Dhog", sublabel: "trust score" },
        { label: "Messaging · Kura", sublabel: "real-time" },
      ],
    },
  },
  {
    index: "02",
    slug: "fretwork",
    name: "Fretwork",
    url: "fretworkforguitar.com",
    tagline: "A fast, clutter-free chord reference for guitar players.",
    problem:
      "Existing chord references either paywall a five-second lookup or dump every theoretical voicing with no playability ordering, and none account for shapes a beginner's hand can't fret yet.",
    whatIBuilt:
      "Vite, React, and TypeScript. Chord data from @tombatossals/chords-db is ranked by a playability heuristic rather than theory convention, with capo-based substitute shapes for awkward open voicings. Audio is synthesized per note in the browser through the Web Audio API, not sampled. Deployed to a custom domain with GA4 instrumentation.",
    keyDecision:
      "Karplus-Strong physical modeling over a sample library. Modeling a plucked string is harder than playing a file, but it makes any arbitrary voicing playable instantly without shipping thousands of audio assets.",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Web Audio API",
      "Karplus-Strong Synthesis",
      "DSP",
      "GA4",
    ],
    role: "Sole Developer",
    href: "https://fretworkforguitar.com",
    repoHref: "https://github.com/dangol429/Fretwork",
    screenshot: {
      src: "/img/fretwork.webp",
      alt: "The Fretwork landing page: an illustrated guitar with a 'Search a chord' field across its neck.",
    },
    stepper: {
      label: "fretwork · modules",
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
    slug: "finance-tracker",
    name: "Finance Tracker",
    url: "in development",
    inProgress: true,
    tagline:
      "A personal finance tracker, and a hands-on way to learn backend engineering.",
    problem:
      "Building a backend rather than consuming one. Accounts, transactions, and budgets carry enough relational complexity to learn FastAPI, SQLAlchemy, and schema design properly, unlike a CRUD tutorial.",
    whatIBuilt:
      "FastAPI and PostgreSQL behind a React frontend, built milestone by milestone: scaffolding, config, and a health-check endpoint first, then the SQLAlchemy data layer and core routes. Currently milestone 1 of 18.",
    keyDecision:
      "SQLAlchemy models and Pydantic schemas kept strictly separate from day one: models own storage integrity, schemas own the API contract. The same boundary GraphQL types enforce, declared explicitly instead of generated.",
    tags: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Pydantic",
      "REST",
      "React",
    ],
    role: "Sole Developer",
    stepper: {
      label: "finance-tracker · modules",
      rows: [
        { label: "API server", sublabel: "FastAPI" },
        { label: "Database", sublabel: "connected" },
        { label: "Transactions", sublabel: "/transactions" },
        { label: "Budgets", sublabel: "/budgets" },
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export interface AlsoShippedItem {
  index: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  href?: string;
}

// TODO(Pratham): add any smaller/older shipped projects here: title, url,
// one-line description, tech tags, and an optional case-study link. The
// "Also shipped" section stays hidden until this array has entries.
export const ALSO_SHIPPED: AlsoShippedItem[] = [];
