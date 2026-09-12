import type { TerminalLine } from "@/data/work";
import { MockupCard } from "./MockupCard";

interface TerminalCardProps {
  label: string;
  lines: TerminalLine[];
  className?: string;
}

const toneClasses: Record<NonNullable<TerminalLine["tone"]>, string> = {
  default: "text-white/80",
  muted: "text-white/40",
  accent: "text-accent-vivid",
};

export function TerminalCard({ label, lines, className = "" }: TerminalCardProps) {
  return (
    <MockupCard label={label} className={className}>
      <div className="space-y-2.5 font-mono text-sm leading-relaxed">
        {lines.map((line, index) => (
          <p key={index} className={toneClasses[line.tone ?? "default"]}>
            {line.text}
          </p>
        ))}
      </div>
    </MockupCard>
  );
}
