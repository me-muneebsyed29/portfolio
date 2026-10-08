"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SkySection, SectionHead } from "@/components/sky/sky-section";
import { PlatformLogo } from "@/components/brand/platform-logos";
import { labProjects, type LabProject } from "@/data/ai-lab";
import { toolGroups } from "@/data/companies";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The lab and the stack: proof of building, not just buying. Five small
 * tool cards with status chips, then a slim strip of the tools flown with,
 * in three lanes. The stack sits here rather than under the hero because two
 * logo strips back to back blur together, and tools read better next to
 * things that were built with them.
 *
 * Phones: the lab becomes compact rows that expand to the one-liner on tap,
 * and the stack becomes a single slowly scrolling lane with no labels.
 */
function Status({ status }: { status: LabProject["status"] }) {
  return (
    <span
      className={cn(
        "caps-label w-fit shrink-0 self-start rounded-full px-2.5 py-1",
        status === "Testing" ? "bg-primary/10 text-cadmium-sm" : "bg-[#ffd84d]/45 text-[#5c4500]"
      )}
    >
      {status}
    </span>
  );
}

export function Lab() {
  const allTools = toolGroups.flatMap((g) => g.tools);
  return (
    <SkySection id="lab" note="half of these will break. that’s the point.">
      <SectionHead
        title="Things I’m building."
        sub="Small AI tools I build to find out where AI actually changes the work. Some ship. Some don’t."
      />

      {/* Desktop cards. */}
      <motion.ul
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-5"
      >
        {labProjects.map((project) => (
          <motion.li key={project.name} variants={fadeUp} className="glass-card flex flex-col rounded-2xl p-5">
            <Status status={project.status} />
            <h3 className="mt-4 text-lg leading-tight font-bold tracking-[-0.02em] text-foreground">{project.name}</h3>
            <p className="mt-2 text-caption text-muted-foreground text-pretty">{project.oneLiner}</p>
          </motion.li>
        ))}
      </motion.ul>

      {/* Phone rows. */}
      <ul className="mt-8 flex flex-col gap-2 md:hidden">
        {labProjects.map((project) => (
          <li key={project.name}>
            <details className="glass-card group rounded-2xl px-4 py-3.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span className="font-bold tracking-[-0.02em] text-foreground">{project.name}</span>
                <span className="flex items-center gap-2">
                  <Status status={project.status} />
                  <ChevronDown className="size-4 text-faint transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="mt-2 text-caption text-muted-foreground">{project.oneLiner}</p>
            </details>
          </li>
        ))}
      </ul>

      {/* The stack. */}
      <div className="mt-12 border-t border-rule pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">The stack I fly with</h3>
          <p className="font-hand text-[1.3rem] leading-none text-muted-foreground">
            the tools matter less than the order you use them in
          </p>
        </div>

        <div className="mt-6 hidden flex-col gap-4 md:flex">
          {toolGroups.map((group) => (
            <div key={group.label} className="grid grid-cols-12 items-center gap-x-6">
              <p className="caps-label col-span-2 text-faint">{group.label}</p>
              <ul className="col-span-10 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool.id}
                    className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
                  >
                    <PlatformLogo id={tool.id} className="size-4 shrink-0" />
                    <span className="text-caption font-medium">{tool.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="-mx-6 mt-5 overflow-hidden sm:-mx-10 md:hidden">
          <ul className="brand-marquee flex w-max gap-2 pr-2 [animation-duration:70s]">
            {[...allTools, ...allTools].map((tool, i) => (
              <li
                key={`${tool.id}-${i}`}
                aria-hidden={i >= allTools.length || undefined}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-muted-foreground"
              >
                <PlatformLogo id={tool.id} className="size-4 shrink-0" />
                <span className="text-caption font-medium whitespace-nowrap">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SkySection>
  );
}
