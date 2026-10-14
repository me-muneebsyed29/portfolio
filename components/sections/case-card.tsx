import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import type { Highlight } from "@/data/highlights";
import { cn, isFigure } from "@/lib/utils";

/*
 * The case study card, shared by the homepage, /work and the "more receipts"
 * block at the foot of each story. Two metrics on the card; the rest live on
 * the story page.
 */
export function CaseCard({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-white/90 md:p-7"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="caps-label text-foreground">{study.client}</p>
        <p className="caps-label text-faint">· {study.markets.join(" & ")}</p>
      </div>
      <p className="caps-label mt-2 w-fit rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">{study.tag}</p>
      <h3 className="mt-5 text-xl leading-snug font-bold tracking-[-0.02em] text-balance text-foreground">
        {study.headline}
      </h3>
      {!compact ? (
        <p className="mt-3 hidden text-caption text-muted-foreground text-pretty md:block">{study.oneLine}</p>
      ) : null}

      <div aria-hidden className="min-h-7 flex-1" />
      <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5">
        {study.metrics.slice(0, 2).map((metric, i) => (
          <div key={metric.label} className="flex flex-col-reverse">
            <dt className="caps-label mt-1 text-faint">{metric.label}</dt>
            <dd
              className={cn(
                "text-lg font-bold",
                isFigure(metric.value) ? "figures" : "tracking-[-0.02em]",
                i === 0 ? "text-cadmium" : "text-foreground"
              )}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <span className="caps-label mt-6 inline-flex items-center gap-2 text-primary">
        Read the story
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/* A highlight: real work told as one number and one line, no page of its own. */
export function HighlightCard({ item }: { item: Highlight }) {
  return (
    <div className="glass-card flex h-full flex-col rounded-3xl p-6">
      <p className="caps-label text-faint">
        {item.context} · {item.period}
      </p>
      <h3 className="mt-3 text-lg leading-snug font-bold tracking-[-0.02em] text-balance text-foreground">
        {item.client}
      </h3>
      <p className="mt-2 text-caption text-muted-foreground text-pretty">{item.line}</p>
      <div aria-hidden className="min-h-5 flex-1" />
      <p className="mt-5 flex items-baseline gap-2 border-t border-rule pt-4">
        <span className={cn("text-lg font-bold text-cadmium", isFigure(item.value) && "figures")}>{item.value}</span>
        <span className="caps-label text-faint">{item.label}</span>
      </p>
    </div>
  );
}
