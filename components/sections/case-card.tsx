import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import type { Highlight } from "@/data/highlights";
import { cn, isFigure } from "@/lib/utils";

/*
 * The case study card, shared by the homepage, /work and the "more receipts"
 * block at the foot of each story. Two metrics on the card; the rest live on
 * the story page. On hover a taupe rule draws across the top, the border warms
 * and the arrow moves off.
 */
export function CaseCard({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-card p-6 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#4a4a4a] hover:bg-[#161616] md:p-8"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
      <p className="caps-label text-foreground">
        {study.client}
        <span className="text-faint"> · {study.markets.join(" & ")}</span>
      </p>
      <p className="caps-label mt-3 w-fit rounded-full border border-border px-2.5 py-1 text-muted-foreground">
        {study.tag}
      </p>

      <h3 className="font-display mt-8 text-[1.85rem] leading-[1.05] text-balance text-foreground md:text-[2.1rem]">
        {study.headline}
      </h3>
      {!compact ? (
        <p className="mt-4 hidden text-caption text-muted-foreground text-pretty md:block">{study.oneLine}</p>
      ) : null}

      <div aria-hidden className="min-h-8 flex-1" />
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6">
        {study.metrics.slice(0, 2).map((metric, i) => (
          <div key={metric.label} className="flex flex-col-reverse">
            <dt className="caps-label mt-2 text-faint">{metric.label}</dt>
            <dd
              className={cn(
                "font-display text-[1.6rem] leading-none whitespace-nowrap",
                isFigure(metric.value) && "figures",
                i === 0 ? "text-primary" : "text-foreground"
              )}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <span className="caps-label mt-8 inline-flex items-center gap-2 text-foreground">
        <span className="link-draw">Read the story</span>
        <span aria-hidden className="text-primary transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  );
}

/* A highlight: real work told as one number and one line, no page of its own. */
export function HighlightCard({ item }: { item: Highlight }) {
  return (
    <div className="flex h-full flex-col rounded-[1.25rem] border border-border bg-card/60 p-6 md:p-7">
      <p className="caps-label text-faint">
        {item.context} · {item.period}
      </p>
      <h3 className="font-display mt-4 text-[1.5rem] leading-[1.1] text-balance text-foreground">{item.client}</h3>
      <p className="mt-3 text-caption text-muted-foreground text-pretty">{item.line}</p>
      <div aria-hidden className="min-h-5 flex-1" />
      <p className="mt-6 flex items-baseline gap-3 border-t border-border pt-5">
        <span className={cn("font-display text-[1.75rem] leading-none text-primary", isFigure(item.value) && "figures")}>
          {item.value}
        </span>
        <span className="caps-label text-faint">{item.label}</span>
      </p>
    </div>
  );
}
