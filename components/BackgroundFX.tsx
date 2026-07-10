/**
 * BackgroundFX
 * ------------
 * Layered decorative background: three softly drifting color blobs
 * (accent / violet / green — matches your existing palette) plus a
 * faint animated grid that fades toward the edges.
 *
 * Pure CSS animation (see .bg-fx* classes in globals.css) — no JS,
 * no client component needed, safe to use in a server component.
 *
 * Usage — parent MUST be `position: relative` and `overflow: hidden`:
 *
 *   <section className="relative overflow-hidden section-hero-background">
 *     <BackgroundFX />
 *     <div className="relative z-10">
 *       ...your actual hero content, unaffected, sits above it...
 *     </div>
 *   </section>
 *
 * Toggle `grid` off for sections where the grid texture would clash
 * with content underneath (e.g. a section that already has a photo).
 */
export default function BackgroundFX({ grid = true }: { grid?: boolean }) {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx__blob bg-fx__blob--a" />
      <div className="bg-fx__blob bg-fx__blob--b" />
      <div className="bg-fx__blob bg-fx__blob--c" />
      {grid && <div className="bg-fx__grid" />}
    </div>
  );
}