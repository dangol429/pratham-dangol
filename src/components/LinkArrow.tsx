/**
 * Directional arrow for links and buttons. Direction carries meaning:
 *  - "up-right"   leaves the site (external, new tab, mailto)
 *  - "right"      navigates to another page on this site
 *  - "down-right" scrolls somewhere further down this page
 *  - "down"       downloads a file
 *
 * Drawn as an SVG sized in `em` so it scales with the label's font-size and
 * sits on the text's optical centre, unlike the unicode glyphs (↗ → ↘) this
 * replaces, which changed size and baseline depending on the font.
 * Spacing is handled by the parent's flex `gap`, never a hardcoded margin.
 */
type ArrowDirection = "up-right" | "right" | "down-right" | "down";

const ROTATION: Record<ArrowDirection, string> = {
  "up-right": "rotate-0",
  right: "rotate-45",
  "down-right": "rotate-90",
  down: "rotate-[135deg]",
};

interface LinkArrowProps {
  direction?: ArrowDirection;
  className?: string;
}

export function LinkArrow({ direction = "up-right", className = "" }: LinkArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 transition-transform ${ROTATION[direction]} ${className}`}
    >
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
