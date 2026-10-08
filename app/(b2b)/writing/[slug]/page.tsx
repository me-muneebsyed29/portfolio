import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { essays } from "@/data/writing";
import { EssayDetail } from "@/components/sections/essay-detail";
import { MoreNotes } from "@/components/sections/related";
import { NatureFinale } from "@/components/sky/nature-finale";
import { JsonLd, breadcrumbs, essaySchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) return {};

  return {
    title: essay.title,
    description: essay.excerpt,
    /* Each page names itself as canonical. Inheriting the root layout's
       canonical pointed every essay at the homepage, which tells Google not
       to index it. Relative, so metadataBase makes it absolute. */
    alternates: { canonical: `/writing/${essay.slug}` },
    openGraph: {
      type: "article",
      title: essay.title,
      description: essay.excerpt,
      publishedTime: essay.date,
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = essays.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const essay = essays[index];

  return (
    <>
      <JsonLd data={essaySchema(essay)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Field notes", path: "/writing" },
          { name: essay.title, path: `/writing/${essay.slug}` },
        ])}
      />
      <EssayDetail essay={essay} />
      <MoreNotes exclude={essay.slug} />
      <NatureFinale />
    </>
  );
}
