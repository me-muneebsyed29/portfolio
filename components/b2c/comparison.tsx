"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { B2CSection, B2CEyebrow, B2CTitle } from "@/components/b2c/section";
import { comparison, comparisonColumns } from "@/data/b2c/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function B2CComparison() {
  return (
    <B2CSection>
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <B2CEyebrow>The alternatives</B2CEyebrow>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl">
          <B2CTitle>What you give up when you hire the other options.</B2CTitle>
        </motion.div>

        {/* Wide table scrolls inside itself rather than pushing the page sideways. */}
        <motion.div variants={fadeUp} className="mt-14 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="w-[36%] py-4 pr-6" />
                {comparisonColumns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(
                      "font-mono-ui px-4 py-4 text-[11px] font-medium uppercase tracking-[0.12em]",
                      col.key === "me" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.criterion} className="border-b border-border">
                  <th
                    scope="row"
                    className="py-4 pr-6 text-[15px] font-normal text-pretty text-foreground/90"
                  >
                    {row.criterion}
                  </th>
                  {comparisonColumns.map((col) => {
                    const value = row[col.key];
                    return (
                      <td key={col.key} className="px-4 py-4">
                        {value ? (
                          <>
                            <Check
                              aria-hidden
                              className={cn(
                                "size-4",
                                col.key === "me" ? "text-primary" : "text-foreground/50"
                              )}
                              strokeWidth={2.5}
                            />
                            <span className="sr-only">Yes</span>
                          </>
                        ) : (
                          <>
                            <Minus aria-hidden className="size-4 text-muted-foreground/40" />
                            <span className="sr-only">No</span>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </B2CSection>
  );
}
