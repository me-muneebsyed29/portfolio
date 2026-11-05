"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * One section of the studio site. Sections part on a hairline that draws
 * itself across the page as it scrolls in, then a header row in the
 * catalogue idiom: a numbered label on the left ("02 — The receipts") and,
 * on the right, at most one aside in the serif italic. The aside is the
 * second voice of the site: a wry line, never something the reader needs.
 */
export function StudioSection({
  id,
  index,
  label,
  note,
  className,
  containerClassName,
  ruled = true,
  children,
}: {
  id?: string;
  /* Two-digit index, e.g. "02". */
  index?: string;
  label?: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ruled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-20", className)}>
      {ruled ? (
        <Container>
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="h-px origin-left bg-border"
          />
        </Container>
      ) : null}
      <Container className={cn("py-20 md:py-24", containerClassName)}>
        {label || note ? (
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 md:mb-14">
            {label ? (
              <p className="caps-label flex items-center gap-3 text-muted-foreground">
                {index ? <span className="figures text-primary">{index}</span> : null}
                {index ? <span aria-hidden className="h-px w-8 bg-border-strong" /> : null}
                {label}
              </p>
            ) : (
              <span />
            )}
            {note ? <Aside>{note}</Aside> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

/* The serif italic aside. */
export function Aside({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("font-display text-[1.15rem] leading-snug text-faint italic md:text-[1.3rem]", className)}>
      {children}
    </p>
  );
}

/* Heading plus its one-sentence subcopy, with an optional link on the right. */
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
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12", className)}>
      <div className="max-w-3xl">
        <Heading className="font-display text-[2.75rem] leading-[0.98] text-balance text-foreground md:text-[4.25rem]">
          {title}
        </Heading>
        {sub ? <p className="mt-5 max-w-xl text-body text-muted-foreground text-pretty">{sub}</p> : null}
      </div>
      {children}
    </div>
  );
}

/* Text link in caps with an arrow that slides on hover. */
export function ArrowLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn("caps-label group inline-flex shrink-0 items-center gap-2 text-primary", className)}
    >
      <span className="link-draw">{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
