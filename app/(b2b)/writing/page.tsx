import type { Metadata } from "next";
import { FieldNotesIndex } from "@/components/sections/field-notes";
import { NatureFinale } from "@/components/sky/nature-finale";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbs } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Field notes on B2B paid media and growth",
  description:
    "Short essays by Muneeb Syed on paid media, B2B SaaS growth and AI: how to build ad accounts that compound, test faster and tie spend to revenue.",
  path: "/writing",
});

export default function WritingIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Field notes", path: "/writing" }])} />
      <div className="pt-24 md:pt-28">
        <FieldNotesIndex />
      </div>
      <NatureFinale />
    </>
  );
}
