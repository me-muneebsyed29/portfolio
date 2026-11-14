/*
 * Copy for /meta-ads, from the "Meta Ads landing page: copy and structure"
 * doc. One job: get a Meta advertiser to book a call.
 *
 * Anything in [square brackets] is a gap only Muneeb can fill. The page draws
 * it as a yellow highlight so it can't slip out unnoticed. Fill it in here,
 * then flip META_ADS_LIVE.
 *
 * META_ADS_LIVE gates search indexing, the sitemap entry and the nav link.
 * Leave it false until the "Before launch" checks in the doc are done,
 * especially the TripleDart and agency NDA checks on the client names below.
 *
 * Trademark note: Meta's brand terms rule out its logos and marks as page
 * decoration, so no Meta, Facebook or Instagram logos anywhere on this page.
 * The certification badge is the one exception.
 */
export const META_ADS_LIVE = true;

/*
 * Gaps once live. In draft, [gaps] show as yellow highlights. Once live, any
 * sentence that still holds a gap is dropped, and anything left empty (a
 * price, a list item, an FAQ) disappears. Filling a gap in brings it back,
 * so the page can launch before every answer is in.
 */
const GAP = /\[[^\]]*\]/g;

export function hasGap(text: string) {
  return /\[[^\]]*\]/.test(text);
}

/* What a string shows on the page: itself in draft; in live mode, its
   sentences without gaps, or null when none are left. Gaps are swapped for a
   marker before splitting, so punctuation inside a gap can't split it. */
export function shown(text: string): string | null {
  if (!META_ADS_LIVE || !hasGap(text)) return text;
  const kept = text
    .replace(GAP, "\u0000")
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !sentence.includes("\u0000"))
    .join(" ")
    .trim();
  return kept || null;
}

export type Track = "b2b" | "d2c";

export const hero = {
  chalk: "paid social, done properly :)",
  eyebrow: "Meta Ads consultant · Bengaluru · clients in the US, Canada and India",
  headline: "I run Meta Ads for brands that measure them in sales and pipeline.",
  sub: "I’ve spent five years on Facebook and Instagram ads for Pella, Planet Fitness, Time Doctor and Indian D2C brands like Inara and ModernYard. The biggest budget was $12M. One of the smallest was ₹1.5L, and it booked ₹50L in five months. I work the same way at both ends: fix what Meta learns from, then scale.",
  cert: "Meta Certified Media Buying Professional · ID CF01161622",
  /* Rotates on the sticky note beside the avatar. */
  results: [
    { figure: "$1,300 → $200", line: "Pella’s cost per lead" },
    { figure: "CAC −65%", line: "Datamoon, on Meta" },
    { figure: "₹58L", line: "ModernYard, in 3.5 months" },
  ],
};

export const proofStats: { figure: string; label: string; accent?: boolean }[] = [
  { figure: "$20M+", label: "in paid social budgets I’ve managed", accent: true },
  { figure: "$1,300 → $200", label: "Pella’s cost per lead, US and Canada" },
  { figure: "65% lower", label: "Datamoon’s CAC on Meta" },
  { figure: "₹58L", label: "ModernYard’s sales in 3.5 months" },
];

/* Only brands where Muneeb ran Meta or paid social. The Google Ads clients
   (JetLearn, iCodeSchool, Canada Masq, Wingify, Lightyear) stay on the main
   site. `caseStudy` links to an existing /work page. */
export const metaBrandRows: { slug: string; name: string; site: string; note: string; caseStudy?: string }[][] = [
  [
    { slug: "pella", name: "Pella", site: "pella.com", note: "Paid social · US and Canada · $12M", caseStudy: "pella" },
    { slug: "planet-fitness", name: "Planet Fitness", site: "planetfitness.com", note: "Paid social · US · $2M+" },
    { slug: "enercare", name: "Enercare", site: "enercare.ca", note: "Meta and TikTok leads · Canada · $2.8M" },
    { slug: "moneylion", name: "MoneyLion", site: "moneylion.com", note: "App installs · US · 2.7x ROAS" },
    { slug: "creative-planning", name: "Creative Planning", site: "creativeplanning.com", note: "B2B ABM on Meta and LinkedIn · US" },
    { slug: "rocket-software", name: "Rocket Software", site: "rocketsoftware.com", note: "B2B ABM on Meta and LinkedIn · US" },
  ],
  [
    { slug: "blue-compass-rv", name: "Blue Compass RV", site: "bluecompassrv.com", note: "Paid social · US" },
    { slug: "time-doctor", name: "Time Doctor", site: "timedoctor.com", note: "Meta for demos and signups · B2B SaaS" },
    { slug: "datamoon", name: "Datamoon", site: "datamoon.com", note: "Meta lead gen · CAC down 65%" },
    { slug: "coram", name: "Coram", site: "coram.ai", note: "Meta as a growth channel" },
    { slug: "yoro-news", name: "Yoro News", site: "yoronews.com", note: "News app · CAC down 85%" },
  ],
  [
    { slug: "slow-living-stays", name: "Slow Living Stays", site: "slowlivingstays.com", note: "Launched online · ₹50L bookings in 5 months", caseStudy: "slow-living-stays" },
    { slug: "inara", name: "Inara", site: "inara.store", note: "Premium decor · ₹27.6L sales · 3x ROAS", caseStudy: "inara" },
    { slug: "modern-yard", name: "ModernYard", site: "modernyard.in", note: "Home decor · ₹58L in 3.5 months", caseStudy: "modernyard" },
    { slug: "home-artisan", name: "Home Artisan", site: "homeartisan.in", note: "D2C · India" },
    { slug: "baby-saffron", name: "Baby Saffron", site: "babysaffron.com", note: "D2C · India" },
  ],
];

export const leaks = {
  chalk: "boring fundamentals first",
  title: "Four things I check before I change a single bid",
  intro: "When a Meta account stops working, I usually find the cause in one of these four places. Sometimes in all of them.",
  cards: [
    {
      doodle: "loop",
      title: "Meta is chasing the wrong conversion",
      body: "You get cheap leads and your sales team won’t call them. Meta optimises for whatever you tell it counts, and most accounts tell it “form filled.”",
      proof: "At Time Doctor I rebuilt the tracking with the Conversions API, sent MQL and SQL stages back from the CRM, and cleaned up the UTMs. Meta now bids for leads that turn into pipeline.",
    },
    {
      doodle: "megaphone",
      title: "The account runs out of fresh ideas",
      body: "Results slip every few weeks and new ads don’t bring them back. Often the account has ten versions of one idea, and Meta treats those as one ad.",
      proof: "I led Time Doctor’s creative overhaul, from the messaging angles to the formats and the test plan.",
    },
    {
      doodle: "coins",
      title: "The budget is spread too thin",
      body: "You have so many campaigns and ad sets that none of them gets enough data to learn. Every time you raise the budget, costs jump.",
      proof: "I rebuilt Pella’s account and scaled it with cost caps and automated bid rules. Cost per lead went from $1,300 to $200.",
    },
    {
      doodle: "arrow",
      title: "The business can’t use what the ads bring in",
      body: "Sometimes the ads are fine. The offer is weak, the landing page is slow, or sales can’t call everyone back in time.",
      proof: "Datamoon had more leads than its sales team could handle. I moved spend to retargeting and higher-intent audiences, and CAC fell 65%.",
    },
  ] as const,
  footnote: "If your problem sits outside the ad account, I’ll say so on the first call.",
};

export const tracks: Record<Track, { label: string; title: string; body: string; setupLabel: string; setup: string[] }> = {
  b2b: {
    label: "To businesses",
    title: "Meta can fill a B2B pipeline",
    body: "Most B2B teams try Meta, get a pile of cheap leads that sales won’t touch, and switch it off. It starts working once Meta can see which leads became real opportunities. At Time Doctor, Meta is now the main source of enterprise and mid-market demos.",
    setupLabel: "What I set up for B2B accounts",
    setup: [
      "Conversions API next to the pixel, so Meta sees every lead",
      "CRM stages (MQL, SQL, opportunity) sent back to Meta, so it bids for pipeline",
      "Lookalikes built from customers and qualified leads, instead of everyone who filled a form",
      "Retargeting sized to what your sales team can actually follow up on",
      "Reports in cost per SQL and cost per opportunity",
      "Account-based audiences on Meta when you’re also running LinkedIn ABM",
    ],
  },
  d2c: {
    label: "To consumers",
    title: "Meta for D2C sales that hold up after returns",
    body: "I’ve launched Indian brands online from nothing and run a $12M paid social budget in North America. On smaller budgets I watch two numbers before ROAS: what you keep per order after discounts and returns, and how many buyers are new.",
    setupLabel: "What I set up for D2C accounts",
    setup: [
      "Pixel and Conversions API on Shopify, with clean purchase values",
      "Reporting that accounts for COD cancellations and RTO",
      "Catalogue ads once you have enough products and traffic to feed them",
      "New creative every few weeks, because D2C results drop fast once the ads go stale",
      "Regular checks on placements, age groups and regions that eat budget without selling",
    ],
  },
};

export type MetaCase = {
  client: string;
  meta: string;
  track: Track;
  started?: string;
  did: string;
  changed: string;
  /* Accent figure on the card. */
  figure: string;
  figureLabel: string;
  /* Existing /work/<slug> story page, when there is one. */
  caseStudy?: string;
  /* Shown as a small tag, e.g. when the result wasn't Meta-only. */
  channels?: string;
};

/* Every card runs in the same order: where it started, what I did, what
   changed. Coram is in the doc's B2B list but has no write-up yet, so it
   isn't shown. */
export const metaCases: MetaCase[] = [
  {
    client: "Time Doctor",
    meta: "B2B SaaS · 2026",
    track: "b2b",
    started: "[What Meta was doing for Time Doctor before you took it over, and what was wrong with the tracking.]",
    did: "I rebuilt the tracking end to end: Conversions API, MQL and SQL data sent back from the CRM, and one UTM standard across campaigns. Then I led a full creative reset, covering the messaging, the formats and the test plan.",
    changed: "Meta became the main source of enterprise and mid-market demos and signups. [Add the number: share of demos, demo growth, or cost per SQL.]",
    figure: "#1",
    figureLabel: "source of enterprise demos",
  },
  {
    client: "Datamoon",
    meta: "B2B SaaS · 2026",
    track: "b2b",
    started: "Meta was sending more leads than the sales team could work through, and the cost per customer was climbing.",
    did: "I cut back on broad lead volume and moved spend to retargeting and higher-intent audiences, sized to what sales could handle.",
    changed: "CAC came down 65%. [Timeframe.]",
    figure: "−65%",
    figureLabel: "CAC",
  },
  {
    client: "Creative Planning",
    meta: "wealth management · US",
    track: "b2b",
    did: "Ran account-based campaigns on Meta and LinkedIn, part of more than $3M in B2B spend I managed with Rocket Software.",
    changed: "$11M+ in assets under management from $90K in ad spend.",
    figure: "$11M+",
    figureLabel: "AUM from $90K spend",
    channels: "Meta and LinkedIn",
  },
  {
    client: "Pella",
    meta: "home improvement · US and Canada · 2024 to 2025",
    track: "d2c",
    started: "Pella was spending a $12M paid social budget across the US and Canada and getting back 80 cents for every dollar. Each lead cost about $1,300.",
    did: "I restructured the account, tightened who we were reaching, and scaled with cost caps and automated bid rules instead of pushing budgets by hand.",
    changed: "ROAS went to 3x. Cost per lead dropped to $200.",
    figure: "0.8x → 3x",
    figureLabel: "ROAS",
    caseStudy: "pella",
  },
  {
    client: "Slow Living Stays",
    meta: "travel · India · 2025",
    track: "d2c",
    started: "A platform that curates offbeat stays across India. Good properties, beautiful locations, and no online presence at all.",
    did: "I tested audiences and content types side by side, so the same campaigns built the brand and brought in bookings. We made the creatives in-house. Leads came in for as little as ₹15.",
    changed: "₹50L in bookings in the first five months on ₹1.5L of ad spend. Bookings have since crossed ₹2Cr.",
    figure: "₹50L",
    figureLabel: "bookings on ₹1.5L spend",
    caseStudy: "slow-living-stays",
  },
  {
    client: "ModernYard",
    meta: "home decor · India · 2024",
    track: "d2c",
    started: "The brand wanted more orders, but weak content limited how far the ads could scale.",
    did: "I went through the store to find the products that drove most of the revenue, ran structured creative tests, and built top-of-funnel campaigns to bring in new people. Then I scaled catalogue ads with cost caps and audiences built from the brand’s own customer data.",
    changed: "₹58L in gross sales and ₹40L net in three and a half months, at 4x net effective ROAS.",
    figure: "₹58L",
    figureLabel: "gross sales in 3.5 months",
    caseStudy: "modernyard",
  },
  {
    client: "Inara Home Decor",
    meta: "premium decor · India · 2024 to 2025",
    track: "d2c",
    started: "A premium decor brand with a strong store presence in Mumbai and no online sales.",
    did: "The founder fronted the awareness content. Further down the funnel, I used catalogue ads and segments from the brand’s customer data to turn that attention into orders.",
    changed: "₹27.6L in gross sales at 3x ROAS, with an average order above ₹5,000. The work is ongoing.",
    figure: "3x",
    figureLabel: "ROAS on ₹27.6L sales",
    caseStudy: "inara",
  },
];

export const offers = {
  title: "Most clients start with an audit",
  intro: "You get a clear picture of the account before you commit to anything longer. If we keep working together, the audit fee comes off the first month.",
  items: [
    {
      name: "Meta Ads audit",
      what: "I go through your structure, tracking, audiences, creative and budget split. You get a written report, a recorded walkthrough, and a 90-day plan your team can run without me.",
      length: "7 to 10 days",
      price: "From [amount]",
      lead: true,
    },
    {
      name: "Monthly management",
      what: "I run the account: strategy, buying, creative briefs, weekly tests, budget pacing, and reports tied to revenue or pipeline.",
      length: "Monthly, [minimum term]",
      price: "From [amount] a month",
    },
    {
      name: "Tracking setup",
      what: "Pixel, Conversions API, custom conversions, and CRM data (HubSpot or Salesforce) sent back to Meta. For teams who run their own ads but don’t trust the numbers.",
      length: "2 to 4 weeks",
      price: "From [amount]",
    },
    {
      name: "Team training",
      what: "Working sessions with your marketers on structure, testing and reading results, inside your own account.",
      length: "[e.g. 4 weekly sessions]",
      price: "From [amount]",
    },
  ],
  footnote: "Management works best for accounts spending [₹X / $Y] or more a month on Meta. Not sure which option fits? Ask on the call.",
};

export const creative = {
  chalk: "the ad picks the audience now",
  title: "How I handle creative",
  body: "With broad targeting, Meta looks at your ad to work out who should see it. A video about saving finance teams ten hours a week ends up in front of finance leads. A discount banner finds discount shoppers. So I spend more time on what the ads say than on audience settings.",
  steps: [
    {
      title: "Start with the reason to buy.",
      body: "Each test is a different angle: a pain, a result, a proof point, an objection. Meta can’t tell apart ten edits of the same idea, so I don’t waste budget on them.",
    },
    {
      title: "Then the first three seconds and the format.",
      body: "Once an angle works, I test hooks, then static against video, carousel and creator-style content.",
    },
    {
      title: "Keep the winners fresh.",
      body: "I make new versions of what’s working before the numbers start to slide.",
    },
  ],
  deliverables: "A short brief for every new ad, a testing calendar, and a monthly note on which angles worked. Your designers and sales team can use that note outside Meta too.",
  proof: "I led Time Doctor’s creative reset. At Slow Living Stays and Inara, we made the creative in-house and with the founder.",
};

export const ninetyDays = {
  title: "Your first 90 days",
  phases: [
    {
      when: "Week 1",
      title: "Audit",
      body: "I go through the account, the tracking, your site and your sales numbers. You get a written diagnosis and a ranked list of fixes. I don’t change anything in the account yet.",
    },
    {
      when: "Weeks 2 to 4",
      title: "Fix the foundations",
      body: "I repair the tracking, pick the conversion events that match how you make money, and merge campaigns so Meta has enough data. Results can wobble for a week or two while Meta relearns. I’ll tell you before it happens.",
    },
    {
      when: "Month 2",
      title: "Creative tests",
      body: "New angles go live every [week / two weeks], with a short update on each.",
    },
    {
      when: "Month 3",
      title: "Scale",
      body: "Budget moves to what’s working, with cost caps or bid rules where they make sense. We agree targets for the next quarter.",
    },
  ],
  howLabel: "How I work with you",
  how: [
    "You own the ad account, the pixel and the data. I work in it with partner access.",
    "Weekly update on [Slack / email / Loom] and a monthly call.",
    "Reports show Meta’s numbers next to your CRM or Shopify numbers, so you see what actually came in.",
    "I won’t promise a ROAS figure before I’ve seen your account.",
    "I’m in Bengaluru and overlap with [US mornings / UK afternoons].",
  ],
};

/* Keep student pricing off this page: it sets a low anchor for clients. */
export const teaching = {
  title: "I also teach Meta Ads",
  body: "I’ve trained [number] marketers and founders through [1:1 mentoring / small batches / workshops]. When you have to explain every setting to a student, you stop doing things out of habit. My clients get the same explanations. You’ll always know why your account is set up the way it is.",
  stats: [
    { figure: "[Number]", label: "students trained" },
    { figure: "[Number]", label: "now running Meta accounts for clients or employers" },
    { figure: "[Outcome]", label: "[One named outcome, e.g. a student who landed a role or their first retainer]" },
  ],
  quote: {
    text: "[One specific thing they learned, in their words, e.g. “I finally understood why my campaigns never got out of learning.”]",
    who: "[First name], [what they do now]",
  },
  last: "Want to learn it yourself?",
  lastLink: { label: "[Link to your student page or waitlist]", href: "#" },
};

/* Verbatim slices of the quotes in data/testimonials.ts. Karuna Excellence
   Academy is left out on purpose: that campaign was mostly YouTube, so it
   lives on the main site. Confirm BeautyGlad was Meta work before launch. */
export const metaTestimonials: { quote: string; name: string; role: string; tag?: string }[] = [
  {
    quote: "He approaches every campaign with data-driven strategy and clear business impact in mind.",
    name: "Sowmiya",
    role: "Team Lead, GALE",
    tag: "Paid social",
  },
  {
    quote: "…ran the right experiments to reach our audience while bringing down our costs of acquisition.",
    name: "Sapan Shah",
    role: "Founder and CEO, Yoro News",
    tag: "Meta and Google · CAC −85%",
  },
  {
    quote: "He first understood our business & challenges and then made a proper strategy.",
    name: "Vikash Sharma",
    role: "Founder, BeautyGlad",
  },
];

export const fit = {
  good: [
    "already spend on Meta and the numbers stopped adding up",
    "sell B2B and can share CRM stages, so Meta learns what a good lead is",
    "run a D2C brand and can share margins and order data, not only ROAS",
    "want to know why a number moved",
  ],
  notYet: [
    "spend less than [threshold] a month",
    "want a guaranteed ROAS before anyone has looked at your data",
    "haven’t proven the offer sells yet",
    "can’t share revenue or CRM data",
  ],
};

export const faq: { q: string; a: string }[] = [
  {
    q: "What’s the smallest budget you take on?",
    a: "For monthly management, [₹X / $Y] a month on Meta. Below that, an audit or a few training sessions will do more for you than a retainer.",
  },
  {
    q: "How soon will I see results?",
    a: "You get the audit in the first week. Changes to the account take two to four weeks to settle while Meta relearns, and most of the improvement shows up in months two and three.",
  },
  {
    q: "Do you make the ads?",
    a: "[I write the briefs and work with your designers / I make static and short video ads myself / both.] You get a brief for every new ad either way.",
  },
  {
    q: "Does Meta work for B2B?",
    a: "Yes, once Meta can see which leads became opportunities. That means sending CRM stages back to Meta and judging it on cost per SQL. That’s how Meta became Time Doctor’s main source of enterprise and mid-market demos.",
  },
  {
    q: "Do you only do Meta?",
    a: "Facebook and Instagram are most of my work. I also run TikTok, Snapchat, Pinterest and LinkedIn when your buyers are there, and Google Ads when search should carry some of the load. If Meta is the wrong channel for you, I’ll tell you.",
  },
  {
    q: "Who owns the ad account?",
    a: "You do. I work through partner access in your Business Manager, and everything I set up stays with you.",
  },
  {
    q: "Which markets do you work in?",
    a: "I’ve run Meta in the US, Canada and India, and Google Ads in Europe.",
  },
  {
    q: "How long is the contract?",
    a: "Audits are one-off. Management is [month to month after the first X months / an X-month minimum], because the first month or two goes into fixing the foundations.",
  },
  {
    q: "Do you work with agencies?",
    a: "[Yes, as the paid social specialist on their accounts / No.]",
  },
  {
    q: "Why hire you over an agency?",
    a: "You deal with me directly, every week, on your account. Nobody hands you to a junior after the sales call.",
  },
];

export const finalCta = {
  chalk: "see you on the other side :)",
  title: "Show me your account",
  body: "Book 30 minutes. Bring the last 90 days of results and tell me what a good month looks like for you. I’ll tell you what I’d fix first, and if you don’t need me, I’ll say that too.",
  reviewLabel: "Get a free 10-minute video review",
  reviewNote: "for accounts spending [threshold]+ a month",
};

/* Dropdown for the video review form. Set the lowest band to match the
   threshold above. */
export const spendBands = [
  "Under ₹1L / $1.5K a month",
  "₹1L to ₹5L / $1.5K to $6K",
  "₹5L to ₹20L / $6K to $25K",
  "₹20L+ / $25K+ a month",
];

export const sellOptions = ["B2B", "D2C", "App", "Other"];
