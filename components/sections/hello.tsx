"use client";

import { motion } from "framer-motion";
import { StudioSection } from "@/components/studio/section";
import { CertBadges } from "@/components/studio/badges";
import { RevealWords } from "@/components/studio/motion-text";
import { career } from "@/data/credentials";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const tags = ["Builder", "Growth operator", "Father", "Bengaluru"];

/*
 * Hi, I'm Muneeb: the warm-up right before the ask. A big serif hello on the
 * left with the bio and tags; on the right, where the work happened, as a
 * ruled timeline, and the certifications. On phones the bio is cut to its
 * first two sentences plus the dad line.
 */
export function Hello() {
  return (
    <StudioSection id="about" index="07" label="About" note="that’s me, minus the suit">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="self-start lg:sticky lg:top-28 lg:col-span-7"
        >
          <h2 className="font-display text-[3.4rem] leading-[0.95] text-foreground md:text-[5.5rem]">
            <RevealWords text="Hi, I’m Muneeb." emphasis={1} inView />
          </h2>
          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-body text-muted-foreground text-pretty md:text-[1.15rem]">
            I’m a growth operator in Bengaluru. I’ve spent more than five years running paid media for B2B SaaS,
            enterprise and consumer brands across the US, Canada, Europe and India.
            <span className="hidden md:inline">
              {" "}
              I like systems, product design, and building small tools with AI.
            </span>{" "}
            I’m also a dad, which has taught me more about patience than any attribution model.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="caps-label rounded-full bg-[#2c2c2c] px-3.5 py-2 text-foreground">
                {tag}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="lg:col-span-5"
        >
          {/* Where the work happened, newest first. */}
          <p className="caps-label text-faint">Career</p>
          <ol className="mt-4 border-t border-border">
            {career.map((job, i) => (
              <motion.li
                key={job.org}
                variants={fadeUp}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-border py-4"
              >
                <div>
                  <p className={i === 0 ? "font-display text-[1.5rem] leading-tight text-primary" : "font-display text-[1.5rem] leading-tight text-foreground"}>
                    {job.org}
                  </p>
                  <p className="mt-1 text-caption text-muted-foreground">{job.role}</p>
                </div>
                <p className="figures text-caption whitespace-nowrap text-faint">{job.period}</p>
              </motion.li>
            ))}
          </ol>

          <motion.div variants={fadeUp} className="mt-10">
            <p className="caps-label text-faint">Certified</p>
            <CertBadges withIds className="mt-4" />
          </motion.div>
        </motion.div>
      </div>
    </StudioSection>
  );
}
