import { caseStudies } from "@/data/case-studies";
import { ogSize, studioOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Muneeb Syed";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug) ?? caseStudies[0];
  const [lead] = study.metrics;
  return studioOgImage({
    kicker: `${study.client} · ${study.tag}`,
    title: study.headline,
    aside: ["the receipts"],
    tile: { value: lead.value, label: lead.label },
  });
}
