export const CONTACT_EMAIL = "prathamdangol@gmail.com";

/** Local static asset in /public, never an external URL. */
export const RESUME_PATH = "/resume.pdf";

// Hash targets are written as "/#id" rather than "#id" because the nav and
// footer render on /resume too, where a bare "#work" would resolve to
// /resume#work and go nowhere.
export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "How I build", href: "/#how-i-build" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Resume", href: "/resume" },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/dangol429" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pratham-dangol-62b911223/",
  },
  // NOTE(Pratham): LeetCode is parked in the footer/contact social row for
  // now since there's no "Study track" section. Move it into the Stack
  // section if you'd rather it sit with the tooling.
  { label: "LeetCode", href: "https://leetcode.com/u/ghosteyyy/" },
];

/** Employer link used by the About timeline. */
export const ALGOBULLS_LINKEDIN = "https://www.linkedin.com/company/algobulls";
