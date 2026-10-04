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
 * The stack, set into the hero's empty right-hand field on wide screens.
 *
 * Each tool takes one cell of the hero's own 40px grid, so the marks read as
 * measurements on the ground rather than stickers on top of it: square tile,
 * 1px rule, achromatic mark, no shadow. They burst out from the field's centre
 * on load, nearest first, and drift up and out at slightly different rates as
 * the hero scrolls away. No cadmium: the $25M+ figure is this frame's accent.
 *
 * Laid out in JS because the field is whatever is left of the viewport after
 * the copy, and the cells have to land on the grid, whose origin is the
 * section's top-left corner. Below six free columns (roughly a 1440px
 * viewport, where the copy already fills most of the width) it renders nothing.
 */

const CELL = 40;
/* Clear of the copy block, the fixed header, and the section's bottom rule. */
const GAP_LEFT = 80;
const TOP = 120;
const BOTTOM = 80;
const MIN_COLS = 6;
const DELAY = 0.4;

/* Most-used first: these land nearest the centre. Anything not listed (a tool
   added to data/companies.ts later) still shows, after these. */
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

type Placed = { id: PlatformId; name: string; col: number; row: number; order: number };
type Field = { cells: Placed[]; center: { col: number; row: number }; caption: { col: number; row: number } };

function layout(startCol: number, endCol: number, startRow: number, endRow: number): Field {
  const center = { col: (startCol + endCol) / 2, row: (startRow + endRow) / 2 };

  const candidates: { col: number; row: number; score: number }[] = [];
  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
      const dist = Math.hypot(col - center.col, row - center.row);
      candidates.push({ col, row, score: dist + hash(col, row) * 2.2 });
    }
  }
  candidates.sort((a, b) => a.score - b.score);

  /* Greedy fill outward from the centre, one empty cell between neighbours. */
  const cells: Placed[] = [];
  for (const c of candidates) {
    if (cells.length === tools.length) break;
    const crowded = cells.some(
      (p) => Math.abs(p.col - c.col) < 2 && Math.abs(p.row - c.row) < 2
    );
    if (crowded) continue;
    const tool = tools[cells.length];
    cells.push({ id: tool.id, name: tool.name, col: c.col, row: c.row, order: cells.length });
  }

  /* The caption sits under the cluster it labels, flush with its left edge. */
  const caption = {
    col: Math.min(...cells.map((c) => c.col)),
    row: Math.max(...cells.map((c) => c.row)) + 2,
  };
  return { cells, center, caption };
}

export function HeroStack({
  sectionRef,
  anchorRefs,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  /* Everything the field must stay clear of: its left edge starts past the
     rightmost of these. */
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
      const right = Math.max(
        ...anchorRefs.map((r) => r.current?.getBoundingClientRect().right ?? 0)
      );
      const startCol = Math.ceil((right - s.left + GAP_LEFT) / CELL);
      const endCol = Math.floor(s.width / CELL) - 2;
      const startRow = Math.ceil(TOP / CELL);
      /* Two rows held back for the caption under the cluster. */
      const endRow = Math.floor((s.height - BOTTOM) / CELL) - 3;

      if (endCol - startCol + 1 < MIN_COLS || endRow - startRow + 1 < 6) {
        setField(null);
        return;
      }
      setField(layout(startCol, endCol, startRow, endRow));
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
        <Tile
          key={cell.id}
          cell={cell}
          center={field.center}
          progress={scrollYProgress}
          reduce={!!reduce}
        />
      ))}

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + field.cells.length * 0.035, duration: 0.6, ease: EASE }}
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
  center,
  progress,
  reduce,
}: {
  cell: Placed;
  center: { col: number; row: number };
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  /* Each tile drifts at its own rate, so the field loosens as it leaves. */
  const depth = 40 + hash(cell.row, cell.col) * 120;
  const drift = useTransform(progress, [0, 1], [0, -depth]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: cell.col * CELL,
        top: cell.row * CELL,
        y: reduce ? 0 : drift,
      }}
    >
      <motion.div
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0.3,
                x: (center.col - cell.col) * CELL,
                y: (center.row - cell.row) * CELL,
              }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: DELAY + cell.order * 0.035, duration: 0.8, ease: EASE }}
        title={cell.name}
        /* 41px so the tile's rule sits on the grid lines either side of its cell. */
        className="pointer-events-auto flex size-[41px] items-center justify-center border border-rule bg-background text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
      >
        <PlatformLogo id={cell.id} className="size-[18px]" />
      </motion.div>
    </motion.div>
  );
}
