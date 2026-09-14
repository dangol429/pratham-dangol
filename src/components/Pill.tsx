"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

type PillVariant = "primary" | "secondary";

// `pill` drives the shared interaction layer in globals.css: the ambient
// shine sweep (::after) and the cursor-follow spotlight (::before).
// gap-2 spaces a trailing <LinkArrow /> from the label, no effect on
// single-child pills.
const baseClasses =
  "pill inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out";

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
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    /** Render a plain <a> instead of next/link, for external URLs and
     * static files like /resume.pdf, which shouldn't be client-routed
     * or prefetched. */
    external?: boolean;
  };

type PillAsButton = PillOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type PillProps = PillAsLink | PillAsButton;

export function Pill({ variant = "primary", children, className = "", ...props }: PillProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  // Random per-instance offset so multiple visible buttons don't glint in
  // unison; in sync reads robotic. Written straight to the node rather than
  // held in state: Math.random() can't run during SSR without causing a
  // hydration mismatch, and this is a one-shot DOM write.
  useEffect(() => {
    ref.current?.style.setProperty(
      "--pill-shine-delay",
      `${-(Math.random() * 5).toFixed(2)}s`,
    );
  }, []);

  // Cursor spotlight: write the pointer position into CSS custom properties
  // and let a radial-gradient read them, rather than moving a DOM node.
  // rAF-throttled so it runs at most once per frame.
  const handleMouseMove = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;

    // Read coordinates now; the event must not be touched inside the rAF.
    const { clientX, clientY } = event;
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--pill-x", `${clientX - rect.left}px`);
      el.style.setProperty("--pill-y", `${clientY - rect.top}px`);
    });
  }, []);

  // Recentre on leave so the next hover doesn't flash at the stale position.
  const handleMouseLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--pill-x", "50%");
    el.style.setProperty("--pill-y", "50%");
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const interaction = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (props.href) {
    const { href, external, ...anchorProps } = props as PillAsLink;

    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...interaction}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...interaction}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as PillAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...interaction}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
