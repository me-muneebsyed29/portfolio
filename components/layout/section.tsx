import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/*
 * 03 / STRUCTURE. Spacing steps are 8 / 16 / 24 / 40 / 56 / 88; sections run at
 * the 56 step on mobile and 88 on desktop. Sections are separated by a 2px rule
 * rather than whitespace alone, which is what makes the page read as a spec
 * sheet instead of a landing page.
 */
export function Section({
  id,
  className,
  containerClassName,
  ruled = true,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  ruled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-14 md:py-22", ruled && "border-t-2 border-rule", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/*
 * Section kicker in the spec-sheet idiom: a zero-padded index, a slash, then the
 * label — "01 / SELECTED WORK". Mono caps at 11px, per 02 / TYPE.
 */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mono-label text-muted-foreground", className)}>
      {index ? (
        <>
          <span className="text-faint">{index}</span>
          <span className="text-faint px-2" aria-hidden>
            /
          </span>
        </>
      ) : null}
      {children}
    </p>
  );
}

/* Section H2 — 28px, tracking −0.025em. The system deliberately keeps section
   headings small; rules and mono labels carry the hierarchy, not type size. */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-section font-semibold text-balance", className)}>{children}</h2>
  );
}
