import { Hero } from "@/components/sections/hero";
import { Wins } from "@/components/sections/wins";
import { Companies } from "@/components/sections/companies";
import { Philosophy } from "@/components/sections/philosophy";
import { CaseStudies } from "@/components/sections/case-studies";
import { AiLab } from "@/components/sections/ai-lab";
import { Writing } from "@/components/sections/writing";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Wins />
      <Companies />
      <Philosophy />
      <CaseStudies />
      <AiLab />
      <Writing />
      <About />
      <Contact />
    </>
  );
}
