import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type PillVariant = "primary" | "secondary";

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-colors";

const variantClasses: Record<PillVariant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/90",
  secondary:
    "border border-foreground/30 bg-transparent text-foreground hover:border-foreground/60",
};

interface PillOwnProps {
  variant?: PillVariant;
  children: ReactNode;
  className?: string;
}

type PillAsLink = PillOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type PillAsButton = PillOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type PillProps = PillAsLink | PillAsButton;

export function Pill({ variant = "primary", children, className = "", ...props }: PillProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (props.href) {
    const { href, ...anchorProps } = props as PillAsLink;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as PillAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
