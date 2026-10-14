import type { Industry, Market } from "./case-studies";

/*
 * Highlights: real work where what can be said is scale, channels or one
 * headline number, not a full problem-to-result story. They show on /work
 * as cards rather than as their own pages, so Google never sees a thin page.
 * Sources: Muneeb's CV and LinkedIn profile.
 */
export type Highlight = {
  client: string;
  industry: Industry;
  markets: Market[];
  context: string;
  period: string;
  value: string;
  label: string;
  line: string;
};

export const highlights: Highlight[] = [
  {
    client: "VWO, Lightyear, WeWork India, Datamoon, Time Doctor",
    industry: "B2B and SaaS",
    markets: ["US", "India", "Europe"],
    context: "At TripleDart",
    period: "2026 to now",
    value: "Now",
    label: "B2B SaaS pipeline",
    line: "Running AI-native paid media that builds predictable pipeline for five B2B SaaS teams.",
  },
  {
    client: "Creative Planning",
    industry: "Finance",
    markets: ["US"],
    context: "At GALE Partners",
    period: "2024 to 2026",
    value: "$11M+",
    label: "AUM from $90K in ad spend",
    line: "Full-funnel ABM on Meta and LinkedIn for a US wealth management firm.",
  },
  {
    client: "MoneyLion",
    industry: "Finance",
    markets: ["US"],
    context: "At GALE Partners",
    period: "2024 to 2026",
    value: "2.7x",
    label: "ROAS on a $3M budget",
    line: "App promotion for a US fintech app.",
  },
  {
    client: "Rocket Software",
    industry: "B2B and SaaS",
    markets: ["US"],
    context: "At GALE Partners",
    period: "2024 to 2026",
    value: "ABM",
    label: "Meta and LinkedIn",
    line: "Full-funnel ABM reaching buying committees through account lists and CRM-based audiences.",
  },
  {
    client: "Enercare",
    industry: "Enterprise",
    markets: ["Canada"],
    context: "At GALE Partners",
    period: "2024 to 2026",
    value: "$2.8M",
    label: "Paid social budget",
    line: "Made Meta and TikTok core acquisition channels, with consistent, scalable lead flow.",
  },
  {
    client: "Planet Fitness",
    industry: "Enterprise",
    markets: ["US"],
    context: "At Zeta Global",
    period: "2023 to 2024",
    value: "$2M+",
    label: "Paid social budget",
    line: "Meta, TikTok and Snapchat for a US gym chain: creative delivery, pacing and KPIs.",
  },
  {
    client: "Universal Robots",
    industry: "Enterprise",
    markets: ["India"],
    context: "At Growth Hackers Digital",
    period: "2022 to 2023",
    value: "India",
    label: "Market localisation",
    line: "Built performance strategy and localised campaigns for the Indian market for the global cobot leader.",
  },
];
