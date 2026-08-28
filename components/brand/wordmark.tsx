import { cn } from "@/lib/utils";

/*
 * 01 / WORDMARK. Instrument Sans 700, tracking −0.025em, all caps, no space
 * between the name and the period.
 *
 * The period is the only place the accent appears in a mark, and it is dropped
 * entirely when the frame already carries an accent number — hence `accent`.
 * Full mark goes on the footer and case study headers; short on the site header.
 */
export function Wordmark({
  variant = "short",
  accent = true,
  className,
}: {
  variant?: "short" | "full";
  accent?: boolean;
  className?: string;
}) {
  const base = cn(
    "inline-block font-semibold uppercase tracking-[-0.025em] leading-none",
    className
  );

  if (variant === "full") {
    // The full mark has no period, so there is nothing for the accent to sit on.
    return <span className={base}>Syed Muneeb Rehaman</span>;
  }

  return (
    <span className={base}>
      Muneeb
      {/* The mark sets at 17px in the header, so the period takes the ink
          variant of cadmium — on a chalk ground the full-strength accent only
          clears contrast at 24px and above. */}
      <span className={accent ? "text-cadmium-ink" : undefined}>.</span>
    </span>
  );
}
