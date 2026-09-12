const GRID_CELL = "48px";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' result='noise'/>" +
  "<feColorMatrix in='noise' type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";

const GRAIN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

// Static CSS only — no canvas, no JS, no listeners. Costs nothing at
// runtime beyond the two composited layers the browser already paints once.
export function BackgroundTexture() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 text-foreground"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent ${GRID_CELL}), repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent ${GRID_CELL})`,
          opacity: 0.05,
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
