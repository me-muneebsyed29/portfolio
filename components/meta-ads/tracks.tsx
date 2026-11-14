"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { BookCall, Fill, trackEvent } from "@/components/meta-ads/ui";
import { metaCases, shown, tracks, type MetaCase, type Track } from "@/data/meta-ads";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Sections 4 and 5 share one state: "What do you sell?" picks a track, and
 * the case studies below show that track's proof first. Outreach links can
 * land a prospect on their side with ?track=b2b or ?track=d2c. The choice is
 * written back to the URL (replaceState, no reload) so a shared link keeps it.
 *
 * Read from window rather than useSearchParams, so the page stays static
 * without a Suspense boundary. B2B is the default: it's the sharpest angle.
 */
const ORDER: Track[] = ["b2b", "d2c"];

/* The URL is the store: read it, and re-read on our own change event or on
   back/forward. The server always renders the default track. */
const TRACK_EVENT = "meta-ads-track";

function readTrack(): Track {
  const t = new URLSearchParams(window.location.search).get("track");
  return t === "d2c" ? "d2c" : "b2b";
}

function subscribe(onChange: () => void) {
  window.addEventListener(TRACK_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(TRACK_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
}

export function TracksAndCases() {
  const track = useSyncExternalStore<Track>(subscribe, readTrack, () => "b2b");
  const [showAll, setShowAll] = useState(false);

  const pick = (t: Track) => {
    setShowAll(false);
    const url = new URL(window.location.href);
    url.searchParams.set("track", t);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(TRACK_EVENT));
    trackEvent("meta_ads_track", { track: t });
  };

  const own = metaCases.filter((c) => c.track === track);
  const other = metaCases.filter((c) => c.track !== track);
  const t = tracks[track];

  return (
    <>
      <SkySection id="tracks" note="pick your side">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[1.6rem] leading-tight font-bold tracking-[-0.02em] text-foreground md:text-[2rem]">
            What do you sell?
          </h2>
          <div role="tablist" aria-label="What do you sell?" className="flex w-full rounded-full bg-white/70 p-1.5 ring-1 ring-white sm:w-fit">
            {ORDER.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={track === key}
                aria-controls="track-panel"
                onClick={() => pick(key)}
                className={cn(
                  "caps-label relative flex-1 rounded-full px-3 py-3 whitespace-nowrap transition-colors sm:flex-none sm:px-5",
                  track === key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {track === key ? (
                  <motion.span
                    layoutId="track-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_20px_-10px_rgba(22,104,227,0.9)]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{tracks[key].label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={track}
            id="track-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12"
          >
            <div className="md:col-span-6">
              <h3 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-foreground md:text-[2.5rem]">
                {t.title}
              </h3>
              <p className="mt-4 text-body text-muted-foreground text-pretty">{t.body}</p>
              <p className="caps-label mt-6 text-faint">
                Case studies below: {own.map((c) => c.client).join(", ")}
              </p>
            </div>
            <div className="glass-card rounded-3xl p-6 md:col-span-6 md:p-8">
              <p className="caps-label text-faint">{t.setupLabel}</p>
              <ul className="mt-4 space-y-3">
                {t.setup.map((line) => (
                  <li key={line} className="flex gap-3 text-body text-foreground">
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    <span className="text-pretty">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </SkySection>

      <SkySection id="work" note="the why is inside">
        <SectionHead
          title="Meta accounts I’ve worked on"
          sub={`Showing ${tracks[track].label.toLowerCase()} first. Where it started, what I did, what changed.`}
        />

        <motion.ul
          key={track}
          variants={staggerContainer(0.07)}
          initial="hidden"
          animate="show"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {(showAll ? [...own, ...other] : own).map((c) => (
            <motion.li key={c.client} variants={fadeUp}>
              <CaseCard study={c} />
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          {!showAll ? (
            <button type="button" onClick={() => setShowAll(true)} className="caps-label text-primary">
              Show the {tracks[track === "b2b" ? "d2c" : "b2b"].label.toLowerCase()} work too ({other.length}) →
            </button>
          ) : (
            <span className="caps-label text-faint">All {metaCases.length} Meta case studies</span>
          )}
          <BookCall location="case_studies" />
        </div>
      </SkySection>
    </>
  );
}

function CaseCard({ study }: { study: MetaCase }) {
  return (
    <article className="glass-card flex h-full flex-col rounded-3xl p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <h3 className="caps-label text-foreground">{study.client}</h3>
        <p className="caps-label text-faint">· {study.meta}</p>
      </div>
      {study.channels ? (
        <p className="caps-label mt-2 w-fit rounded-full bg-primary/10 px-2.5 py-1 text-cadmium-sm">{study.channels}</p>
      ) : null}

      <p className="mt-5 flex items-baseline gap-2">
        <span className="figures text-[1.9rem] leading-none font-bold text-cadmium">{study.figure}</span>
        <span className="caps-label text-faint">{study.figureLabel}</span>
      </p>

      <div className="mt-5 space-y-4 border-t border-rule pt-5">
        {study.started && shown(study.started) ? (
          <Step label="Where it started">
            <Fill>{study.started}</Fill>
          </Step>
        ) : null}
        <Step label="What I did">{study.did}</Step>
        <Step label="What changed" strong>
          <Fill>{study.changed}</Fill>
        </Step>
      </div>

      <div aria-hidden className="min-h-2 flex-1" />
      {study.caseStudy ? (
        <Link href={`/work/${study.caseStudy}`} className="caps-label group mt-6 inline-flex items-center gap-2 text-primary">
          Read the full story
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      ) : null}
    </article>
  );
}

function Step({ label, strong = false, children }: { label: string; strong?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="caps-label text-faint">{label}</p>
      <p className={cn("mt-1 text-pretty", strong ? "font-semibold text-foreground" : "text-caption text-muted-foreground")}>
        {children}
      </p>
    </div>
  );
}
