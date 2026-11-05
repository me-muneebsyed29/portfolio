import { caseStudies } from "@/data/case-studies";
import { ogSize, studioOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Paid media case studies by Muneeb Syed";

export default function WorkOgImage() {
  return studioOgImage({
    kicker: `${caseStudies.length} case studies · Muneeb Syed`,
    title: "Lower CAC, cheaper leads, higher ROAS.",
    aside: ["the receipts"],
  });
}
