export type Win = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const wins: Win[] = [
  {
    value: 65,
    suffix: "%",
    label: "Reduced CAC",
    detail: "Cut customer acquisition cost through creative testing and audience refinement.",
  },
  {
    value: 30,
    prefix: "€4K → €",
    suffix: "K/mo",
    label: "Spend scaled",
    detail: "Grew monthly paid media investment 7x while holding efficiency targets.",
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
