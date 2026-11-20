"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, leadContext, track } from "@/lib/analytics";
import { isBookingUrl, openBooking } from "@/lib/booking";

/*
 * One listener for the whole site, so components don't each need tracking
 * code. It records where the visitor came from, then logs:
 * - clicks on links, by kind: book_call_click (and opens the booking popup),
 *   email_click, linkedin_click, phone_click, outbound_click,
 *   case_study_click, essay_click, nav_click, scroll_link_click;
 * - anything marked data-track="event_name" (with optional data-track-label);
 * - section_view, the first time each section is half on screen;
 * - scroll_depth at 25, 50, 75 and 100%, and content_read at 75% on case
 *   studies and essays;
 * - page_not_found on the 404 page.
 * Each click carries a `location`: the nearest data-track-location, else
 * header, footer, menu or the section id it sits in.
 * Page views themselves come from GA4's enhanced measurement.
 */

const SECTION_NAMES: Record<string, string> = { top: "hero" };

function locationOf(el: Element): string {
  const tagged = el.closest("[data-track-location]");
  if (tagged) return tagged.getAttribute("data-track-location") || "page";
  if (el.closest("[role=dialog]")) return "menu";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section[id], [data-track-section]");
  const id = section?.getAttribute("data-track-section") || section?.id;
  if (id) return SECTION_NAMES[id] ?? id;
  return "page";
}

function labelOf(el: Element) {
  /* A card link reads best by its heading, not all of its text. */
  const heading = el.querySelector("h1, h2, h3, h4");
  return (el.getAttribute("data-track-label") || el.getAttribute("aria-label") || heading?.textContent || el.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null;
  if (!target?.closest) return;

  const marked = target.closest("[data-track]");
  if (marked) {
    track(marked.getAttribute("data-track")!, { location: locationOf(marked), label: labelOf(marked) });
  }

  const a = target.closest("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute("href")!;
  const location = locationOf(a);
  const label = labelOf(a);

  if (isBookingUrl(href)) {
    /* A plain click opens the popup; ctrl/cmd/middle clicks keep their
       new-tab behaviour and are still counted. */
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      openBooking(location);
    } else {
      track("book_call_click", { location, ...leadContext() });
    }
    return;
  }
  if (href.startsWith("mailto:")) return track("email_click", { location, ...leadContext() });
  if (href.startsWith("tel:")) return track("phone_click", { location, ...leadContext() });

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return;
  }
  if (url.origin !== window.location.origin) {
    const domain = url.hostname.replace(/^www\./, "");
    if (domain.endsWith("linkedin.com")) return track("linkedin_click", { location, link_url: url.href });
    return track("outbound_click", { location, label, link_url: url.href, link_domain: domain });
  }

  if (url.pathname === window.location.pathname && url.hash) {
    return track("scroll_link_click", { location, label, link_url: url.hash });
  }
  const work = url.pathname.match(/^\/work\/([^/]+)/);
  if (work) return track("case_study_click", { location, slug: work[1], label });
  const essay = url.pathname.match(/^\/writing\/([^/]+)/);
  if (essay) return track("essay_click", { location, slug: essay[1], label });
  if (["header", "footer", "menu"].includes(location)) {
    return track("nav_click", { location, label, link_url: url.pathname + url.hash });
  }
}

export function SiteAnalytics() {
  const pathname = usePathname();

  /* Clicks: one capture-phase listener, set once. */
  useEffect(() => {
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* Per page: attribution, 404s, section views, scroll depth. */
  useEffect(() => {
    captureAttribution();

    if (document.querySelector("[data-page-not-found]")) {
      track("page_not_found", { link_url: pathname, label: document.referrer || "direct" });
    }

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const id = el.getAttribute("data-track-section") || el.id;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          track("section_view", { section: SECTION_NAMES[id] ?? id });
          observer.unobserve(el);
        }
      },
      /* Half the section, or half the screen for sections taller than it. */
      { threshold: [0.5], rootMargin: "0px 0px -25% 0px" }
    );
    /* Sections render after hydration on some pages; look once now and once
       a moment later. */
    const observe = () =>
      document.querySelectorAll("main section[id], [data-track-section]").forEach((el) => observer.observe(el));
    observe();
    const late = window.setTimeout(observe, 1500);

    const read = pathname.match(/^\/(work|writing)\/([^/]+)/);
    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of marks) {
        if (pct + 1 < m || hit.has(m)) continue;
        hit.add(m);
        track("scroll_depth", { percent: m });
        if (m === 75 && read) {
          track("content_read", { slug: read[2], label: read[1] === "work" ? "case_study" : "essay" });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
