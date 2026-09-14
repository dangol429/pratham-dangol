import type { IconType } from "react-icons";
import {
  SiAntdesign,
  SiClaude,
  SiCss,
  SiCypress,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGatsby,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiPytest,
  SiReact,
  SiRedis,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbComponents, TbDatabaseSearch, TbMessage2Code, TbSql } from "react-icons/tb";

export interface Tech {
  label: string;
  icon: IconType;
  /** Brand hex, for logos with a real accent color. A few are nudged darker
   *  than the official brand color (JS gold, React cyan) so they stay legible
   *  on the light theme's near-white background. Left unset for monochrome
   *  logos and generic icons, which inherit the muted foreground color. */
  color?: string;
}

export const TECH = {
  javascript: { label: "JavaScript (ES6+)", icon: SiJavascript, color: "#D9B700" },
  typescript: { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  python: { label: "Python", icon: SiPython, color: "#3776AB" },
  php: { label: "PHP", icon: SiPhp, color: "#777BB4" },
  sql: { label: "SQL", icon: TbSql },

  react: { label: "React", icon: SiReact, color: "#149ECA" },
  next: { label: "Next.js", icon: SiNextdotjs },
  redux: { label: "Redux", icon: SiRedux, color: "#764ABC" },
  graphql: { label: "GraphQL", icon: SiGraphql, color: "#E10098" },
  tailwind: { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  html: { label: "HTML5", icon: SiHtml5, color: "#E34F26" },
  css: { label: "CSS3", icon: SiCss, color: "#1572B6" },
  gatsby: { label: "Gatsby", icon: SiGatsby, color: "#663399" },
  umi: { label: "UmiJS", icon: TbComponents },
  antd: { label: "Ant Design", icon: SiAntdesign, color: "#0170FE" },

  node: { label: "Node.js", icon: SiNodedotjs, color: "#339933" },
  express: { label: "Express.js", icon: SiExpress },
  fastapi: { label: "FastAPI", icon: SiFastapi, color: "#009688" },
  laravel: { label: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  supabase: { label: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  postgres: { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  mysql: { label: "MySQL", icon: SiMysql, color: "#4479A1" },
  mongo: { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
  redis: { label: "Redis", icon: SiRedis, color: "#DC382D" },
  docker: { label: "Docker", icon: SiDocker, color: "#2496ED" },

  llmApi: { label: "LLM API Integration", icon: TbApi },
  rag: { label: "RAG", icon: TbDatabaseSearch },
  prompting: { label: "Prompt Engineering", icon: TbMessage2Code },
  claudeCode: {
    label: "AI-Assisted Development (Claude Code, daily use)",
    icon: SiClaude,
    color: "#D97757",
  },

  jest: { label: "Jest", icon: SiJest, color: "#C21325" },
  cypress: { label: "Cypress", icon: SiCypress },
  pytest: { label: "pytest", icon: SiPytest, color: "#0A9EDC" },
  cicd: { label: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
  git: { label: "Git", icon: SiGit, color: "#F05032" },
} satisfies Record<string, Tech>;

export interface TechCategory {
  title: string;
  principle: string;
  skills: Tech[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Languages",
    principle: "The language is a tool for the job, not an identity.",
    skills: [TECH.javascript, TECH.typescript, TECH.python, TECH.php, TECH.sql],
  },
  {
    title: "Frontend",
    principle: "The interface is part of the product, not a layer added at the end.",
    skills: [
      TECH.react,
      TECH.next,
      TECH.redux,
      TECH.graphql,
      TECH.tailwind,
      TECH.html,
      TECH.css,
      TECH.gatsby,
      TECH.umi,
      TECH.antd,
    ],
  },
  {
    title: "Backend & Data",
    principle: "I prefer simple systems that keep important logic close to the data.",
    skills: [
      TECH.node,
      TECH.express,
      TECH.fastapi,
      TECH.laravel,
      TECH.supabase,
      TECH.postgres,
      TECH.mysql,
      TECH.mongo,
      TECH.redis,
      TECH.docker,
    ],
  },
  {
    title: "AI / LLM",
    principle:
      "AI is a tool that speeds up how I build, not a replacement for understanding the system.",
    skills: [TECH.llmApi, TECH.rag, TECH.prompting, TECH.claudeCode],
  },
  {
    title: "Testing & Quality",
    principle: "I'd rather catch a regression in CI than in a bug report.",
    skills: [TECH.jest, TECH.cypress, TECH.pytest, TECH.cicd, TECH.git],
  },
];

/** The hero marquee: day-to-day stack, not the full inventory. */
export const MARQUEE_TECH: Tech[] = [
  TECH.typescript,
  TECH.react,
  TECH.next,
  TECH.graphql,
  TECH.cypress,
  TECH.jest,
  TECH.tailwind,
  TECH.fastapi,
];
