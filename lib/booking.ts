import { bookingParams, leadContext, track, withParams } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

/*
 * Booking through Cal.com's popup, so the visitor stays on the site and the
 * site hears when a booking is made. Every booking button and link goes
 * through openBooking(): it logs book_call_click, opens the popup with the
 * visitor's source attached as UTM parameters, and logs book_call_complete
 * (plus GA4's recommended generate_lead) when Cal.com confirms the booking.
 * If Cal.com's script can't load (ad blocker, network) the booking page opens
 * in a new tab instead, with the same parameters.
 */

const NAMESPACE = "30min";
export const CAL_LINK = "muneebsyed29/30min";
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

/* Which button opened the popup, for the completion event. */
let lastLocation = "unknown";
const completed = new Set<string>();
/* Whether Cal.com's embed.js arrived. "failed" when an ad blocker or the
   network stops it, and then booking falls back to the plain page. */
let embedState: "pending" | "loaded" | "failed" = "pending";

/* Cal's loader snippet, unchanged in behaviour: it installs a queueing stub and
   appends embed.js on first call. Idempotent, so re-running it is harmless. */
export function ensureCal(): CalApi {
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
    const script = document.querySelector<HTMLScriptElement>(`script[src="${CAL_ORIGIN}/embed/embed.js"]`);
    script?.addEventListener("load", () => (embedState = "loaded"));
    script?.addEventListener("error", () => (embedState = "failed"));
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    const api = Cal.ns[NAMESPACE];
    api("ui", {
      theme: "light",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: {
        light: { "cal-brand": "#1668e3", "cal-brand-text": "#ffffff" },
      },
    });
    /* Cal.com renamed this event once and documents both; listen to both and
       count each booking once. */
    const onBooked = (e: { detail?: { data?: { uid?: string; booking?: { uid?: string } } } }) => {
      const uid = e?.detail?.data?.uid ?? e?.detail?.data?.booking?.uid ?? "booking";
      if (completed.has(uid)) return;
      completed.add(uid);
      const context = { location: lastLocation, ...leadContext() };
      track("book_call_complete", context);
      track("generate_lead", { ...context, form: "booking" });
    };
    api("on", { action: "bookingSuccessfulV2", callback: onBooked });
    api("on", { action: "bookingSuccessful", callback: onBooked });
  }
  return Cal;
}

/* True for links to the booking page, from this site or pasted elsewhere. */
export function isBookingUrl(href: string) {
  try {
    const u = new URL(href, window.location.href);
    return u.hostname.endsWith("cal.com") && u.pathname.replace(/\/$/, "").endsWith(`/${CAL_LINK}`);
  } catch {
    return false;
  }
}

export function openBooking(location: string) {
  ensureCal();
  lastLocation = location;
  track("book_call_click", { location, ...leadContext() });

  const params = bookingParams(location);
  const api = window.Cal?.ns?.[NAMESPACE];
  /* While embed.js is still loading, the call queues and the popup opens as
     soon as it arrives. */
  if (!api || embedState === "failed") {
    window.open(withParams(siteConfig.bookingUrl, params), "_blank", "noreferrer");
    return;
  }
  api("modal", {
    calLink: CAL_LINK,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", ...params },
  });
}
