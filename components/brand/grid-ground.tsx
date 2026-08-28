/*
 * The illustration kit's ground: "a 1px #2A2A28 grid at 40px". This replaces the
 * radial glow the hero used to carry — 03 / STRUCTURE forbids gradients outright,
 * and the grid is the system's own way of saying "measurement happens here".
 *
 * Not masked or faded: a fade is a gradient wearing a different hat.
 */
export function GridGround() {
  return (
    <div
      aria-hidden
      className="brand-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
    />
  );
}
