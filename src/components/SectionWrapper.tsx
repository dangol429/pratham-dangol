import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  // scroll-mt-28 clears the fixed nav capsule (top-4 + ~56px tall) so hash
  // links don't park the section heading underneath it.
  return (
    <section
      id={id}
      style={{ background: "var(--color-background)" }}
      className={`scroll-mt-28 py-section-sm md:py-section-lg ${className}`}
    >
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  );
}
