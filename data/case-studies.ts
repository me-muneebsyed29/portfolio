/*
 * The three case studies. Clients stay anonymous until they can be named; when
 * one can, put the brand in `client` and the card and story page pick it up.
 *
 * Card copy (tag, headline, oneLine, metrics) is what the homepage shows. The
 * story page follows the template from the sky direction doc: setup, what was
 * broken, what I changed, what moved, and an optional lesson that renders as
 * a handwritten note. Every fact here comes from the original write-ups;
 * nothing was added to fill a section.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  tag: string;
  headline: string;
  oneLine: string;
  /* Two metrics, the first is the accent and the one on the sticky note. */
  metrics: { value: string; label: string }[];
  setup: string;
  broken: string[];
  changed: string[];
  moved: string;
  /* One lesson, in Muneeb's words. Left out until he writes it. */
  lesson?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "devtools-saas-cac",
    client: "Series B DevTools SaaS",
    tag: "Paid media · Testing",
    headline: "CAC down 65%. Trials held steady.",
    oneLine: "Rebuilt the creative testing engine and cut the audiences that were burning money.",
    metrics: [
      { value: "-65%", label: "CAC" },
      { value: "Steady", label: "Trial volume" },
    ],
    setup:
      "A Series B developer tools company buying product trials on Meta and LinkedIn, and scaling that spend quarter on quarter.",
    broken: [
      "CAC had crept up three quarters in a row.",
      "Spend grew with no structured way to test creative or audiences.",
      "Every campaign was a one-off, so nothing compounded.",
    ],
    changed: [
      "Rebuilt the account around a creative testing framework with clear statistical thresholds.",
      "Set a weekly experiment cadence across hooks, formats and landing pages.",
      "Shipped 40+ creative variants across Meta and LinkedIn in the first quarter.",
      "Built a small AI pipeline to write and score ad copy before it reached spend.",
      "Moved budget from broad prospecting to retargeting and lookalikes built on product usage data.",
      "Tied ad-level spend to trial activation, not clicks.",
    ],
    moved:
      "CAC fell 65% over two quarters while trial volume held steady. That freed budget to put back into the channels that were actually compounding.",
  },
  {
    slug: "vertical-saas-scale",
    client: "Vertical SaaS scale-up",
    tag: "Paid media · Systems",
    headline: "€4K to €30K a month, and more efficient at the end.",
    oneLine: "Scaled monthly spend 7x while revenue efficiency climbed 40%.",
    metrics: [
      { value: "7x", label: "Spend" },
      { value: "+40%", label: "Revenue efficiency" },
    ],
    setup:
      "A post-seed vertical SaaS company with proof that paid media worked at about €4K a month.",
    broken: [
      "Paid media worked on a small budget, but there was no system for scaling it.",
      "Pushing budget up risked efficiency collapsing, the usual wall after seed.",
    ],
    changed: [
      "Modelled unit economics first: payback period, LTV and sales cycle by segment.",
      "Raised budget against measured saturation signals, not a fixed monthly target.",
      "Added an AI-assisted buying workflow that moved budget across channels daily.",
      "Scaled spend across Google and LinkedIn over nine months in tested steps.",
      "Built channel dashboards the founder could read in under a minute.",
      "Ran incrementality tests to separate real lift from attribution noise.",
    ],
    moved:
      "Monthly spend went from €4K to €30K over nine months, and revenue efficiency improved 40% instead of collapsing.",
  },
  {
    slug: "enterprise-abm",
    client: "Enterprise fintech",
    tag: "ABM · Enterprise",
    headline: "Account-based marketing at enterprise scale.",
    oneLine: "Built and ran the ABM program across a $25M+ media budget.",
    metrics: [
      { value: "$25M+", label: "Budget" },
      { value: "Full ABM", label: "Program" },
    ],
    setup:
      "An enterprise fintech company with long, multi-threaded sales cycles and a $25M+ media budget across Google, Meta and LinkedIn.",
    broken: [
      "Marketing ran demand gen as if every lead were self-serve.",
      "That created volume without pipeline quality.",
      "Marketing and sales scored leads against different definitions.",
    ],
    changed: [
      "Segmented target accounts by deal size and buying-committee complexity.",
      "Designed one ABM motion across LinkedIn, programmatic display and direct outreach triggers.",
      "Replaced separate MQL and SQL definitions with one shared account score.",
      "Built account-level reporting that sales leadership used in pipeline reviews.",
      "Reviewed account tiers every quarter and moved spend toward real buying intent.",
    ],
    moved:
      "The program became the template for enterprise GTM across the company, and marketing-sourced pipeline in target accounts became a standing line in QBRs.",
  },
];
