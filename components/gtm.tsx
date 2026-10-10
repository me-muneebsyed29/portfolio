import { siteConfig } from "@/lib/site-config";

/*
 * Google Tag Manager. Every marketing and analytics tag (GA4, LinkedIn
 * Insight, Meta Pixel, Clarity...) is created and managed inside the GTM
 * container, not in this codebase. That is also why the hardcoded GA4 tag
 * was removed: GA4 now runs as a Google tag inside GTM, and having both
 * would count every visit twice.
 *
 * Only on the live site. VERCEL_ENV is "production" for the domain and
 * "preview" for branch previews, so previews and localhost never send data.
 * (NODE_ENV alone can't tell them apart: previews are production builds.)
 *
 * The snippets are Google's own, unchanged apart from the container ID.
 */
const gtmId = siteConfig.gtmId;
const enabled = Boolean(gtmId) && process.env.VERCEL_ENV === "production";

/* Goes as high in <head> as possible. Plain inline script on purpose: the
   lint rule's suggestion (@next/third-parties) and next/script both load GTM
   after hydration, later than Google intends. Next still places its own
   meta, font and CSS tags first, so this lands after those, as the first
   script in the head. The container itself loads async. */
export function GtmHead() {
  if (!enabled) return null;
  return (
    // eslint-disable-next-line @next/next/next-script-for-ga -- see above
    <script
      id="gtm"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
}

/* Goes immediately after the opening <body> tag, for visitors without
   JavaScript. */
export function GtmNoScript() {
  if (!enabled) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
