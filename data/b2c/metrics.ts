/**
 * Headline metrics. Every figure here traces to a specific engagement — see
 * `data/b2c/case-studies.ts` for the account each one came from. Keep it that
 * way: no blended or estimated numbers in this file.
 */
export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const metrics: Metric[] = [
  {
    value: 3,
    suffix: "x",
    label: "ROAS on a $12M account",
    detail:
      "Took Pella's US and Canada paid social from negative ROAS to 3x after a full account restructure.",
  },
  {
    value: 85,
    prefix: "−",
    suffix: "%",
    label: "Cost per lead",
    detail:
      "Same account: lead cost fell from $1,300 to $200 through restructuring, audience quality and cost caps.",
  },
  {
    value: 30,
    prefix: "€4K → €",
    suffix: "K/mo",
    label: "Spend scaled",
    detail:
      "Grew JetLearn's Google Ads 7x month over month while cutting acquisition cost by 65%.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Accounts ROAS-positive",
    detail:
      "Share of the accounts I've managed that delivered positive return on ad spend.",
  },
];

/** Consumer brands only — B2B accounts live on muneebsyed29.com. */
export const brands: { name: string; note: string }[] = [
  { name: "Pella", note: "Home improvement · US & CA" },
  { name: "Enercare", note: "Home services · CA" },
  { name: "MoneyLion", note: "Consumer fintech · US" },
  { name: "Planet Fitness", note: "Fitness · US" },
  { name: "Blue Compass RV", note: "Retail · US" },
  { name: "JetLearn", note: "EdTech · EU" },
  { name: "Yoro News", note: "Consumer app · IN" },
];
