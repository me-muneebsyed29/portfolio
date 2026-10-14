/*
 * Case studies. Every figure and claim comes from Muneeb's portfolio
 * highlights (June 2025) or his CV; nothing is added to fill a section.
 * Agency work carries `context` ("At GALE Partners"), so it is clear whose
 * team the result came from.
 *
 * Each study renders as a homepage card (if `featured`), a card on /work, and
 * its own page at /work/<slug>, which follows the template from the sky
 * direction doc: setup, what was broken, what I changed, what moved.
 */
export type Industry =
  | "Enterprise"
  | "B2B and SaaS"
  | "Finance"
  | "EdTech"
  | "Healthcare"
  | "D2C"
  | "Apps"
  | "Coaching"
  | "Local services"
  | "Hospitality";

export type Market = "US" | "Canada" | "Europe" | "India";

export type CaseStudy = {
  slug: string;
  client: string;
  /* Search and social: seoTitle under ~46 characters (the root template adds
     " · Muneeb Syed"), seoDescription around 150. */
  seoTitle: string;
  seoDescription: string;
  industry: Industry;
  markets: Market[];
  channels: string[];
  period: string;
  /* Where the work was done, for agency engagements. */
  context?: string;
  /* One of the three on the homepage. */
  featured?: boolean;
  tag: string;
  headline: string;
  oneLine: string;
  /* Stat cards. The first is the accent and goes on the sticky note. */
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
    slug: "pella",
    client: "Pella",
    seoTitle: "Case study: Pella paid social, 0.8x to 3x ROAS",
    seoDescription:
      "How Pella’s paid social across the US and Canada went from negative ROAS to 3x on a $12M budget, with lead cost cut from $1,300 to $200.",
    industry: "Enterprise",
    markets: ["US", "Canada"],
    channels: ["Meta"],
    period: "2024 to 2025",
    context: "At GALE Partners",
    featured: true,
    tag: "Paid social · Enterprise",
    headline: "From negative ROAS to 3x on a $12M budget.",
    oneLine: "Restructured Pella’s paid social in the US and Canada and cut lead cost from $1,300 to $200.",
    metrics: [
      { value: "3x", label: "ROAS, up from 0.8x" },
      { value: "$1,300 → $200", label: "Cost per lead" },
      { value: "$12M", label: "Paid social budget" },
    ],
    setup:
      "Pella runs paid social across the US and Canada on a $12M budget. I owned the paid social turnaround as part of the GALE Partners team.",
    broken: ["Paid social was returning less than it spent: 0.8x ROAS.", "Each lead cost around $1,300."],
    changed: [
      "Restructured the account.",
      "Optimised campaigns and tightened audience quality.",
      "Scaled with cost caps and dynamic bid optimisation run by automated rules.",
    ],
    moved:
      "ROAS climbed from 0.8x to 3x and the cost per lead fell from $1,300 to $200, across a $12M paid social budget in the US and Canada.",
  },
  {
    slug: "jetlearn",
    client: "JetLearn",
    seoTitle: "Case study: JetLearn Google Ads, CAC down 65%",
    seoDescription:
      "How JetLearn, a European kids’ coding EdTech, scaled Google Ads from €4K to €30K a month while cutting acquisition cost by more than 65%.",
    industry: "EdTech",
    markets: ["Europe"],
    channels: ["Google Ads"],
    period: "2022 to 2023",
    context: "At Growth Hackers Digital",
    featured: true,
    tag: "Google Ads · EdTech",
    headline: "€4K to €30K a month, with CAC down 65%.",
    oneLine: "Took control of the keywords, focused on the regions that worked, and scaled spend 7x.",
    metrics: [
      { value: "-65%", label: "Cost of acquisition" },
      { value: "€4K → €30K", label: "Monthly ad spend" },
      { value: "+35%", label: "MQL conversion rate" },
    ],
    setup:
      "JetLearn is a funded kids’ coding EdTech and one of the top players in Europe. It wanted to launch and scale customer acquisition through paid ads.",
    broken: [
      "EdTech is one of the most expensive categories in paid search.",
      "A high share of the leads were junk.",
      "Spend was hard to scale past €10K a month.",
    ],
    changed: [
      "Ran deep keyword analysis and strict search term hygiene to control which keywords spent.",
      "Put budget behind the regions that were getting traction.",
      "Optimised the landing page.",
      "Tested ad copy until the messages that resonated lifted quality scores.",
    ],
    moved:
      "Cost of acquisition fell by more than 65% while monthly spend scaled from €4K to €30K, and the MQL conversion rate rose 35%.",
  },
  {
    slug: "icode-school",
    client: "iCode School",
    seoTitle: "Case study: iCode School CPL from $263 to $36",
    seoDescription:
      "How a US coding and robotics school cut its Google Ads cost per lead from $263 to $36, 40% below breakeven, by fixing structure and tracking.",
    industry: "EdTech",
    markets: ["US"],
    channels: ["Google Ads", "Performance Max"],
    period: "2022 to 2023",
    context: "At Growth Hackers Digital",
    featured: true,
    tag: "Google Ads · EdTech",
    headline: "Cost per lead from $263 to $36.",
    oneLine: "Rebuilt the account and the tracking, then scaled: CPL ended 40% below breakeven.",
    metrics: [
      { value: "-86%", label: "Cost per lead" },
      { value: "$263 → $36", label: "CPL" },
      { value: "40%", label: "Below the $85 breakeven" },
    ],
    setup: "iCode School is a US offline school for coding and robotics that fills its classes through paid lead generation.",
    broken: [
      "Customer acquisition cost was high, with leaks in the customer journey.",
      "Advertising was expensive and the junk lead rate was high.",
      "The account structure couldn’t scale.",
      "Tracking had major issues.",
    ],
    changed: [
      "Audited and cleaned up the account structure.",
      "Cut keywords by performance and kept the winners.",
      "Launched new campaigns with fresh creatives and winning keywords, split by location.",
      "Focused on new user acquisition and stabilised lead flow.",
      "Rebuilt the tracking.",
      "Scaled once leads flowed consistently, then brought in Performance Max.",
    ],
    moved:
      "CPL dropped from $263 to $141, then to $76 once campaigns were maintained properly and tracking was fixed. With Performance Max it reached $36, 40% below their $85 breakeven.",
  },
  {
    slug: "canadamasq",
    client: "Canadamasq",
    seoTitle: "Case study: Canadamasq ROAS 1.9x to 6.9x",
    seoDescription:
      "How a Canadian healthcare products brand grew quarterly sales 70% and took ROAS from 1.9x to 6.9x in one quarter despite ad policy limits.",
    industry: "Healthcare",
    markets: ["Canada"],
    channels: ["Google Ads", "Email", "Influencers"],
    period: "2023",
    tag: "Google Ads · Healthcare",
    headline: "ROAS from 1.9x to 6.9x in one quarter.",
    oneLine: "Fixed tracking, focused on best-sellers and secured brand search, in a category ad policies love to flag.",
    metrics: [
      { value: "6.9x", label: "ROAS, up from 1.9x" },
      { value: "+70%", label: "Quarterly sales, to $170.6K" },
      { value: "+104%", label: "Orders" },
      { value: "12.6x", label: "Google Ads ROAS, Oct to Dec 2023" },
    ],
    setup: "Canadamasq sells healthcare products in Canada to both businesses and consumers.",
    broken: [
      "Low sales, high costs and no account structure.",
      "A declining, seasonal market.",
      "Healthcare products that kept running into ad policy violations.",
    ],
    changed: [
      "Put the right technology and AI tooling in place, and fixed the tracking setup.",
      "Improved the website’s conversion rate.",
      "Ran keyword research and a new creative strategy.",
      "Narrowed the focus to the best-selling products.",
      "Secured brand positioning and ad ranking on brand keywords.",
      "Beyond ads, ran influencer and Twitter marketing and optimised email, which lifted retention and lifetime value.",
    ],
    moved:
      "Quarterly sales rose 70% to $170.6K and orders more than doubled against the previous quarter. Overall ROAS went from 1.9x to 6.9x in a single quarter, and Google Ads alone returned 12.6x over October to December 2023.",
  },
  {
    slug: "slow-living-stays",
    client: "Slow Living Stays",
    seoTitle: "Case study: Slow Living Stays, 23x ROAS",
    seoDescription:
      "How an Indian travel platform for offbeat stays launched online and booked ₹50L in five months on ₹1.5L of ad spend, a 23x ROAS.",
    industry: "Hospitality",
    markets: ["India"],
    channels: ["Meta"],
    period: "2025",
    tag: "Meta Ads · Hospitality",
    headline: "₹50L in bookings in 5 months on ₹1.5L spend.",
    oneLine: "Launched a curated travel brand online with in-house creative and leads as cheap as ₹15.",
    metrics: [
      { value: "23x", label: "ROAS (6x net)" },
      { value: "₹50L", label: "Bookings in 5 months" },
      { value: "₹15", label: "Lowest cost per lead" },
      { value: "₹2Cr", label: "Booking value to date" },
    ],
    setup:
      "Slow Living Stays is an Indian travel platform that curates offbeat properties across the country. It had a strong curation of stays and picturesque locations, but no online presence yet.",
    broken: ["Launching the brand online from zero.", "Limited knowledge and resources to start the online journey."],
    changed: [
      "Tested audience and content type together, to build brand awareness and performance at the same time.",
      "Made high-quality, aesthetic creatives in-house.",
      "Reached the right travellers and built strong brand recall, bringing in leads for as little as ₹15.",
    ],
    moved:
      "Starting in January 2025, the brand booked ₹50L in five months on ₹1.5L of ad spend: 23x ROAS, 6x net. Bookings have since reached ₹2Cr, with ₹31.7L in profit on ₹8.2L of net ad spend.",
  },
  {
    slug: "modernyard",
    client: "ModernYard",
    seoTitle: "Case study: ModernYard, ₹58L sales in 3.5 months",
    seoDescription:
      "How an Indian D2C home decor brand reached ₹58L in gross sales in three and a half months on Meta, at a 4x net effective ROAS.",
    industry: "D2C",
    markets: ["India"],
    channels: ["Meta"],
    period: "2024",
    tag: "Meta Ads · D2C",
    headline: "₹58L in gross sales in 3.5 months.",
    oneLine: "Found the products and creatives that sold, then scaled with first-party data and catalogue ads.",
    metrics: [
      { value: "4x", label: "Net effective ROAS" },
      { value: "₹58L", label: "Gross sales" },
      { value: "₹40L", label: "Net sales" },
    ],
    setup: "ModernYard is an Indian D2C home decor brand that wanted more orders and more revenue.",
    broken: ["Content quality capped how far the account could scale."],
    changed: [
      "Audited the store to find the products driving most of the revenue.",
      "Ran structured creative testing to find the winning creatives.",
      "Used first-party data to segment users and drive bottom-of-funnel conversions at scale.",
      "Built awareness with top-of-funnel campaigns that fed new users into the funnel.",
      "Ran dynamic product ads at scale with cost caps.",
    ],
    moved: "₹58L in gross sales and ₹40L in net sales in three and a half months, at a net effective ROAS of 4x.",
  },
  {
    slug: "inara",
    client: "Inara Home Decor",
    seoTitle: "Case study: Inara Home Decor online at 3x ROAS",
    seoDescription:
      "How a premium home decor brand from Mumbai launched online and grew to ₹27.6L in gross sales at 3x ROAS, holding an order value above ₹5K.",
    industry: "D2C",
    markets: ["India"],
    channels: ["Meta"],
    period: "2024 to 2025",
    tag: "Meta Ads · D2C",
    headline: "A premium decor brand online, at 3x ROAS.",
    oneLine: "Took a strong offline brand online with founder-led content and catalogue ads.",
    metrics: [
      { value: "3x", label: "ROAS" },
      { value: "₹27.6L", label: "Gross sales" },
      { value: "₹5K+", label: "Average order value" },
    ],
    setup:
      "Inara is a niche, premium home decor brand with a strong offline presence in Mumbai. It wanted to launch online.",
    broken: ["Limited knowledge and resources to start selling online."],
    changed: [
      "Tested audience and content type together, for brand awareness and performance at once.",
      "Used first-party data to segment users and drive bottom-of-funnel conversions.",
      "Built awareness with top-of-funnel campaigns and founder-led content.",
      "Ran dynamic product ads at the bottom of the funnel to drive sales.",
    ],
    moved:
      "Gross sales grew to ₹27.6L and net sales to ₹22L, with an average order value above ₹5K and 3x ROAS. The work is ongoing.",
  },
  {
    slug: "yoro-news",
    client: "Yoro News",
    seoTitle: "Case study: Yoro News CPI from ₹58 to ₹3",
    seoDescription:
      "How an Indian news app found its audience and scaled installs: cost per install from ₹58 to ₹3 while monthly spend grew from ₹30K to ₹1.5L.",
    industry: "Apps",
    markets: ["India"],
    channels: ["Meta", "Google Ads"],
    period: "2022 to 2023",
    context: "At Growth Hackers Digital",
    tag: "App installs · Media",
    headline: "Cost per install from ₹58 to ₹3.",
    oneLine: "Persona research and creative testing found the format, then spend scaled 5x.",
    metrics: [
      { value: "₹3", label: "Cost per install, from ₹58" },
      { value: "₹30K → ₹1.5L", label: "Monthly spend" },
      { value: "₹7.2", label: "Cost per acquisition" },
    ],
    setup:
      "Yoro News is an Indian news app for people into stocks, crypto, anime and gaming. It needed to reach those niche users at launch.",
    broken: ["No go-to-market strategy.", "Content was just okay.", "Acquisition costs were high."],
    changed: [
      "Researched the user personas in depth.",
      "Launched top-of-funnel campaigns.",
      "Built a creative strategy and ran creative experiments.",
      "Used lookalike audiences to hit higher KPIs.",
    ],
    moved:
      "Cost per install started at ₹58 and fell to ₹34 during the experimentation phase. Once the winning format was clear, monthly spend scaled from ₹30K to ₹1.5L at a cost per install of ₹3 and a cost per acquisition of ₹7.2.",
  },
  {
    slug: "karuna-excellence-academy",
    client: "Karuna Excellence Academy",
    seoTitle: "Case study: 45K coaching leads at ₹30 each",
    seoDescription:
      "How a career coaching business moved online with a full funnel and YouTube ads: 45K leads at ₹30, a 3.5x ROI and ₹52L in revenue in 2023.",
    industry: "Coaching",
    markets: ["India"],
    channels: ["YouTube", "Google Ads", "Meta"],
    period: "2023",
    tag: "Full funnel · Coaching",
    headline: "45K leads at ₹30 each.",
    oneLine: "Built the funnel and the automation behind it, then made YouTube do the heavy lifting.",
    metrics: [
      { value: "3.5x", label: "Long-term ROI" },
      { value: "45K", label: "Leads" },
      { value: "₹30", label: "Average cost per lead" },
      { value: "₹52L", label: "Revenue in 2023" },
    ],
    setup: "Karuna Excellence Academy is a career coaching business that wanted to move its coaching sessions online.",
    broken: [
      "No proper funnel, and little understanding of the tools and messaging.",
      "Frequent ad disapprovals.",
      "A saturated, highly competitive industry.",
    ],
    changed: [
      "Built a lead generation funnel with high-converting landing pages.",
      "Connected the automation stack: FlexiFunnels, ClickFunnels, Zapier, Pabbly, Google Sheets, WhatsApp automation, Calendly and Zoom.",
      "Set up and maintained the infrastructure.",
      "Tested creative and messaging to keep conversion rates high across channels.",
      "Used YouTube ads to their full potential.",
    ],
    moved:
      "About ₹16L of ad spend across channels brought in close to 45K leads at an average cost of ₹30. The front-end offer converted at a consistent 35% and the back-end offer at 5%, for a long-term ROI of 3.5x and ₹52L in revenue in 2023.",
  },
  {
    slug: "kannan-borewells",
    client: "Kannan Borewells",
    seoTitle: "Case study: #1 on Google for a local business",
    seoDescription:
      "How a borewell services company in India beat same-name competitors to the #1 spot on Google and turned ads into 2,000+ leads at 30x ROI.",
    industry: "Local services",
    markets: ["India"],
    channels: ["Google Ads", "SEO", "Google Business Profile"],
    period: "2022 to 2024",
    tag: "Local search · Services",
    headline: "#1 on Google, over same-name competitors.",
    oneLine: "Rebuilt the site for the locality, fixed the business profile, and ran call and location ads.",
    metrics: [
      { value: "30x", label: "Blended ROI from ads" },
      { value: "#1", label: "Search ranking, held" },
      { value: "2,000+", label: "Leads, calls and visits" },
    ],
    setup: "Kannan Borewells is a borewell services company competing in a small, local market in India.",
    broken: [
      "Competitors with the same brand name were taking market share.",
      "A niche locality with many competitors pushed ad costs up.",
      "It ranked lowest in search, with a basic, unoptimised website and a lot of junk traffic.",
    ],
    changed: [
      "Rebuilt the website around the locality.",
      "Improved SEO and the Google Business Profile to lift ad ranking.",
      "Ran keyword research and an account audit.",
      "Launched call and location ads to win visibility and market share.",
      "Worked the bidding to outrank competitors.",
    ],
    moved:
      "The business reached and held the #1 search ranking over its competitors and generated 2,000+ leads, calls and store visits, for a 30x blended ROI from ads.",
  },
];

export const featuredCaseStudies = caseStudies.filter((s) => s.featured);
