import { ogSize, skyOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Muneeb Syed, Meta Ads consultant for B2B SaaS and D2C";

/* Avatar, the headline, and one result, as the doc asks. */
export default function MetaAdsOgImage() {
  return skyOgImage({
    kicker: "Meta Ads consultant · Muneeb Syed",
    title: "I run Meta Ads for brands that measure them in sales and pipeline.",
    highlight: "sales and pipeline.",
    chalk: ["Pella: cost per lead $1,300 → $200"],
  });
}
