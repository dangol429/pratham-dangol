const GRID_CELL = "80px";

// Keeps the grid off the edges of the hero; it reads as a texture under the
// content and dissolves before it reaches any border.
const GRID_FADE =
  "radial-gradient(ellipse 80% 70% at 50% 38%, #000 25%, rgba(0,0,0,0.35) 62%, transparent 100%)";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' result='noise'/>" +
  "<feColorMatrix in='noise' type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";

const GRAIN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

// Static CSS only, no canvas, no JS, no listeners. Costs nothing at
// runtime beyond the two composited layers the browser already paints once.
// Positioned absolute (not fixed) so it scopes to whatever container renders
// it (currently just the hero) rather than covering the whole viewport.
export function BackgroundTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(58% 42% at 12% -4%, rgba(255, 255, 255, 0.15), transparent 70%), radial-gradient(52% 38% at 88% 0%, rgba(255,255,255,0.055), transparent 72%)",
      }}
    >
      <div
        className="absolute inset-0 text-foreground"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent ${GRID_CELL}), repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent ${GRID_CELL})`,
          opacity: 0.07,
          maskImage: GRID_FADE,
          WebkitMaskImage: GRID_FADE,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${GRAIN_DATA_URL}")`,
          backgroundSize: "128px 128px",
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
