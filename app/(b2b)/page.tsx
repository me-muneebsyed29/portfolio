import { Hero } from "@/components/sections/hero";
import { Wins } from "@/components/sections/wins";
import { Companies } from "@/components/sections/companies";
import { Philosophy } from "@/components/sections/philosophy";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { AiLab } from "@/components/sections/ai-lab";
import { Writing } from "@/components/sections/writing";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { GlassSheet } from "@/components/sky/glass-sheet";
import { NatureFinale } from "@/components/sky/nature-finale";

export default function Home() {
  return (
    <>
      <Hero />
      <GlassSheet>
        <Wins />
        <Companies />
        <Philosophy />
        <CaseStudies />
        <Testimonials />
        <AiLab />
        <Writing />
        <About />
      </GlassSheet>
      <NatureFinale>
        <Contact />
      </NatureFinale>
    </>
  );
}
