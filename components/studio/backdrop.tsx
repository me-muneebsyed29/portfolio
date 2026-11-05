/*
 * The room the site sits in: a charcoal-black ground, two slow pools of light
 * (taupe and dim gray) drifting across it, a film of grain, and four faint
 * column rules that echo the 12-column grid the content is set on.
 *
 * Fixed and behind everything; `isolate` on the layout keeps the negative
 * z-index inside the studio tree. Purely decorative.
 */
export function StudioBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="ambient-pool ambient-pool-a top-[-20vh] right-[-10vw] h-[70vh] w-[70vw] bg-[#bea98e] opacity-[0.07]" />
      <div className="ambient-pool ambient-pool-b bottom-[-25vh] left-[-15vw] h-[65vh] w-[60vw] bg-[#4a4a4a] opacity-[0.22]" />

      {/* Column rules, aligned to the content container. */}
      <div className="absolute inset-0 mx-auto hidden w-full max-w-[1280px] grid-cols-4 px-6 md:grid md:px-10">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="border-l border-white/[0.025] last:border-r" />
        ))}
      </div>

      <div className="noise-overlay absolute inset-0 opacity-[0.045] mix-blend-overlay" />
    </div>
  );
}
