import { essays } from "@/data/writing";
import { ogSize, skyOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Field note by Muneeb Syed";

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export default async function EssayOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug) ?? essays[0];
  return skyOgImage({
    kicker: `Field note · ${essay.readingTime} read`,
    title: essay.title,
    chalk: ["strong opinions,", "loosely held"],
  });
}
