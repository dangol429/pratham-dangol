import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-section-sm md:py-section-lg ${className}`}>
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  );
}
