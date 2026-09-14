import type { ReactNode } from "react";

interface StickyColumnProps {
  children: ReactNode;
  /** Grid placement classes for the column (col-span, order, etc.). */
  className?: string;
}

/**
 * The shorter column of a two-column row: pins below the nav and follows the
 * scroll while the taller sibling scrolls past, then releases when the row
 * ends.
 *
 * Two requirements for this to actually work:
 *  - the parent row must use `items-start`, otherwise the grid stretches this
 *    item to full row height and sticky has zero travel;
 *  - it only engages at `lg`, where the two-column layout exists, below that
 *    the columns are stacked and sticky would just pin content oddly.
 *
 * top-24 (96px) clears the nav capsule, whose bottom edge sits at 74px
 * (top-4 offset + 58px tall, measured), leaving ~22px of breathing room.
 */
export function StickyColumn({ children, className = "" }: StickyColumnProps) {
  return (
    <div className={`lg:sticky lg:top-24 lg:self-start ${className}`}>{children}</div>
  );
}
