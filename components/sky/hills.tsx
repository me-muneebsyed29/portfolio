import { mulberry32, ridgePath, ridgeY, ridges, SCENE_H, SCENE_W, type Ridge } from "./landscape";

/*
 * The painted layers of the nature finale, back to front. Each is its own SVG
 * so the finale can move them at different depths. Colour does the depth work:
 * far layers are bluer and paler (air between you and them), near layers are
 * saturated and dark at the base, lit yellow-green along the ridge where the
 * sun from the top right catches them.
 *
 * Every gradient stop reads a --h-* variable from globals.css, so the same
 * hills turn grey-green in the rain and white under snow, fading between them.
 */

type TreeKind = "round" | "cypress";
type Tree = { x: number; y: number; size: number; kind: TreeKind; sway: number };

function plantTrees(ridge: Ridge, seed: number, count: number, size: number, zones: [number, number][]) {
  const rand = mulberry32(seed);
  const trees: Tree[] = [];
  let guard = 0;
  while (trees.length < count && guard++ < count * 20) {
    const zone = zones[Math.floor(rand() * zones.length)];
    const x = zone[0] + rand() * (zone[1] - zone[0]);
    trees.push({
      x,
      /* Sunk a little into the slope so the trunk never floats on the ridge. */
      y: ridgeY(ridge, x) + 4 + rand() * 10 * size,
      size: size * (0.7 + rand() * 0.6),
      kind: rand() > 0.72 ? "cypress" : "round",
      sway: 4 + rand() * 4,
    });
  }
  /* Higher on the slope is further away: draw those first. */
  return trees.sort((a, b) => a.y - b.y);
}

const midTrees = plantTrees(ridges.midHills, 7, 26, 0.75, [
  [40, 520],
  [980, 1560],
  [600, 900],
]);
const nearTrees = plantTrees(ridges.nearHill, 19, 11, 1.5, [
  [-10, 360],
  [1220, 1620],
]);

function TreeShape({ tree }: { tree: Tree }) {
  const s = tree.size;
  return (
    <g
      className="tree-sway"
      style={{ "--sway-duration": `${tree.sway}s` } as React.CSSProperties}
    >
      <ellipse cx={tree.x + 6 * s} cy={tree.y + 1} rx={16 * s} ry={3.5 * s} style={{ fill: "var(--h-canopy-2)" }} opacity={0.25} />
      <rect x={tree.x - 2.2 * s} y={tree.y - 16 * s} width={4.4 * s} height={17 * s} rx={1.5 * s} fill="#6b4a2e" />
      {tree.kind === "round" ? (
        <>
          <circle cx={tree.x - 8 * s} cy={tree.y - 24 * s} r={11 * s} fill="url(#canopy)" />
          <circle cx={tree.x + 8 * s} cy={tree.y - 26 * s} r={12 * s} fill="url(#canopy)" />
          <circle cx={tree.x} cy={tree.y - 36 * s} r={14 * s} fill="url(#canopy)" />
        </>
      ) : (
        <ellipse cx={tree.x} cy={tree.y - 34 * s} rx={8.5 * s} ry={28 * s} fill="url(#canopy-dark)" />
      )}
    </g>
  );
}

function Layer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className ?? "absolute inset-0 h-full w-full"}
    >
      {children}
    </svg>
  );
}

/* Gradient defs live in one zero-size SVG so every layer can reference them. */
export function HillDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="g-horizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-horizon)" }} stopOpacity="0" />
          <stop offset="1" style={{ stopColor: "var(--h-horizon)" }} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="g-mountains" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-mtn-0)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--h-mtn-1)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--h-mtn-2)" }} />
        </linearGradient>
        <linearGradient id="g-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-far-0)" }} />
          <stop offset="0.4" style={{ stopColor: "var(--h-far-1)" }} />
        </linearGradient>
        <linearGradient id="g-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-mid-0)" }} />
          <stop offset="0.12" style={{ stopColor: "var(--h-mid-1)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--h-mid-2)" }} />
        </linearGradient>
        <linearGradient id="g-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-near-0)" }} />
          <stop offset="0.1" style={{ stopColor: "var(--h-near-1)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--h-near-2)" }} />
        </linearGradient>
        <linearGradient id="g-meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--h-meadow-0)" }} />
          <stop offset="0.4" style={{ stopColor: "var(--h-meadow-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--h-meadow-2)" }} />
        </linearGradient>
        <linearGradient id="g-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="canopy" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" style={{ stopColor: "var(--h-canopy-0)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--h-canopy-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--h-canopy-2)" }} />
        </radialGradient>
        <radialGradient id="canopy-dark" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" style={{ stopColor: "var(--h-canopy-dark-0)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--h-canopy-dark-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--h-canopy-dark-2)" }} />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MountainsLayer() {
  return (
    <Layer>
      {/* The sky pales toward the horizon, the way real air does. */}
      <rect x="-40" y="120" width={SCENE_W + 80} height="360" fill="url(#g-horizon)" />
      <path d={ridgePath(ridges.mountains, 16)} fill="url(#g-mountains)" />
      <rect x="-40" y="330" width={SCENE_W + 80} height="260" fill="url(#g-haze)" />
      <path d={ridgePath(ridges.farHills)} fill="url(#g-far)" />
    </Layer>
  );
}

export function MidHillsLayer() {
  return (
    <Layer>
      <path d={ridgePath(ridges.midHills)} fill="url(#g-mid)" />
      {midTrees.map((tree, i) => (
        <TreeShape key={i} tree={tree} />
      ))}
    </Layer>
  );
}

export function NearHillLayer() {
  return (
    <Layer>
      <path d={ridgePath(ridges.nearHill)} fill="url(#g-near)" />
      {nearTrees.map((tree, i) => (
        <TreeShape key={i} tree={tree} />
      ))}
    </Layer>
  );
}

export function MeadowLayer() {
  return (
    <Layer>
      <path d={ridgePath(ridges.meadow)} fill="url(#g-meadow)" />
    </Layer>
  );
}
