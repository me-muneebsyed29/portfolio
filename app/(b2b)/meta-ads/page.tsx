import type { Metadata } from "next";
import { MetaHero } from "@/components/meta-ads/hero";
import { Brands } from "@/components/sections/brands";
import { TracksAndCases } from "@/components/meta-ads/tracks";
import {
  Creative,
  Faq,
  Fit,
  Leaks,
  NinetyDays,
  Offers,
  ProofStrip,
  Teaching,
} from "@/components/meta-ads/sections";
import { FinalCta } from "@/components/meta-ads/final-cta";
import { NatureFinale } from "@/components/sky/nature-finale";
import { META_ADS_LIVE, faq, metaBrandRows } from "@/data/meta-ads";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbs } from "@/lib/structured-data";

/*
 * /meta-ads: one job, get a Meta advertiser to book a call. Page order from
 * the "Meta Ads landing page" doc. A path on the main domain rather than a
 * meta.* subdomain: Meta's brand terms rule out its marks in domain names,
 * and a path keeps the SEO value and one GA4 property.
 *
 * Kept out of search until META_ADS_LIVE is flipped (see data/meta-ads.ts).
 */
const base = pageMetadata({
  /* The doc's title, less the " · Muneeb Syed" the root template adds. */
  title: "Meta Ads Consultant for B2B SaaS and D2C",
  description:
    "Facebook and Instagram ads run for sales and pipeline. $20M+ in paid social managed for Pella, Time Doctor and Indian D2C brands.",
  path: "/meta-ads",
});

export const metadata: Metadata = {
  ...base,
  keywords: [
    "Meta ads consultant",
    "Facebook ads consultant India",
    "Meta ads for B2B SaaS",
    "Meta ads freelancer Bengaluru",
  ],
  robots: META_ADS_LIVE ? { index: true, follow: true } : { index: false, follow: true },
};

/* FAQ answers with unfilled [gaps] stay out of the structured data. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq
    .filter((item) => !item.a.includes("["))
    .map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
};

export default function MetaAdsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Meta Ads", path: "/meta-ads" }])} />
      <JsonLd data={faqSchema} />
      <MetaHero />
      <ProofStrip />
      <Brands
        id="accounts"
        rows={metaBrandRows}
        title="Some of the accounts I’ve run"
        sub="Only accounts where I ran Meta or paid social."
      />
      <Leaks />
      <TracksAndCases />
      <Offers />
      <Creative />
      <NinetyDays />
      <Teaching />
      <Fit />
      <Faq />
      <NatureFinale>
        <FinalCta />
      </NatureFinale>
    </>
  );
}
