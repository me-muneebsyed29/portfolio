import { cn } from "@/lib/utils";

/*
 * 02 / MONOGRAM. Primary is the ruled box — "reads as a cell in a table, which
 * is the point." Stroke scales with the box: 5px at 400, 3px at 80, 2px at 32,
 * which is a shade under 1.25% of the box, so it is derived rather than stepped.
 *
 * The solid slab alternate is higher contrast in a feed and is what the favicon
 * uses; an outline box turns to mush at 16px. The two never appear together.
 */
export function Monogram({
  size = 32,
  variant = "ruled",
  className,
}: {
  size?: number;
  variant?: "ruled" | "solid";
  className?: string;
}) {
  const stroke = Math.max(2, Math.round(size * 0.0125 * 100) / 100);
  // Below 20px the rule is dropped and the letters carry the mark alone.
  const ruleless = size < 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="SM monogram"
    >
      {variant === "solid" ? (
        <rect width="100" height="100" fill="currentColor" />
      ) : (
        !ruleless && (
          <rect
            x={(stroke / size) * 50}
            y={(stroke / size) * 50}
            width={100 - (stroke / size) * 100}
            height={100 - (stroke / size) * 100}
            fill="none"
            stroke="currentColor"
            strokeWidth={(stroke / size) * 100}
          />
        )
      )}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-instrument-sans), sans-serif"
        fontSize="42"
        fontWeight="700"
        letterSpacing={size < 32 ? "0" : "-1"}
        fill={variant === "solid" ? "var(--background)" : "currentColor"}
      >
        SM
      </text>
    </svg>
  );
}
