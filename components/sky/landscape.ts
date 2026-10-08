/*
 * Shared geometry for the nature finale. The SVG hills and the canvas that
 * grows grass on them both read the same ridge functions, so a blade's root
 * lands exactly on the meadow line at every viewport size.
 *
 * Everything is authored in a 1600 x 900 scene, drawn with
 * preserveAspectRatio="xMidYMax slice": scaled to cover, pinned to the bottom.
 * `sceneToPx` is that same mapping, for the canvas.
 */
export const SCENE_W = 1600;
export const SCENE_H = 900;

export type Wave = { amp: number; freq: number; phase: number };

export type Ridge = { base: number; waves: Wave[] };

export function ridgeY(ridge: Ridge, x: number) {
  let y = ridge.base;
  for (const w of ridge.waves) y -= w.amp * Math.sin(x * w.freq + w.phase);
  return y;
}

/* Closed area under a ridge, as a smooth path. Coordinates are rounded so the
   server and the browser always serialise the same `d` string. */
export function ridgePath(ridge: Ridge, step = 20) {
  const pts: [number, number][] = [];
  for (let x = -40; x <= SCENE_W + 40; x += step) pts.push([x, ridgeY(ridge, x)]);
  const r = (n: number) => Math.round(n * 10) / 10;
  let d = `M${r(pts[0][0])} ${SCENE_H + 10}L${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += `Q${r(x)} ${r(y)} ${r((x + nx) / 2)} ${r((y + ny) / 2)}`;
  }
  const last = pts[pts.length - 1];
  d += `L${r(last[0])} ${r(last[1])}L${r(last[0])} ${SCENE_H + 10}Z`;
  return d;
}

export const ridges = {
  mountains: {
    base: 405,
    waves: [
      { amp: 82, freq: 0.0042, phase: 0.6 },
      { amp: 38, freq: 0.011, phase: 2.1 },
      { amp: 12, freq: 0.031, phase: 0.4 },
    ],
  },
  farHills: {
    base: 515,
    waves: [
      { amp: 34, freq: 0.0036, phase: 2.4 },
      { amp: 16, freq: 0.0095, phase: 0.2 },
    ],
  },
  midHills: {
    base: 585,
    waves: [
      { amp: 42, freq: 0.0031, phase: 4.2 },
      { amp: 14, freq: 0.0082, phase: 1.3 },
    ],
  },
  nearHill: {
    base: 665,
    waves: [
      { amp: 46, freq: 0.0026, phase: 0.9 },
      { amp: 12, freq: 0.0072, phase: 3.3 },
    ],
  },
  meadow: {
    base: 755,
    waves: [
      { amp: 18, freq: 0.0021, phase: 2.6 },
      { amp: 6, freq: 0.0064, phase: 0.8 },
    ],
  },
} satisfies Record<string, Ridge>;

/* Small seeded PRNG, so tree and blade placement is identical on every render
   and on the server. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Scene units to CSS pixels for a box of the given size, matching
   xMidYMax slice. */
export function sceneScale(w: number, h: number) {
  return Math.max(w / SCENE_W, h / SCENE_H);
}

export function sceneToPx(w: number, h: number, x: number, y: number) {
  const s = sceneScale(w, h);
  return [w / 2 + (x - SCENE_W / 2) * s, h - (SCENE_H - y) * s] as const;
}

export function pxToSceneX(w: number, h: number, px: number) {
  const s = sceneScale(w, h);
  return (px - w / 2) / s + SCENE_W / 2;
}
