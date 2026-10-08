import { ogSize, skyOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Field notes by Muneeb Syed";

export default function WritingOgImage() {
  return skyOgImage({
    kicker: "Field notes · Muneeb Syed",
    title: "Short essays on paid media, growth and AI.",
    chalk: ["strong opinions,", "loosely held"],
  });
}
