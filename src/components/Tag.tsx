import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
