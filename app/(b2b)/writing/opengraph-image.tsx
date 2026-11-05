import { ogSize, studioOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Field notes by Muneeb Syed";

export default function WritingOgImage() {
  return studioOgImage({
    kicker: "Field notes · Muneeb Syed",
    title: "Short essays on paid media, growth and AI.",
    aside: ["strong opinions,", "loosely held"],
  });
}
