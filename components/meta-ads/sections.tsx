"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Plus, X } from "lucide-react";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { NoteDoodle } from "@/components/sky/note-doodles";
import { Fill, MobileFold } from "@/components/meta-ads/ui";
import {
  creative,
  faq,
  fit,
  hasGap,
  leaks,
  metaTestimonials,
  ninetyDays,
  offers,
  proofStats,
  shown,
  teaching,
  META_ADS_LIVE,
} from "@/data/meta-ads";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const reveal = {
  variants: staggerContainer(0.08),
  initial: "hidden",
  whileInView: "show",
  viewport: viewportOnce,
} as const;

/* 2. Four numbers. One accent number per screen: $20M+ takes the blue. */
export function ProofStrip() {
  return (
    <SkySection id="proof" bare>
      <motion.dl {...reveal} className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {proofStats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="glass flex flex-col-reverse justify-between rounded-3xl px-5 pt-5 pb-4 md:px-6 md:pt-6"
          >
            <dt className="mt-2 text-caption leading-snug font-medium text-muted-foreground">{s.label}</dt>
            <dd
              className={cn(
                "figures text-[1.5rem] leading-none font-bold sm:text-[1.9rem]",
                s.accent ? "text-cadmium" : "text-foreground"
              )}
            >
              {s.figure}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </SkySection>
  );
}

/* 3. Where Meta accounts leak. Folds on phones. */
export function Leaks() {
  return (
    <SkySection id="leaks" note={leaks.chalk}>
      <SectionHead title={leaks.title} sub={leaks.intro} />
      <MobileFold summary="See the four checks">
        <motion.ul {...reveal} className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {leaks.cards.map((card) => (
            <motion.li key={card.title} variants={fadeUp} className="glass-card flex flex-col rounded-3xl p-6 md:p-8">
              <div className="flex gap-5">
                <NoteDoodle id={card.doodle} className="w-12 shrink-0 md:w-14" />
                <div>
                  <h3 className="text-xl leading-snug font-bold tracking-[-0.02em] text-foreground">{card.title}</h3>
                  <p className="mt-2 text-body text-muted-foreground text-pretty">{card.body}</p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-caption text-foreground text-pretty">
                <span className="font-hand mr-1.5 text-[1.2rem] leading-none font-bold text-primary">from my work:</span>
                {card.proof}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </MobileFold>
      <p className="mt-8 text-body font-semibold text-foreground">{leaks.footnote}</p>
    </SkySection>
  );
}

/* 6. Ways to work with me. Cards rather than a table, so it holds at phone
   width; the audit leads. */
export function Offers() {
  return (
    <SkySection id="pricing" note="start small, then decide">
      <SectionHead title={offers.title} sub={offers.intro} />
      <motion.ul {...reveal} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {offers.items.map((item) => (
          <motion.li
            key={item.name}
            variants={fadeUp}
            className={cn(
              "glass-card relative flex flex-col rounded-3xl p-6 md:p-8",
              item.lead && "ring-2 ring-primary/40"
            )}
          >
            {item.lead ? (
              <span className="caps-label absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-primary-foreground">
                Start here
              </span>
            ) : null}
            <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">{item.name}</h3>
            <p className="mt-2 text-body text-muted-foreground text-pretty">{item.what}</p>
            <div aria-hidden className="min-h-5 flex-1" />
            <OfferFacts
              facts={[
                { label: "How long", value: item.length },
                { label: "Price", value: item.price },
              ]}
            />
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-8 text-body text-muted-foreground text-pretty">
        <Fill>{offers.footnote}</Fill>
      </p>
    </SkySection>
  );
}

/* The how-long and price row; a fact still waiting on a gap is left off. */
function OfferFacts({ facts }: { facts: { label: string; value: string }[] }) {
  const visible = facts.filter((f) => shown(f.value));
  if (visible.length === 0) return null;
  return (
    <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-rule pt-4">
      {visible.map((f) => (
        <div key={f.label}>
          <dt className="caps-label text-faint">{f.label}</dt>
          <dd className="mt-1 font-semibold text-foreground">
            <Fill>{f.value}</Fill>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* 7. Creative. Folds on phones. */
export function Creative() {
  return (
    <SkySection id="creative" note={creative.chalk}>
      <SectionHead title={creative.title} sub={creative.body} />
      <MobileFold summary="How I test creative">
        <motion.ol {...reveal} className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3">
          {creative.steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp} className="glass-card rounded-3xl p-6 md:p-7">
              <span className="figures text-[2rem] leading-none font-bold text-cadmium">0{i + 1}</span>
              <h3 className="mt-4 text-lg leading-snug font-bold tracking-[-0.02em] text-foreground">{step.title}</h3>
              <p className="mt-2 text-caption text-muted-foreground text-pretty">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white/70 p-6">
            <p className="caps-label text-faint">What you get</p>
            <p className="mt-2 text-body text-foreground text-pretty">{creative.deliverables}</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-6">
            <p className="caps-label text-faint">Proof</p>
            <p className="mt-2 text-body text-foreground text-pretty">{creative.proof}</p>
          </div>
        </div>
      </MobileFold>
    </SkySection>
  );
}

/* 8. Your first 90 days. Folds on phones. */
export function NinetyDays() {
  return (
    <SkySection id="process" note="no surprises, promise">
      <SectionHead title={ninetyDays.title} />
      <MobileFold summary="See the 90-day plan">
        <motion.ol {...reveal} className="relative mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-4">
          {ninetyDays.phases.map((p) => (
            <motion.li key={p.when} variants={fadeUp} className="glass-card flex flex-col rounded-3xl p-6">
              <p className="caps-label w-fit rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">{p.when}</p>
              <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-foreground">{p.title}</h3>
              <p className="mt-2 text-caption text-muted-foreground text-pretty">
                <Fill>{p.body}</Fill>
              </p>
            </motion.li>
          ))}
        </motion.ol>
        <div className="mt-8">
          <h3 className="caps-label text-faint">{ninetyDays.howLabel}</h3>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {ninetyDays.how.filter((line) => shown(line)).map((line) => (
              <li key={line} className="flex gap-3 text-body text-foreground">
                <Check className="mt-1 size-4 shrink-0 text-primary" />
                <span className="text-pretty">
                  <Fill>{line}</Fill>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </MobileFold>
    </SkySection>
  );
}

/* 9. Teaching. */
export function Teaching() {
  const stats = teaching.stats.filter((s) => shown(s.figure) && shown(s.label));
  return (
    <SkySection id="teaching" note="I teach this too">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <SectionHead title={teaching.title} />
          <p className="mt-4 text-body text-muted-foreground text-pretty">
            <Fill>{teaching.body}</Fill>
          </p>
          {stats.length > 0 ? (
            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="glass-card flex flex-col-reverse rounded-2xl px-4 pt-4 pb-3.5">
                  <dt className="mt-2 text-caption leading-snug text-muted-foreground">
                    <Fill>{s.label}</Fill>
                  </dt>
                  <dd className="figures text-xl font-bold text-foreground">
                    <Fill>{s.figure}</Fill>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {shown(teaching.lastLink.label) ? (
            <p className="mt-8 text-body text-foreground">
              {teaching.last}{" "}
              <a href={teaching.lastLink.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                <Fill>{teaching.lastLink.label}</Fill>
              </a>
            </p>
          ) : null}
        </div>
        {shown(teaching.quote.text) ? (
          <figure className="relative self-center -rotate-1 bg-[#ffe066] px-6 pt-8 pb-6 text-[#3a2a00] shadow-[0_18px_30px_-18px_rgba(120,80,0,0.55)] md:col-span-5">
            <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-white/60" />
            <blockquote className="text-[1.05rem] leading-snug font-semibold text-pretty">
              <Fill>{teaching.quote.text}</Fill>
            </blockquote>
            <figcaption className="mt-4 text-caption font-bold">
              <Fill>{teaching.quote.who}</Fill>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </SkySection>
  );
}

/* 10. Testimonials and fit. */
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

export function Fit() {
  return (
    <SkySection id="kind-words" note="they said it, not me">
      <SectionHead title="What people say" />
      <motion.div {...reveal} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
        {metaTestimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            className={cn(
              "relative flex h-full flex-col bg-[#ffe066] px-6 pt-7 pb-5 text-[#3a2a00] shadow-[0_18px_30px_-18px_rgba(120,80,0,0.55)] transition-transform duration-300 md:hover:rotate-0",
              tilts[i % tilts.length]
            )}
          >
            <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-white/60" />
            <blockquote className="text-[1.05rem] leading-snug font-semibold text-pretty">“{t.quote}”</blockquote>
            <figcaption className="mt-auto pt-5">
              <p className="text-caption font-bold">{t.name}</p>
              <p className="text-caption text-[#6b5300]">{t.role}</p>
              {t.tag ? <p className="caps-label mt-2 w-fit rounded-full bg-[#3a2a00]/10 px-2 py-0.5">{t.tag}</p> : null}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      <div className="mt-16 border-t border-rule pt-10">
        <h3 className="text-[1.6rem] leading-tight font-bold tracking-[-0.02em] text-foreground md:text-[2rem]">
          Is this a fit?
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FitList title="Good fit if you" items={fit.good} good />
          <FitList title="Probably not a fit if you" items={fit.notYet} />
        </div>
      </div>
    </SkySection>
  );
}

function FitList({ title, items, good = false }: { title: string; items: string[]; good?: boolean }) {
  const Icon = good ? Check : X;
  return (
    <div className={cn("rounded-3xl p-6 md:p-7", good ? "glass-card" : "bg-white/45")}>
      <p className="caps-label text-faint">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.filter((item) => shown(item)).map((item) => (
          <li key={item} className="flex gap-3 text-body text-foreground">
            <Icon className={cn("mt-1 size-4 shrink-0", good ? "text-primary" : "text-faint")} />
            <span className="text-pretty">
              <Fill>{item}</Fill>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 11. FAQ. One open at a time. */
/* Once live, a question whose answer still has a gap is left out whole: half
   an answer reads worse than none. */
const visibleFaq = faq.filter((item) => !META_ADS_LIVE || !hasGap(item.a));

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SkySection id="faq" note="the usual questions">
      <SectionHead title="Questions people ask first" />
      <ul className="mt-8 border-t border-rule">
        {visibleFaq.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-rule">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-lg font-semibold tracking-[-0.01em] text-foreground">{item.q}</span>
                {isOpen ? (
                  <Minus className="size-5 shrink-0 text-primary" />
                ) : (
                  <Plus className="size-5 shrink-0 text-primary" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-body text-muted-foreground text-pretty">
                      <Fill>{item.a}</Fill>
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </SkySection>
  );
}
