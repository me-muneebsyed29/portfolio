export type Win = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  /* Brand sheet 01 / COLOR: cadmium is "the single number that matters", one per
     frame. Exactly one win in this list may carry it. */
  accent?: boolean;
};

export const wins: Win[] = [
  {
    value: 65,
    suffix: "%",
    label: "Reduced CAC",
    detail: "Cut customer acquisition cost through creative testing and audience refinement.",
    accent: true,
  },
  {
    /* Stated as a multiple rather than "€4K → €30K": the forbidden list rules
       out arrows, and the brand sheet sets deltas as figures like "4.2×". */
    value: 7,
    suffix: "×",
    label: "Spend scaled",
    detail:
      "Grew monthly paid media investment from €4K to €30K while holding efficiency targets.",
  },
  {
    value: 25,
    prefix: "$",
    suffix: "M+",
    label: "Media managed",
    detail: "Cumulative budget managed across Google, Meta, and LinkedIn for B2B SaaS clients.",
  },
  {
    value: 40,
    suffix: "%",
    label: "Revenue efficiency",
    detail: "Improved pipeline-to-revenue efficiency through full-funnel optimization.",
  },
];
