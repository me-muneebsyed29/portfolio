import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-40", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-3xl font-medium text-balance sm:text-4xl md:text-section", className)}>
      {children}
    </h2>
  );
}
