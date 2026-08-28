import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

export function B2CSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Mono, accent-coloured, with a leading rule — the section marker for the B2C site. */
export function B2CEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono-ui flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-primary/50" />
      {children}
    </p>
  );
}

export function B2CTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-4xl md:text-5xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
