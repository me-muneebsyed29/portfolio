"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { StudioSection, SectionHead } from "@/components/studio/section";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Kind words: one quote at a time, large, in the serif. Desktop has the full
 * list of people on the right as an index; the current one carries a taupe
 * bar that fills while it is on screen, then the next quote takes over.
 * Hovering or focusing anywhere in the block holds the current quote.
 * Phones swipe, or use the arrows; the counter pill and the dots underneath
 * say where you are.
 *
 * Every quote is in the server HTML (stacked in one grid cell, the inactive
 * ones hidden), so the block never jumps in height and search engines read
 * them all. "Read in full" opens the original, verbatim, in a dialog.
 */
const DURATION = 9000;

export function KindWords() {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Testimonial | null>(null);
  const count = testimonials.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (reduceMotion || paused || open) return;
    const t = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused, open, reduceMotion, go]);

  const openQuote = (item: Testimonial) => {
    setOpen(item);
    dialogRef.current?.showModal();
  };

  const running = !reduceMotion && !paused && !open;

  return (
    <StudioSection id="kind-words" index="04" label="Testimonials" note="they said it, not me">
      <SectionHead
        title={
          <>
            Kind words from <span className="em-taupe">good people.</span>
          </>
        }
      />

      <div
        className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* The quote. */}
        <div
          className="relative flex flex-col lg:col-span-8"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <span aria-hidden className="font-display absolute -top-8 -left-1 text-[7rem] leading-none text-primary/25 md:-top-12 md:-left-5 md:text-[10rem]">
            “
          </span>
          <div className="relative grid">
            {testimonials.map((item, i) => {
              const active = i === index;
              return (
                <motion.figure
                  key={item.name}
                  aria-hidden={!active}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16, filter: active ? "blur(0px)" : "blur(6px)" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={cn("col-start-1 row-start-1 flex flex-col", !active && "pointer-events-none select-none")}
                >
                  {item.metric ? (
                    <p className="mb-6 flex items-baseline gap-3">
                      <span className="font-display figures text-[3rem] leading-none text-primary md:text-[3.75rem]">
                        {item.metric.value}
                      </span>
                      <span className="caps-label text-muted-foreground">{item.metric.label}</span>
                    </p>
                  ) : null}
                  <blockquote className="font-display text-[1.9rem] leading-[1.15] text-balance text-foreground md:text-[2.9rem]">
                    {item.note}
                  </blockquote>
                  <figcaption className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-body font-medium text-foreground">{item.name}</p>
                      <p className="text-caption text-muted-foreground">
                        {item.role}, {item.company}
                      </p>
                      {item.brand ? (
                        <p className="caps-label mt-3 w-fit rounded-full border border-border px-2.5 py-1 text-faint">
                          {item.brand}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {item.caseStudy ? (
                        <Link href={`/work/${item.caseStudy}`} tabIndex={active ? undefined : -1} className="caps-label link-draw text-primary">
                          See the case study →
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        tabIndex={active ? undefined : -1}
                        onClick={() => openQuote(item)}
                        className="caps-label link-draw text-foreground"
                      >
                        Read in full
                      </button>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          {/* Controls: counter pill, dots, arrows. */}
          <div className="mt-12 flex items-center justify-between gap-6 lg:mt-auto lg:pt-12">
            <div className="flex items-center gap-5">
              <span className="figures caps-label rounded-full bg-[#2c2c2c] px-3.5 py-2 text-foreground">
                {index + 1}/{count}
              </span>
              <div className="flex items-center gap-2" aria-hidden>
                {testimonials.map((item, i) => (
                  <span
                    key={item.name}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-6 bg-primary" : "w-1.5 bg-[#4a4a4a]"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous quote"
                className="flex size-12 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next quote"
                className="flex size-12 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop index of every voice. */}
        <ol className="hidden border-t border-border lg:col-span-4 lg:block">
          {testimonials.map((item, i) => {
            const active = i === index;
            return (
              <li key={item.name} className="relative border-b border-border">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active || undefined}
                  className="group flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span className={cn("figures caps-label transition-colors", active ? "text-primary" : "text-faint")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-[0.95rem] transition-colors duration-300",
                        active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="block text-caption text-faint">{item.company}</span>
                  </span>
                </button>
                {active ? (
                  <motion.span
                    key={`${index}-${running}`}
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
                    initial={{ scaleX: running ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: running ? DURATION / 1000 : 0, ease: "linear" }}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[85svh] w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.25rem] border border-border bg-[#131313] p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative px-7 pt-10 pb-8 md:px-11 md:pt-12"
            >
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-[#2c2c2c] hover:text-foreground"
              >
                <X className="size-5" />
              </button>
              <p className="caps-label text-primary">In full</p>
              {open.quote.map((para, i) => (
                <p key={i} className={cn("text-body leading-relaxed text-muted-foreground text-pretty", i === 0 ? "mt-5" : "mt-4")}>
                  {para}
                </p>
              ))}
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-display text-[1.5rem] leading-none text-foreground">{open.name}</p>
                <p className="mt-2 text-caption text-faint">
                  {open.role}, {open.company}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </dialog>
    </StudioSection>
  );
}
