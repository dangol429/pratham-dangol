export const CONTACT_EMAIL = "prathamdangol@gmail.com";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "How I build", href: "#how-i-build" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
];

export interface SocialLink {
  label: string;
  href?: string;
}

// TODO(Pratham): add your real GitHub and LinkedIn URLs — left unlinked until then.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub" },
  { label: "LinkedIn" },
];
