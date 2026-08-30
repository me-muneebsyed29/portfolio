import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/*
 * GA4. This was on the old static site and did not survive the Next.js rebuild,
 * which is why the property stopped receiving data — there was no tag on the
 * page at all, not a misconfiguration inside GA.
 *
 * Production only, so localhost and Vercel preview builds don't pollute the
 * property with traffic that isn't real.
 *
 * `afterInteractive` rather than `beforeInteractive`: analytics has no business
 * blocking first paint, and gtag queues events fired before it loads.
 */
export function Analytics() {
  const id = siteConfig.gaMeasurementId;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
