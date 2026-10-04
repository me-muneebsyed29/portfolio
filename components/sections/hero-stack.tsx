"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PlatformLogo, type PlatformId } from "@/components/brand/platform-logos";
import { toolGroups } from "@/data/companies";
import { EASE } from "@/lib/motion";

/*
 * The stack, orbiting the hero copy on wide screens.
 *
 * Each tool takes one cell of the hero's own 40px grid, so the marks read as
 * measurements on the ground rather than stickers on top of it: square tile,
 * 1px rule, achromatic mark, no shadow. The cells sit on an elliptical ring
 * centred on the copy, kept only where the ring crosses the empty margins, so
 * it reads as one orbit broken by the text: an arc in the left margin, an arc
 * in the right field.
 *
 * On load every tile spirals out from behind the headline to its cell, so the
 * ring forms around the copy instead of arriving from one side. As the hero
 * scrolls away the tiles drift up at slightly different rates and fade. No
 * cadmium: the $25M+ figure is this frame's accent.
 *
 * Laid out in JS because both margins are whatever the viewport leaves after
 * the copy, and the cells have to land on the grid, whose origin is the
 * section's top-left corner. Either margin under three free columns (roughly a
 * 1440px viewport) and it renders nothing.
 */

const CELL = 40;
/* Clear of the copy block, the fixed header, and the section's bottom rule. */
const GAP = 80;
const TOP = 120;
const BOTTOM = 80;
const MIN_SIDE_COLS = 3;
const DELAY = 0.35;
/* Each tile sweeps this far round the ring on its way out. */
const SWEEP = Math.PI * 0.6;
const STEPS = 12;
const DURATION = 1.4;

/* Most-used first: these take the cells that sit closest on the ring. Anything
   not listed (a tool added to data/companies.ts later) still shows, after
   these. */
const PRIORITY: PlatformId[] = [
  "google-ads",
  "meta",
  "linkedin",
  "claude",
  "hubspot",
  "ga4",
  "salesforce",
  "clay",
  "n8n",
  "gtm",
  "chatgpt",
  "apollo",
  "sixsense",
  "segment",
  "zapier",
  "amplitude",
];

const tools = toolGroups
  .flatMap((group) => group.tools)
  .sort((a, b) => rank(a.id) - rank(b.id));

function rank(id: PlatformId) {
  const i = PRIORITY.indexOf(id);
  return i === -1 ? PRIORITY.length : i;
}

/* Stable per-cell noise, so the layout is the same on every visit. */
function hash(col: number, row: number) {
  const h = (Math.imul(col, 73856093) ^ Math.imul(row, 19349663)) >>> 0;
  return (h % 1000) / 1000;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Point = { x: number; y: number };
type Ring = { center: Point; rxLeft: number; rxRight: number; ry: number };
type Placed = {
  id: PlatformId;
  name: string;
  col: number;
  row: number;
  order: number;
  /* Offsets from the tile's own cell, one per keyframe, ending at 0,0. */
  path: { x: number[]; y: number[] };
};
type Field = { cells: Placed[]; caption: { col: number; row: number } };

type Zones = {
  left: [number, number];
  right: [number, number];
  rows: [number, number];
};

function layout(zones: Zones, center: Point): Field {
  const [l0, l1] = zones.left;
  const [r0, r1] = zones.right;
  const [row0, row1] = zones.rows;

  /* The ring runs through the middle of each margin, so it is wider on
     whichever side has more room, and as tall as the field allows. */
  const ring: Ring = {
    center,
    rxLeft: center.x - ((l0 + l1 + 1) / 2) * CELL,
    rxRight: ((r0 + r1 + 1) / 2) * CELL - center.x,
    ry: ((row1 - row0 + 1) / 2) * CELL * 0.92,
  };

  const candidates: { col: number; row: number; score: number }[] = [];
  const consider = (from: number, to: number) => {
    for (let col = from; col <= to; col++) {
      for (let row = row0; row <= row1; row++) {
        const { rho } = polar(cellCenter(col, row), ring);
        candidates.push({ col, row, score: Math.abs(rho - 1) + hash(col, row) * 0.18 });
      }
    }
  };
  consider(l0, l1);
  consider(r0, r1);
  candidates.sort((a, b) => a.score - b.score);

  /* Greedy fill along the ring, one empty cell between neighbours. */
  const cells: Placed[] = [];
  for (const c of candidates) {
    if (cells.length === tools.length) break;
    const crowded = cells.some(
      (p) => Math.abs(p.col - c.col) < 2 && Math.abs(p.row - c.row) < 2
    );
    if (crowded) continue;
    const tool = tools[cells.length];
    cells.push({
      id: tool.id,
      name: tool.name,
      col: c.col,
      row: c.row,
      order: cells.length,
      path: spiral(c.col, c.row, ring),
    });
  }

  /* The caption sits under the right-hand arc, flush with its left edge. */
  const right = cells.filter((c) => c.col >= r0);
  const anchor = right.length ? right : cells;
  const caption = {
    col: Math.min(...anchor.map((c) => c.col)),
    row: Math.max(...anchor.map((c) => c.row)) + 2,
  };
  return { cells, caption };
}

function cellCenter(col: number, row: number): Point {
  return { x: (col + 0.5) * CELL, y: (row + 0.5) * CELL };
}

/* Position on the ring in normalised polar terms: rho 1 is on the ring. */
function polar(p: Point, ring: Ring) {
  const dx = p.x - ring.center.x;
  const rx = dx < 0 ? ring.rxLeft : ring.rxRight;
  const u = dx / rx;
  const v = (p.y - ring.center.y) / ring.ry;
  return { rho: Math.hypot(u, v), theta: Math.atan2(v, u) };
}

function fromPolar(rho: number, theta: number, ring: Ring): Point {
  const u = rho * Math.cos(theta);
  const rx = u < 0 ? ring.rxLeft : ring.rxRight;
  return { x: ring.center.x + u * rx, y: ring.center.y + rho * Math.sin(theta) * ring.ry };
}

/* The tile's way out: from the ring's centre, sweeping round as it widens to
   its cell. Sampled into keyframes with the easing baked in, so the radius and
   the angle settle together. */
function spiral(col: number, row: number, ring: Ring) {
  const end = cellCenter(col, row);
  const { rho, theta } = polar(end, ring);
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = easeOutCubic(i / STEPS);
    const p = fromPolar(rho * t, theta - SWEEP * (1 - t), ring);
    x.push(p.x - end.x);
    y.push(p.y - end.y);
  }
  return { x, y };
}

export function HeroStack({
  sectionRef,
  anchorRefs,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  /* The copy the ring wraps around and must stay clear of. */
  anchorRefs: RefObject<HTMLElement | null>[];
}) {
  const reduce = useReducedMotion();
  const [field, setField] = useState<Field | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const s = section.getBoundingClientRect();
      const boxes = anchorRefs
        .map((r) => r.current?.getBoundingClientRect())
        .filter((b): b is DOMRect => !!b);
      if (!boxes.length) return;

      const copy = {
        left: Math.min(...boxes.map((b) => b.left)) - s.left,
        right: Math.max(...boxes.map((b) => b.right)) - s.left,
        top: Math.min(...boxes.map((b) => b.top)) - s.top,
        bottom: Math.max(...boxes.map((b) => b.bottom)) - s.top,
      };

      const zones: Zones = {
        left: [1, Math.floor((copy.left - GAP) / CELL) - 1],
        right: [Math.ceil((copy.right + GAP) / CELL), Math.floor(s.width / CELL) - 2],
        /* Two rows held back for the caption under the right arc. */
        rows: [Math.ceil(TOP / CELL), Math.floor((s.height - BOTTOM) / CELL) - 3],
      };

      const leftCols = zones.left[1] - zones.left[0] + 1;
      const rightCols = zones.right[1] - zones.right[0] + 1;
      if (leftCols < MIN_SIDE_COLS || rightCols < MIN_SIDE_COLS || zones.rows[1] - zones.rows[0] < 6) {
        setField(null);
        return;
      }

      const center = { x: (copy.left + copy.right) / 2, y: (copy.top + copy.bottom) / 2 };
      setField(layout(zones, center));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef, anchorRefs]);

  if (!field) return null;

  return (
    <motion.div
      aria-hidden
      style={reduce ? undefined : { opacity: fade }}
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {field.cells.map((cell) => (
        <Tile key={cell.id} cell={cell} progress={scrollYProgress} reduce={!!reduce} />
      ))}

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + DURATION + field.cells.length * 0.03, duration: 0.6, ease: EASE }}
        className="mono-label absolute whitespace-nowrap text-faint"
        style={{ left: field.caption.col * CELL, top: field.caption.row * CELL - 16 }}
      >
        Fig. 00 · The stack · {field.cells.length} tools
      </motion.p>
    </motion.div>
  );
}

function Tile({
  cell,
  progress,
  reduce,
}: {
  cell: Placed;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  /* Each tile drifts at its own rate, so the ring loosens as it leaves. */
  const depth = 40 + hash(cell.row, cell.col) * 120;
  const drift = useTransform(progress, [0, 1], [0, -depth]);
  const delay = DELAY + cell.order * 0.03;

  return (
    <motion.div
      className="absolute"
      style={{ left: cell.col * CELL, top: cell.row * CELL, y: reduce ? 0 : drift }}
    >
      <motion.div
        initial={
          reduce ? false : { opacity: 0, scale: 0.3, x: cell.path.x[0], y: cell.path.y[0] }
        }
        animate={{ opacity: 1, scale: 1, x: cell.path.x, y: cell.path.y }}
        transition={{
          x: { delay, duration: DURATION, ease: "linear" },
          y: { delay, duration: DURATION, ease: "linear" },
          scale: { delay, duration: DURATION * 0.6, ease: EASE },
          opacity: { delay, duration: 0.3 },
        }}
        title={cell.name}
        /* 41px so the tile's rule sits on the grid lines either side of its cell. */
        className="pointer-events-auto flex size-[41px] items-center justify-center border border-rule bg-background text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
      >
        <PlatformLogo id={cell.id} className="size-[18px]" />
      </motion.div>
    </motion.div>
  );
}
