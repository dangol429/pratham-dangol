import Image from "next/image";
import { EyebrowLabel } from "./EyebrowLabel";

interface PhotoFrameProps {
  label?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  frameClassName?: string;
  /** Sizing for the outer card. Default is a fixed 4:5 aspect box; pass
   * "h-full" instead when the card should fill a parent's stretched height
   * (e.g. matching a sibling grid column) rather than size itself. */
  aspectClassName?: string;
  /** Whether the hairline border shows. Off for full-bleed treatments (e.g.
   * the hero photo) where the image itself is the edge, not a card. */
  bordered?: boolean;
  /** Fades the image to transparent on its left edge (and top, if
   * fadeTop is also set) so it dissolves into the page background instead
   * of reading as a hard-edged card, used for full-bleed placements. */
  fadeLeft?: boolean;
  fadeTop?: boolean;
}

const PHOTO_TRANSITION =
  "transition-[filter,transform] duration-500 ease-out  grayscale group-hover:grayscale-0 saturate-100 group-hover:saturate-[1.15] contrast-100 group-hover:contrast-[1.05]";

function buildEdgeMask(fadeLeft?: boolean, fadeTop?: boolean) {
  const layers: string[] = [];
  if (fadeLeft)
    layers.push("linear-gradient(to right, transparent 0%, black 18%)");
  if (fadeTop)
    layers.push("linear-gradient(to bottom, transparent 0%, black 14%)");
  if (layers.length === 0) return undefined;
  return {
    maskImage: layers.join(", "),
    WebkitMaskImage: layers.join(", "),
    maskComposite: "intersect" as const,
    WebkitMaskComposite: "source-in" as const,
  };
}

export function PhotoFrame({
  label = "Photo placeholder",
  imageSrc,
  imageAlt = "",
  className = "",
  frameClassName = "rounded-2xl",
  bordered = true,
  fadeLeft = false,
  fadeTop = false,
}: PhotoFrameProps) {
  const edgeMaskStyle = buildEdgeMask(fadeLeft, fadeTop);

  return (
    <div
      className={`group w-full h-[100%] ${bordered ? "border border-foreground/10" : ""} ${frameClassName} ${className}`}
      style={edgeMaskStyle}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1231}
          height={1212}
          className={`overflow-visible object-cover w-[auto] h-[100%] ${PHOTO_TRANSITION}`}
        />
      ) : (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/[0.02] ${PHOTO_TRANSITION}`}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <EyebrowLabel>{label}</EyebrowLabel>
          </div>
        </>
      )}
    </div>
  );
}
