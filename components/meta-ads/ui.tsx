"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { META_ADS_LIVE, shown } from "@/data/meta-ads";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/*
 * Shared bits for /meta-ads.
 */

/* Copy with [gaps]: anything in square brackets is a value only Muneeb can
   fill. In draft it's drawn as a dashed yellow highlight so it can't ship
   unnoticed; once live, sentences with gaps are left out (see shown()). */
export function Fill({ children }: { children: string }) {
  if (META_ADS_LIVE) return <>{shown(children)}</>;
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <mark
            key={i}
            title="Fill this in before launch"
            className="rounded-md bg-[#ffd84d]/55 px-1 text-inherit decoration-[#b38600] decoration-dashed underline-offset-4 [box-decoration-break:clone] underline"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

/*
 * GA4 runs inside GTM, so events go to the dataLayer. Each carries the page's
 * ?src= (which outreach list sent the visitor) and the track they're on, so
 * GTM can report which pitch books calls. Add matching triggers in GTM for
 * the event names: meta_ads_cta, meta_ads_track, meta_ads_review_submit.
 */
export function getSrc() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("src") ?? "";
}

export function trackEvent(event: string, params: Record<string, string> = {}) {
  track(event, { page: "meta-ads", src: getSrc(), ...params });
}

/* The main call to action, tagged with where on the page it was clicked. */
export function BookCall({
  location,
  className,
  label = "Book a 30-min call",
}: {
  location: string;
  className?: string;
  label?: string;
}) {
  return (
    <Button
      render={<a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" />}
      nativeButton={false}
      size="lg"
      onClick={() => trackEvent("meta_ads_cta", { cta: "book_call", location })}
      className={cn(
        "caps-label h-12 w-full rounded-full px-7 shadow-[0_10px_24px_-10px_rgba(22,104,227,0.8)] sm:w-auto",
        className
      )}
    >
      {label}
    </Button>
  );
}

/*
 * Tap-to-open on phones, always open from md up. The doc folds the leaks,
 * creative and 90-days sections on mobile so the page stays short there.
 */
export function MobileFold({
  summary,
  children,
  className,
}: {
  summary: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="glass-card mt-8 flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left md:hidden"
      >
        <span className="font-semibold text-foreground">{open ? "Show less" : summary}</span>
        <ChevronDown className={cn("size-5 shrink-0 text-primary transition-transform", open && "rotate-180")} />
      </button>
      <div className={cn(open ? "block" : "hidden", "md:block")}>{children}</div>
    </div>
  );
}
