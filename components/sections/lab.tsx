"use client";

import { motion } from "framer-motion";
import { StudioSection, SectionHead, Aside } from "@/components/studio/section";
import { PlatformLogo } from "@/components/brand/platform-logos";
import { labProjects, type LabProject } from "@/data/ai-lab";
import { toolGroups } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The lab and the stack: proof of building, not just buying. The lab is a
 * ruled index of five small tools, each row lighting up on hover. Then a
 * slim strip of the tools flown with, in three lanes. On phones the stack
 * becomes a single slowly scrolling lane with no labels.
 */
function Status({ status }: { status: LabProject["status"] }) {
  return (
    <span
      className={cn(
        "caps-label inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1.5",
        status === "Testing" ? "border border-primary/40 text-primary" : "bg-[#2c2c2c] text-muted-foreground"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "Testing" ? "animate-pulse bg-primary" : "bg-[#4a4a4a]"
        )}
      />
      {status}
    </span>
  );
}

export function Lab() {
  const allTools = toolGroups.flatMap((g) => g.tools);
  return (
    <StudioSection id="lab" index="05" label="The lab" note="half of these will break. that’s the point.">
      <SectionHead
        title={
          <>
            Things I’m <span className="em-taupe">building.</span>
          </>
        }
        sub="Small AI tools I build to find out where AI actually changes the work. Some ship. Some don’t."
      />

      <motion.ul
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 border-t border-border md:mt-20"
      >
        {labProjects.map((project, i) => (
          <motion.li
            key={project.name}
            variants={fadeUp}
            className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-border py-6 transition-colors duration-500 hover:bg-card md:grid-cols-12 md:items-center md:gap-x-8 md:px-4 md:py-8"
          >
            <span className="figures caps-label text-faint transition-colors group-hover:text-primary md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[1.9rem] leading-none text-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-4 md:text-[2.4rem] md:group-hover:translate-x-2">
              {project.name}
            </h3>
            <p className="col-start-2 text-body text-muted-foreground md:col-span-5 md:col-start-auto">{project.oneLiner}</p>
            <div className="col-start-2 md:col-span-2 md:col-start-auto md:justify-self-end">
              <Status status={project.status} />
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* The stack. */}
      <div className="mt-20 md:mt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-display text-[2rem] leading-none text-foreground md:text-[2.5rem]">The stack I fly with</h3>
          <Aside>the tools matter less than the order you use them in</Aside>
        </div>

        <div className="mt-10 hidden flex-col md:flex">
          {toolGroups.map((group) => (
            <div key={group.label} className="grid grid-cols-12 items-center gap-x-8 border-t border-border py-5">
              <p className="caps-label col-span-2 text-faint">{group.label}</p>
              <ul className="col-span-10 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool.id}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-foreground"
                  >
                    <PlatformLogo id={tool.id} className="size-4 shrink-0" />
                    <span className="text-caption">{tool.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="marquee-mask -mx-6 mt-8 overflow-hidden md:hidden">
          <ul className="marquee-track flex w-max gap-2 pr-2 [animation-duration:70s]">
            {[...allTools, ...allTools].map((tool, i) => (
              <li
                key={`${tool.id}-${i}`}
                aria-hidden={i >= allTools.length || undefined}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-muted-foreground"
              >
                <PlatformLogo id={tool.id} className="size-4 shrink-0" />
                <span className="text-caption whitespace-nowrap">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StudioSection>
  );
}
