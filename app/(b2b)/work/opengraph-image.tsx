import { caseStudies } from "@/data/case-studies";
import { ogSize, skyOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Paid media case studies by Muneeb Syed";

export default function WorkOgImage() {
  return skyOgImage({
    kicker: `${caseStudies.length} case studies · Muneeb Syed`,
    title: "Lower CAC, cheaper leads, higher ROAS.",
    chalk: ["the receipts"],
  });
}
