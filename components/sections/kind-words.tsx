"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Kind words: a wall of yellow sticky notes with slight rotations, one line
 * each, verbatim. "Read in full" opens the original in a dialog. The lead
 * note carries the one number big.
 *
 * Phones swipe one note at a time with dots underneath, show the first three,
 * then a link to the rest.
 */
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-[1.5deg]"];

function Note({ item, index, onOpen }: { item: Testimonial; index: number; onOpen: () => void }) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col bg-[#ffe066] px-6 pt-7 pb-5 text-[#3a2a00] shadow-[0_18px_30px_-18px_rgba(120,80,0,0.55)] transition-transform duration-300 md:hover:rotate-0",
        tilts[index % tilts.length]
      )}
    >
      <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-white/60" />
      {item.metric ? (
        <p className="mb-3">
          <span className="figures block text-[2.6rem] leading-none font-extrabold">{item.metric.value}</span>
          <span className="caps-label mt-1 block text-[#6b5300]">{item.metric.label}</span>
        </p>
      ) : null}
      <blockquote className="text-[1.05rem] leading-snug font-semibold text-pretty">“{item.note}”</blockquote>
      <figcaption className="mt-auto pt-5">
        <p className="text-caption font-bold">{item.name}</p>
        <p className="text-caption text-[#6b5300]">
          {item.role}, {item.company}
        </p>
        {item.brand ? (
          <p className="caps-label mt-2 w-fit rounded-full bg-[#3a2a00]/10 px-2 py-0.5">{item.brand}</p>
        ) : null}
        <button
          type="button"
          onClick={onOpen}
          className="caps-label mt-4 underline decoration-[#3a2a00]/30 underline-offset-4 hover:decoration-[#3a2a00]"
        >
          Read in full
        </button>
      </figcaption>
    </figure>
  );
}

export function KindWords() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Testimonial | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [slide, setSlide] = useState(0);

  const openQuote = (item: Testimonial) => {
    setOpen(item);
    dialogRef.current?.showModal();
  };

  const mobileItems = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <SkySection id="kind-words" note="they said it, not me">
      <SectionHead title="Kind words from good people." />

      {/* Desktop: the wall. */}
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 hidden gap-x-6 gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((item, i) => (
          <motion.div key={item.name} variants={fadeUp}>
            <Note item={item} index={i} onOpen={() => openQuote(item)} />
          </motion.div>
        ))}
      </motion.div>

      {/* Phones: one note at a time. */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            setSlide(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="-mx-6 mt-10 flex snap-x snap-mandatory overflow-x-auto pt-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mobileItems.map((item, i) => (
            <div key={item.name} className="w-full shrink-0 snap-center px-8">
              <Note item={item} index={i} onOpen={() => openQuote(item)} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2" aria-hidden>
            {mobileItems.map((item, i) => (
              <span
                key={item.name}
                className={cn("size-2 rounded-full transition-colors", i === slide ? "bg-primary" : "bg-foreground/20")}
              />
            ))}
          </div>
          {!showAll ? (
            <button type="button" onClick={() => setShowAll(true)} className="caps-label text-primary">
              More kind words →
            </button>
          ) : null}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[85svh] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto rounded-[2rem] border-0 bg-transparent p-0 backdrop:bg-[#0b1d3a]/40 backdrop:backdrop-blur-sm"
      >
        {open ? (
          <div className="relative bg-[#ffe066] px-7 pt-9 pb-7 text-[#3a2a00] md:px-10 md:pt-11">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-[#3a2a00]/10"
            >
              <X className="size-5" />
            </button>
            {open.quote.map((para, i) => (
              <p key={i} className={cn("text-body leading-relaxed text-pretty", i > 0 && "mt-4")}>
                {para}
              </p>
            ))}
            <p className="mt-6 text-caption font-bold">{open.name}</p>
            <p className="text-caption text-[#6b5300]">
              {open.role}, {open.company}
            </p>
          </div>
        ) : null}
      </dialog>
    </SkySection>
  );
}
