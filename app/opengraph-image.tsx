import { siteConfig } from "@/lib/site-config";
import { ogSize, studioOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function OpengraphImage() {
  return studioOgImage({
    kicker: "Growth operator for B2B SaaS · Bengaluru",
    title: "I turn ad spend into pipeline you can plan around.",
    highlight: "around.",
    aside: ["more pipeline,", "less BS."],
  });
}
