import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { MoreWork } from "@/components/sections/related";
import { NatureFinale } from "@/components/sky/nature-finale";
import { JsonLd, breadcrumbs, caseStudySchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.headline,
    description: study.oneLine,
    /* Self-referencing canonical; see the note in writing/[slug]/page.tsx. */
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  return (
    <>
      <JsonLd data={caseStudySchema(caseStudies[index])} />
      <JsonLd
        data={breadcrumbs([{ name: caseStudies[index].headline, path: `/work/${caseStudies[index].slug}` }])}
      />
      <CaseStudyDetail study={caseStudies[index]} />
      <MoreWork exclude={caseStudies[index].slug} />
      <NatureFinale />
    </>
  );
}
