// Placeholder case studies structured for easy real-content swaps later —
// replace `client`, `logo`, copy, and `metrics` with confirmed details/screenshots per engagement.
export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  summary: string;
  problem: string;
  approach: string[];
  execution: string[];
  outcome: string;
  metrics: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "devtools-saas-cac",
    client: "Series B DevTools SaaS",
    category: "Paid Media · Experimentation",
    summary: "Cut CAC by 65% by rebuilding the creative testing engine and pruning underperforming audiences.",
    problem:
      "CAC had crept up 3 quarters in a row as the team scaled spend without a structured way to test creative or audiences. Every campaign was a one-off; nothing compounded.",
    approach: [
      "Rebuilt the account structure around a creative-testing framework with clear statistical thresholds.",
      "Introduced a weekly experiment cadence across hooks, formats, and landing pages.",
      "Shifted budget from broad prospecting to intent-rich retargeting and lookalikes informed by product usage data.",
    ],
    execution: [
      "Shipped 40+ creative variants across Meta and LinkedIn in the first quarter.",
      "Built a lightweight AI pipeline to generate and score ad copy variants before they reached spend.",
      "Instrumented attribution to tie ad-level spend to trial activation, not just clicks.",
    ],
    outcome:
      "CAC dropped 65% over two quarters while trial volume held steady, freeing budget to reinvest into the channels that were actually compounding.",
    metrics: [
      { label: "CAC", value: "-65%" },
      { label: "Trial volume", value: "steady" },
      { label: "Time to result", value: "2 quarters" },
    ],
  },
  {
    slug: "vertical-saas-scale",
    client: "Vertical SaaS Scale-up",
    category: "Paid Media · Growth Systems",
    summary: "Scaled monthly spend from €4K to €30K while improving revenue efficiency by 40%.",
    problem:
      "The company had proof paid media worked at a small budget but no system for scaling it without efficiency collapsing — a common wall for post-seed SaaS.",
    approach: [
      "Modeled unit economics first: payback period, LTV, and sales cycle by segment.",
      "Sequenced budget increases against measurable saturation signals, not a fixed monthly target.",
      "Layered in an AI-assisted media buying workflow to reallocate budget across channels daily.",
    ],
    execution: [
      "Scaled spend 7x across Google and LinkedIn over 9 months in deliberate, tested increments.",
      "Built channel-level efficiency dashboards the founder could read in under a minute.",
      "Ran continuous incrementality tests to separate genuine lift from attribution noise.",
    ],
    outcome:
      "Spend scaled 7x without efficiency collapsing — revenue efficiency actually improved 40% as the system matured.",
    metrics: [
      { label: "Spend scaled", value: "€4K → €30K/mo" },
      { label: "Revenue efficiency", value: "+40%" },
      { label: "Timeframe", value: "9 months" },
    ],
  },
  {
    slug: "enterprise-abm",
    client: "Enterprise Fintech",
    category: "ABM · Enterprise GTM",
    summary: "Built and ran an account-based marketing program across a $25M+ enterprise media budget.",
    problem:
      "Enterprise sales cycles were long and multi-threaded, but marketing was still running demand gen as if every lead was self-serve — creating volume without pipeline quality.",
    approach: [
      "Segmented target accounts by deal size and buying-committee complexity.",
      "Designed a multi-channel ABM motion combining LinkedIn, programmatic display, and direct outreach triggers.",
      "Aligned marketing and sales on a shared account scoring model instead of separate MQL/SQL definitions.",
    ],
    execution: [
      "Coordinated media execution across Google, Meta, and LinkedIn under one enterprise budget.",
      "Built account-level reporting that sales leadership actually used in pipeline reviews.",
      "Ran quarterly account-tier reviews to reallocate spend toward accounts showing real buying intent.",
    ],
    outcome:
      "The program became the template for enterprise GTM across the org, with marketing-sourced pipeline in target accounts becoming a standing line item in QBRs.",
    metrics: [
      { label: "Media managed", value: "$25M+" },
      { label: "Program", value: "Enterprise ABM" },
      { label: "Channels", value: "Google, Meta, LinkedIn" },
    ],
  },
];
