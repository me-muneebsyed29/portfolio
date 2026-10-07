"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

/*
 * Floating Book a Call, opening Cal.com's booking popup in place.
 *
 * Cal's own floatingButton renders inside a closed shadow root that only takes a
 * fill colour and a label, so the button is ours (the same blue pill and mono
 * label as the nav CTA) and Cal only supplies the modal it opens. The popup runs
 * in light mode with the sky blue as its brand colour, to match the page.
 */

const NAMESPACE = "30min";
const CAL_LINK = "muneebsyed29/30min";
const CAL_ORIGIN = "https://app.cal.com";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/* Cal's loader snippet, unchanged in behaviour: it installs a queueing stub and
   appends embed.js on first call. Idempotent, so re-running it is harmless. */
function ensureCal(): CalApi {
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) { a.q.push(ar); };
    const d = C.document;
    C.Cal = C.Cal || function () {
      const cal = C.Cal;
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api: any = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, `${CAL_ORIGIN}/embed/embed.js`, "init");
  /* eslint-enable */

  const Cal = window.Cal!;
  if (!Cal.ns?.[NAMESPACE]) {
    Cal("init", NAMESPACE, { origin: CAL_ORIGIN });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
  }
  return Cal;
}

export function CalEmbed() {
  const [visible, setVisible] = useState(false);

  /* Loads embed.js after hydration. */
  useEffect(() => {
    ensureCal().ns[NAMESPACE]("ui", {
      theme: "light",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: {
        light: { "cal-brand": "#1668e3", "cal-brand-text": "#ffffff" },
      },
    });
  }, []);

  /* The hero already has a Book a Call; the floating one appears once that has
     scrolled out of view, so the first screen never shows the CTA twice. */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = () => {
    const api = window.Cal?.ns?.[NAMESPACE];
    if (!api) {
      // embed.js blocked (ad blocker, network): fall back to the booking page.
      window.open(siteConfig.bookingUrl, "_blank", "noreferrer");
      return;
    }
    api("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          /* z-40 keeps it under the header and the mobile menu sheet (z-50). */
          className="fixed right-4 bottom-4 z-40 md:right-8 md:bottom-8"
        >
          <Button
            onClick={openBooking}
            size="lg"
            className="mono-label h-12 rounded-full border-2 border-white px-6 shadow-[0_14px_30px_-12px_rgba(22,104,227,0.8)]"
          >
            Book a Call
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
