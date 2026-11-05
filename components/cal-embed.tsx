"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { EASE } from "@/lib/motion";

/*
 * Floating Book a call, opening Cal.com's booking popup in place.
 *
 * Cal's own floatingButton renders inside a closed shadow root that only takes a
 * fill colour and a label, so the button is ours (the same taupe pill and caps
 * label as the hero CTA) and Cal only supplies the modal it opens. The popup runs
 * in dark mode with taupe as its brand colour, to match the page.
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
      theme: "dark",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: {
        dark: { "cal-brand": "#bea98e", "cal-brand-text": "#0c0c0c" },
        light: { "cal-brand": "#2c2c2c", "cal-brand-text": "#efe9e0" },
      },
    });
  }, []);

  /* Desktop: the hero already has a booking button, so the floating one
     appears once that has scrolled out of view. Phones: the pill is always
     there, one thumb away. */
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const onScroll = () => setVisible(phone.matches || window.scrollY > window.innerHeight * 0.6);
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
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center md:inset-x-auto md:right-8 md:bottom-8"
        >
          <Button
            onClick={openBooking}
            size="lg"
            className="caps-label pointer-events-auto h-12 rounded-full border border-[#0c0c0c]/20 px-6 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9),0_0_30px_-10px_rgba(190,169,142,0.5)] transition-[background-color] duration-500 hover:bg-[#cdbaa0]"
          >
            Book a call
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
