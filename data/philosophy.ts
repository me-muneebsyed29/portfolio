import type { FigureId } from "@/components/brand/figures";

export type Belief = {
  title: string;
  body: string;
  /* Each belief carries a marginal figure from the illustration set — the
     measurement being described, not an illustration of the idea. */
  figure: FigureId;
};

export const philosophy: Belief[] = [
  {
    title: "Growth is a system.",
    body: "Channels, creative, pricing, and product are inputs to one machine — not separate departments. Tune them in isolation and you optimize a part while the whole stays broken.",
    figure: "gap",
  },
  {
    title: "AI changes how companies grow.",
    body: "AI collapses the cost of testing, writing, and analysis. The teams that win aren't the ones with the biggest budgets — they're the ones that can learn fastest.",
    figure: "delta",
  },
  {
    title: "Paid media is only one layer.",
    body: "Spend can accelerate a system that already converts. It cannot fix a business model, a weak offer, or a broken funnel — no amount of budget buys product-market fit.",
    figure: "narrowing",
  },
  {
    title: "Optimization starts with business models.",
    body: "Before touching a campaign, I look at unit economics, sales motion, and retention. The growth lever with the highest leverage is rarely the ad account.",
    figure: "one-cell",
  },
];
