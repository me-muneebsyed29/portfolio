/*
 * Site analytics. GA4 runs as a Google tag inside GTM, so the site never talks
 * to GA4 directly: it pushes named events to the dataLayer and GTM forwards
 * them (see docs/analytics.md and docs/gtm-site-events.json).
 *
 * Attribution is kept here too, so every lead says where it came from:
 * - first touch: the first time this browser reached the site (localStorage,
 *   kept for 90 days);
 * - last touch: what brought this visit (sessionStorage), replaced whenever a
 *   new campaign link or outside referrer arrives.
 * Each holds a source, a medium, the campaign fields when there were any, the
 * landing page and the date. No personal data is stored.
 */

export type Touch = {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  /* Ad click ids say which network sent a paid click even without UTMs. */
  click_id?: string;
  /* The /meta-ads outreach lists tag their links with ?src=. */
  src?: string;
  landing: string;
  referrer?: string;
  at: string;
};

type Params = Record<string, string | number | boolean | undefined>;

/* Every parameter any event sends. GTM maps each to a GA4 event parameter
   (docs/gtm-site-events.json), and track() clears them between events. */
export const EVENT_PARAMS = [
  "location",
  "label",
  "link_url",
  "link_domain",
  "slug",
  "section",
  "percent",
  "filter_type",
  "filter_value",
  "weather",
  "form",
  "error",
  "lead_source",
  "first_source",
  "landing_page",
  "first_seen",
  "src",
  "cta",
  "track",
  "page",
  "spend",
  "sells",
] as const;
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const FIRST_KEY = "ms_first_touch";
const LAST_KEY = "ms_last_touch";
const FIRST_TTL_DAYS = 90;
const SITE_HOSTS = ["muneebsyed29.com", "www.muneebsyed29.com", "muneeb.in", "www.muneeb.in"];

const SEARCH_ENGINES: Record<string, string> = {
  google: "google",
  bing: "bing",
  duckduckgo: "duckduckgo",
  yahoo: "yahoo",
  ecosia: "ecosia",
  yandex: "yandex",
  baidu: "baidu",
};
const SOCIAL: Record<string, string> = {
  "linkedin.com": "linkedin",
  "lnkd.in": "linkedin",
  "t.co": "x",
  "x.com": "x",
  "twitter.com": "x",
  "facebook.com": "facebook",
  "fb.com": "facebook",
  "instagram.com": "instagram",
  "youtube.com": "youtube",
  "reddit.com": "reddit",
  "whatsapp.com": "whatsapp",
  "wa.me": "whatsapp",
};
/* AI assistants now send real visits; worth seeing them by name. */
const AI: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
};
const CLICK_IDS: Record<string, string> = {
  gclid: "google",
  gbraid: "google",
  wbraid: "google",
  fbclid: "facebook",
  li_fat_id: "linkedin",
  msclkid: "bing",
  ttclid: "tiktok",
};

function storage(kind: "local" | "session"): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function read(kind: "local" | "session", key: string): Touch | null {
  try {
    const raw = storage(kind)?.getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

function write(kind: "local" | "session", key: string, touch: Touch) {
  try {
    storage(kind)?.setItem(key, JSON.stringify(touch));
  } catch {
    /* Private mode or blocked storage: attribution just stays per page. */
  }
}

function matchHost(host: string, table: Record<string, string>) {
  const entry = Object.entries(table).find(([domain]) => host === domain || host.endsWith(`.${domain}`));
  return entry?.[1];
}

/* What brought this page view, or null when it's an internal hop. */
function touchFromLocation(): Touch | null {
  const url = new URL(window.location.href);
  const q = url.searchParams;
  const landing = url.pathname;
  const at = new Date().toISOString();
  const src = q.get("src") ?? undefined;

  const clickParam = Object.keys(CLICK_IDS).find((k) => q.has(k));
  const utmSource = q.get("utm_source");
  if (utmSource || clickParam) {
    return {
      source: utmSource ?? CLICK_IDS[clickParam!],
      medium: q.get("utm_medium") ?? (clickParam ? "cpc" : "referral"),
      campaign: q.get("utm_campaign") ?? undefined,
      term: q.get("utm_term") ?? undefined,
      content: q.get("utm_content") ?? undefined,
      click_id: clickParam,
      src,
      landing,
      referrer: document.referrer || undefined,
      at,
    };
  }

  let refHost = "";
  try {
    refHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
  } catch {
    refHost = "";
  }
  const here = window.location.hostname.replace(/^www\./, "");
  if (refHost && (refHost === here || SITE_HOSTS.some((h) => h.replace(/^www\./, "") === refHost))) return null;

  if (refHost) {
    const ai = matchHost(refHost, AI);
    if (ai) return { source: ai, medium: "ai", src, landing, referrer: refHost, at };
    const engine = Object.entries(SEARCH_ENGINES).find(([name]) => refHost.split(".").includes(name))?.[1];
    if (engine) return { source: engine, medium: "organic", src, landing, referrer: refHost, at };
    const social = matchHost(refHost, SOCIAL);
    if (social) return { source: social, medium: "social", src, landing, referrer: refHost, at };
    return { source: refHost, medium: "referral", src, landing, referrer: refHost, at };
  }

  return { source: "direct", medium: "none", src, landing, at };
}

/* Runs on every page load. Records first and last touch. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const touch = touchFromLocation();

  const first = read("local", FIRST_KEY);
  const expired = first && Date.now() - Date.parse(first.at) > FIRST_TTL_DAYS * 864e5;
  if (touch && (!first || expired)) write("local", FIRST_KEY, touch);

  const last = read("session", LAST_KEY);
  /* A direct hop never replaces a known source within the same visit. */
  if (touch && (!last || touch.source !== "direct")) write("session", LAST_KEY, touch);
}

export function getAttribution() {
  if (typeof window === "undefined") return { first: null, last: null };
  const first = read("local", FIRST_KEY);
  const last = read("session", LAST_KEY) ?? first;
  return { first, last };
}

/* "google / organic" style label, the way GA4 shows source / medium. */
export function touchLabel(touch: Touch | null) {
  if (!touch) return "unknown";
  const campaign = touch.campaign ? ` (${touch.campaign})` : "";
  return `${touch.source} / ${touch.medium}${campaign}`;
}

/* Attribution fields attached to lead events and lead payloads. */
export function leadContext(): Params {
  const { first, last } = getAttribution();
  return {
    lead_source: touchLabel(last),
    first_source: touchLabel(first),
    landing_page: last?.landing ?? first?.landing,
    first_seen: first?.at?.slice(0, 10),
    src: last?.src ?? first?.src,
  };
}

/* Push one event to the dataLayer. GTM picks it up by name. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") clean[k] = v;
  /* GTM merges every push into one data model, so a parameter from an earlier
     event would otherwise ride along on this one. Clear them all first. */
  w.dataLayer.push(Object.fromEntries(EVENT_PARAMS.map((k) => [k, undefined])));
  w.dataLayer.push({ event, page_path: window.location.pathname, ...clean });
}

/*
 * Query parameters for the Cal.com booking link. Cal.com stores the standard
 * UTM fields on every booking, so each booking shows where the person came
 * from. Visits without UTMs get them filled from the referrer (google /
 * organic, linkedin / social, direct / none). `cta` and `landing` only show up
 * if matching hidden booking questions exist (see docs/analytics.md).
 */
export function bookingParams(location: string): Record<string, string> {
  const { first, last } = getAttribution();
  const touch = last ?? first;
  const params: Record<string, string> = {
    utm_source: touch?.source ?? "direct",
    utm_medium: touch?.medium ?? "none",
    utm_campaign: touch?.campaign ?? "website",
    utm_content: `${location} · ${window.location.pathname}`,
    cta: location,
    landing: touch?.landing ?? window.location.pathname,
    first_source: touchLabel(first),
  };
  if (touch?.term) params.utm_term = touch.term;
  if (touch?.src) params.src = touch.src;
  return params;
}

export function withParams(url: string, params: Record<string, string>) {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.toString();
}
