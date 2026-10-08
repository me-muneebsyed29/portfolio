import { cn } from "@/lib/utils";

/*
 * One section of the sky site: a glass card with open sky around it, and at
 * most one handwritten note sitting on the sky just above the card. The note
 * is the second voice from the sky direction doc: the aside, never something
 * the reader needs.
 */
export function SkySection({
  id,
  note,
  className,
  cardClassName,
  bare = false,
  children,
}: {
  id?: string;
  note?: React.ReactNode;
  className?: string;
  cardClassName?: string;
  /* Skip the glass card, for blocks that float on the sky by design. */
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-3 py-5 sm:px-5 md:py-8", className)}>
      <div className="mx-auto max-w-[1240px]">
        {note ? <ChalkNote className="mb-3 ml-5 md:mb-4 md:ml-10">{note}</ChalkNote> : null}
        {bare ? (
          children
        ) : (
          <div className={cn("glass rounded-[2rem] px-6 py-10 sm:px-10 md:rounded-[2.5rem] md:px-14 md:py-14", cardClassName)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/* Lowercase chalk on the sky, slightly tilted. */
export function ChalkNote({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "chalk font-hand w-fit -rotate-2 text-[1.55rem] leading-none font-medium md:text-[1.8rem]",
        className
      )}
    >
      {children}
    </p>
  );
}

/* Heading plus its one-sentence subcopy. */
export function SectionHead({
  title,
  sub,
  as: Heading = "h2",
  className,
  children,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  /* h1 when the section is the page itself, like /writing. */
  as?: "h1" | "h2";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <Heading className="text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-foreground md:text-[2.6rem]">
          {title}
        </Heading>
        {sub ? <p className="mt-3 max-w-xl text-body text-muted-foreground text-pretty">{sub}</p> : null}
      </div>
      {children}
    </div>
  );
}
