import { siteConfig } from "@/lib/site-config";
import { ogSize, skyOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function OpengraphImage() {
  return skyOgImage({
    kicker: "Growth operator for B2B SaaS · Bengaluru",
    title: "I turn ad spend into pipeline you can plan around.",
    highlight: "around.",
    chalk: ["more pipeline,", "less BS :)"],
  });
}
