import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/work-index";
import { NatureFinale } from "@/components/sky/nature-finale";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbs } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Paid media case studies and results",
  description:
    "Paid media case studies by Muneeb Syed: Pella, JetLearn, iCode School and more. Lower CAC and CPL, higher ROAS, across the US, Canada, Europe and India.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Work", path: "/work" }])} />
      <div className="pt-24 md:pt-28">
        <WorkIndex />
      </div>
      <NatureFinale />
    </>
  );
}
