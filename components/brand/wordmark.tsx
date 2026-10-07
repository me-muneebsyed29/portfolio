import { cn } from "@/lib/utils";

/*
 * 01 / WORDMARK. Plus Jakarta Sans 700, tracking −0.025em, all caps, no space
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
    "inline-block font-bold uppercase tracking-[-0.025em] leading-none",
    className
  );

  if (variant === "full") {
    // The full mark has no period, so there is nothing for the accent to sit on.
    return <span className={base}>Syed Muneeb Rehaman</span>;
  }

  return (
    <span className={base}>
      Muneeb
      {/* The mark sets at 17px, so the period takes the under-24px accent
          value, which rev 02 splits by ground: cadmium light (#E4704F) on
          dark, the ink value (#9E2F16) on chalk. Full cadmium here would sit
          at 3.6:1 on graphite. */}
      <span className={accent ? "text-cadmium-sm" : undefined}>.</span>
    </span>
  );
}
