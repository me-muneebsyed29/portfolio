"use client";

import { motion } from "framer-motion";
import { StudioSection, SectionHead, ArrowLink } from "@/components/studio/section";
import { CaseCard } from "@/components/sections/case-card";
import { caseStudies, featuredCaseStudies } from "@/data/case-studies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/*
 * The receipts on the homepage: the three featured studies, one per market
 * that matters most (US enterprise, Europe, US EdTech). Phones get a swipe
 * carousel at 85% width so the next card peeks. Everything else lives on
 * /work.
 */
export function Work() {
  return (
    <StudioSection id="work" index="02" label="Selected work" note="the why is inside">
      <SectionHead
        title={
          <>
            The <span className="em-taupe">receipts.</span>
          </>
        }
        sub="What was broken, what I changed, what moved."
      >
        <ArrowLink href="/work">All {caseStudies.length} case studies</ArrowLink>
      </SectionHead>

      <motion.ul
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:mt-16 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {featuredCaseStudies.map((study) => (
          <motion.li key={study.slug} variants={fadeUp} className="w-[85%] shrink-0 snap-start md:w-auto">
            <CaseCard study={study} />
          </motion.li>
        ))}
      </motion.ul>
    </StudioSection>
  );
}
