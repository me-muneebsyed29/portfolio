import { cn } from "@/lib/utils";

/*
 * The illustration system: six marks, four primitives, no metaphors. Geometry is
 * transcribed from the sheet rather than redrawn, so these are the same figures
 * that appear in the decks and carousels.
 *
 * Kit: 1.5px chalk lines, a 1px panel grid on a 40px module, 4px dots, filled
 * cells. The only curve allowed is a circle.
 *
 * Colours resolve through tokens so a figure inverts correctly in light mode.
 * `achromatic` exists because the sheet is explicit: if the frame already has an
 * accent number, the figure runs with no cadmium at all.
 */
export type FigureId =
  | "narrowing"
  | "outlier"
  | "one-cell"
  | "gap"
  | "delta"
  | "flagged-row";

export const figureNames: Record<FigureId, string> = {
  narrowing: "The narrowing",
  outlier: "The outlier",
  "one-cell": "The one cell",
  gap: "The gap",
  delta: "The delta",
  "flagged-row": "The flagged row",
};

const figureIndex: Record<FigureId, string> = {
  narrowing: "01",
  outlier: "02",
  "one-cell": "03",
  gap: "04",
  delta: "05",
  "flagged-row": "06",
};

/* The 40px module the figures are drawn over. Omitted by "the one cell", which
   builds its own table instead. */
function Grid() {
  return (
    <g stroke="var(--panel)" strokeWidth="1" fill="none">
      <path d="M0 40h320M0 80h320M0 120h320M0 160h320M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M240 0v200M280 0v200" />
    </g>
  );
}

function Drawing({ id, accent }: { id: FigureId; accent: string }) {
  switch (id) {
    case "narrowing":
      return (
        <>
          <Grid />
          <g stroke="var(--foreground)" strokeWidth="1.5" fill="none">
            <path d="M20 56h130M20 144h130M214 84h86M214 116h86" />
            <path d="M150 56 L214 84M150 144 L214 116" />
          </g>
          <path
            d="M182 34v132"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="4 5"
            fill="none"
          />
          <circle cx="182" cy="100" r="5" fill={accent} />
        </>
      );

    case "outlier":
      return (
        <>
          <Grid />
          <g fill="var(--faint)">
            {[
              [48, 150], [76, 132], [104, 142], [132, 120], [160, 128],
              [188, 108], [216, 116], [244, 100], [62, 114], [118, 98],
              [202, 142], [90, 160], [230, 134], [146, 154],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
            ))}
          </g>
          <circle cx="272" cy="46" r="5" fill={accent} />
          <circle cx="272" cy="46" r="17" fill="none" stroke={accent} strokeWidth="1.5" />
          <path d="M22 176h286M22 176V22" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
        </>
      );

    case "one-cell":
      return (
        <>
          <g stroke="var(--rule)" strokeWidth="1" fill="none">
            <rect x="20" y="30" width="280" height="140" />
            <path d="M90 30v140M160 30v140M230 30v140M20 65h280M20 100h280M20 135h280" />
          </g>
          <g fill="var(--panel)">
            <rect x="21" y="31" width="68" height="33" />
            <rect x="161" y="66" width="68" height="33" />
            <rect x="91" y="101" width="68" height="33" />
            <rect x="231" y="136" width="68" height="33" />
            <rect x="21" y="136" width="68" height="33" />
          </g>
          <rect x="161" y="31" width="68" height="33" fill={accent} />
        </>
      );

    case "gap":
      return (
        <>
          <Grid />
          <g stroke="var(--foreground)" strokeWidth="1.5" fill="none">
            <path d="M20 50h100v100H20" />
            <path d="M300 50h-100v100h100" />
          </g>
          <path d="M132 100h56" stroke={accent} strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          <g stroke={accent} strokeWidth="1.5" fill="none">
            <path d="M132 84v32M188 84v32" />
          </g>
        </>
      );

    case "delta":
      return (
        <>
          <Grid />
          <path d="M20 130h280" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
          <g stroke="var(--faint)" strokeWidth="1.5" fill="none">
            <path d="M20 130v-10M60 130v-10M100 130v-10M140 130v-10M180 130v-10M220 130v-10M260 130v-10M300 130v-10" />
          </g>
          <g stroke="var(--foreground)" strokeWidth="1.5" fill="none">
            <path d="M100 130V70M240 130V70" />
          </g>
          <path d="M100 70h140" stroke={accent} strokeWidth="1.5" fill="none" />
          <g stroke={accent} strokeWidth="1.5" fill="none">
            <path d="M100 62v16M240 62v16" />
          </g>
        </>
      );

    case "flagged-row":
      return (
        <>
          <Grid />
          <g fill="var(--panel)">
            <rect x="60" y="36" width="200" height="14" />
            <rect x="60" y="66" width="240" height="14" />
            <rect x="60" y="96" width="170" height="14" />
            <rect x="60" y="126" width="220" height="14" />
            <rect x="60" y="156" width="190" height="14" />
          </g>
          <g stroke="var(--faint)" strokeWidth="1.5" fill="none">
            <path d="M60 43h200M60 73h240M60 133h220M60 163h190" />
          </g>
          <path d="M60 103h170" stroke={accent} strokeWidth="1.5" fill="none" />
          <rect x="26" y="97" width="16" height="12" fill={accent} />
          <path d="M50 26v154" stroke="var(--rule)" strokeWidth="1" fill="none" />
        </>
      );
  }
}

/*
 * "An unlabelled diagram is decoration, which is the thing you're avoiding." —
 * every figure carries a mono caps caption, so the caption is part of the
 * component rather than something a caller can forget.
 *
 * Sizes are deliberately restricted to the two the sheet allows: `hero` at
 * 620px wide, `marginal` at 200px. Nothing in between.
 */
export function Figure({
  id,
  caption,
  size = "marginal",
  achromatic = false,
  className,
}: {
  id: FigureId;
  caption?: string;
  size?: "hero" | "marginal";
  achromatic?: boolean;
  className?: string;
}) {
  const accent = achromatic ? "var(--foreground)" : "var(--cadmium)";

  return (
    <figure className={cn(size === "hero" ? "max-w-[620px]" : "max-w-[200px]", className)}>
      <svg
        viewBox="0 0 320 200"
        className="block w-full"
        role="img"
        aria-label={`Figure ${figureIndex[id]}: ${figureNames[id]}`}
      >
        <Drawing id={id} accent={accent} />
      </svg>
      <figcaption className="mono-label mt-4 text-faint">
        Fig. {figureIndex[id]} · {figureNames[id]}
        {caption ? <span className="text-muted-foreground"> — {caption}</span> : null}
      </figcaption>
    </figure>
  );
}
