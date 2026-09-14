const NAME = "PRATHAM";

// Lives in the root layout, so it mounts once per document load: a reload or a
// fresh visit plays it, client-side navigation between sections does not.
// Deliberately CSS-only (no state, no effect) so there is no hydration gap
// where the page shows through, and no way for a JS failure to leave the
// overlay stuck over the content.
export function IntroScreen() {
  return (
    <div aria-hidden="true" className="intro-screen">
      <p className="intro-word">
        {NAME.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="intro-letter"
            style={{
              // Letters start stacked toward the middle and slide out to
              // their real positions; the offset is relative to centre.
              "--intro-shift": `${(index - (NAME.length - 1) / 2) * -1.1}em`,
              "--intro-delay": `${index * 55}ms`,
            } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
