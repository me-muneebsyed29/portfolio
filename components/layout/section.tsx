import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/*
 * Spacing steps are 8 / 16 / 24 / 40 / 56 / 88; sections run at the 56 step on
 * mobile and 88 on desktop. On the glass sheet, sections part on a hairline
 * rather than a heavy rule, so the pane still reads as one surface.
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
      className={cn("py-14 md:py-22", ruled && "border-t border-rule", className)}
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

/* Section H2. A step larger than the old spec-sheet 28px: on glass there are no
   heavy rules left to carry the hierarchy, so the heading does. */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[2rem] leading-[1.1] font-bold tracking-[-0.025em] text-balance md:text-[2.5rem]",
        className
      )}
    >
      {children}
    </h2>
  );
}
