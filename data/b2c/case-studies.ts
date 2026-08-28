/**
 * Consumer-side engagements only. Narrative is reconstructed from the résumé's
 * stated scope and outcomes — the *numbers* are verbatim, the connective copy is
 * written for the page. Replace `approach` bullets with account specifics as you
 * confirm what's shareable per client.
 */
export type B2CCaseStudy = {
  client: string;
  category: string;
  market: string;
  headline: string;
  problem: string;
  approach: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
};

export const b2cCaseStudies: B2CCaseStudy[] = [
  {
    client: "Pella",
    category: "Home improvement",
    market: "US & Canada",
    headline: "Negative ROAS to 3x on a $12M paid social budget",
    problem:
      "The account had been scaled by adding campaigns rather than rebuilding structure. Lead cost had run up to $1,300 and paid social was net-negative across both markets.",
    approach: [
      "Restructured the account end to end instead of optimising inside a structure that had stopped working.",
      "Rebuilt audience segments for lead quality rather than raw volume.",
      "Moved to cost caps with automated rules driving dynamic bid optimisation, so scaling didn't reset efficiency.",
    ],
    metrics: [
      { label: "Budget managed", value: "$12M" },
      { label: "ROAS", value: "Negative → 3x" },
      { label: "Cost per lead", value: "$1,300 → $200" },
    ],
    featured: true,
  },
  {
    client: "Enercare",
    category: "Home services",
    market: "Canada",
    headline: "Two new core acquisition channels on a $2.8M budget",
    problem:
      "Lead flow leaned on channels that had run out of headroom. Meta and TikTok were unproven for the category and treated as experiments rather than infrastructure.",
    approach: [
      "Built Meta and TikTok from test budgets into core acquisition channels.",
      "Structured campaigns for consistent daily lead volume instead of spiky bursts that sales couldn't staff against.",
      "Held efficiency while volume scaled, so the channels stayed viable at full budget.",
    ],
    metrics: [
      { label: "Budget managed", value: "$2.8M" },
      { label: "Channels established", value: "Meta + TikTok" },
      { label: "Outcome", value: "Scalable lead flow" },
    ],
    featured: true,
  },
  {
    client: "JetLearn",
    category: "Consumer EdTech",
    market: "Europe",
    headline: "€4K to €30K/month with acquisition cost down 65%",
    problem:
      "Google Ads worked at a small budget, but efficiency collapsed on every attempt to scale it — the classic wall for a consumer subscription business.",
    approach: [
      "Scaled spend in tested increments against saturation signals rather than a fixed monthly target.",
      "Rebuilt search structure and the keyword-to-landing-page map.",
      "Ran continuous creative and offer testing so each budget step had something new to spend into.",
    ],
    metrics: [
      { label: "Monthly spend", value: "€4K → €30K" },
      { label: "Acquisition cost", value: "−65%" },
      { label: "Scale", value: "7x" },
    ],
    featured: true,
  },
  {
    client: "MoneyLion",
    category: "Consumer fintech app",
    market: "US",
    headline: "2.7x ROAS across $3M of app promotion",
    problem:
      "App campaigns that generate installs but not paying users — volume that looks like growth and behaves like cost.",
    approach: [
      "Optimised against in-app value events rather than install counts.",
      "Measured through AppsFlyer so spend decisions tracked revenue, not store activity.",
      "Managed pacing and delivery across a $3M budget in a competitive US auction.",
    ],
    metrics: [
      { label: "Budget managed", value: "$3M" },
      { label: "ROAS", value: "2.7x" },
      { label: "Measurement", value: "AppsFlyer" },
    ],
    featured: true,
  },
  {
    client: "Yoro News",
    category: "Consumer app",
    market: "India",
    headline: "Acquisition cost down 85%",
    problem:
      "User acquisition cost had made growth uneconomic — every new cohort cost more than it was worth.",
    approach: [
      "Built Google and Meta acquisition streams aligned to the company's internal targets.",
      "Ran structured experiments on creative and audience to find where cost actually moved.",
    ],
    metrics: [
      { label: "Acquisition cost", value: "−85%" },
      { label: "Channels", value: "Google + Meta" },
    ],
    featured: false,
  },
  {
    client: "US EdTech startup",
    category: "Consumer EdTech",
    market: "US",
    headline: "Cost per lead cut 86%, front of funnel turned profitable",
    problem:
      "Lead cost sat above what the front end of the funnel could carry, so nothing downstream could fix the economics.",
    approach: [
      "Rebuilt targeting and creative around the offer that actually converted.",
      "Pulled cost per lead down far enough that the front end of the funnel paid for itself.",
    ],
    metrics: [
      { label: "Cost per lead", value: "−86%" },
      { label: "Outcome", value: "Front-end profitable" },
    ],
    featured: false,
  },
  {
    client: "Career coaching practice",
    category: "Consumer info-product",
    market: "India",
    headline: "YouTube ROAS from 1–1.5x to a consistent 2–3.3x",
    problem:
      "YouTube ads were running near break-even — enough to justify continuing, never enough to justify scaling.",
    approach: [
      "Took over the account and rebuilt it over a six-month engagement.",
      "Held the improved return consistently rather than in one-off spikes, so revenue and profit both moved.",
    ],
    metrics: [
      { label: "ROAS", value: "1–1.5x → 2–3.3x" },
      { label: "Engagement", value: "6 months" },
    ],
    featured: false,
  },
  {
    client: "Local borewell services",
    category: "Local & call-driven",
    market: "India",
    headline: "#1 SERP ranking and 30x blended ROAS",
    problem:
      "A local services business where the buying decision happens on a phone call, not a checkout page.",
    approach: [
      "Ran paid, organic and call-based ads as one system rather than three separate line items.",
      "Optimised to booked calls, which is where revenue actually lived.",
    ],
    metrics: [
      { label: "Blended ROAS", value: "30x" },
      { label: "Organic", value: "#1 SERP" },
    ],
    featured: false,
  },
];
