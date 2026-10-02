/**
 * AnimatedBackground — site-wide blueprint backdrop.
 *
 * Pure CSS (no canvas, no JS loop): a fine minor grid, a heavier major
 * grid every 5 cells, faded toward the edges, plus drawing-sheet
 * registration marks in the corners. The animated energy lines live
 * only in the Hero, where they are visible and cheap.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--line-faint) 1px, transparent 1px),
          linear-gradient(90deg, var(--line-faint) 1px, transparent 1px),
          linear-gradient(rgba(30, 150, 104, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30, 150, 104, 0.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px, 32px 32px, 160px 160px, 160px 160px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 100%)',
      }}
    />
  );
}
