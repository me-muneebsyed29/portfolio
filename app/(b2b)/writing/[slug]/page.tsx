import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { essays } from "@/data/writing";
import { EssayDetail } from "@/components/sections/essay-detail";

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

  return <EssayDetail essay={essays[index]} index={index} />;
}
