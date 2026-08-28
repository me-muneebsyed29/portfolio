import type { LucideIcon } from "lucide-react";
import {
  Search,
  Wrench,
  FlaskConical,
  TrendingUp,
  Megaphone,
  MousePointerClick,
  Music2,
  Ghost,
  Video,
  Gauge,
} from "lucide-react";

/* ---------------------------------------------------------------- problems */

export const problems: string[] = [
  "ROAS looks fine inside Ads Manager and nowhere else.",
  "Spend goes up, contribution margin goes down.",
  "Creative is the bottleneck, but testing has no structure behind it.",
  "The account has never been restructured — only added to.",
  "You're paying senior rates and getting a junior's attention.",
  "Every scale attempt resets performance back to zero.",
];

/* ---------------------------------------------------------------- channels */

export type Channel = {
  icon: LucideIcon;
  name: string;
  description: string;
  proof: string;
};

export const channels: Channel[] = [
  {
    icon: Megaphone,
    name: "Meta Ads",
    description:
      "Prospecting and retargeting built on cost caps and automated bid rules, so budget increases don't reset learning.",
    proof: "$12M managed on a single account",
  },
  {
    icon: MousePointerClick,
    name: "Google Ads",
    description:
      "Search, Performance Max and Shopping — capturing the demand that already exists before paying to create more.",
    proof: "€4K → €30K/mo scaled",
  },
  {
    icon: Music2,
    name: "TikTok Ads",
    description:
      "Creator-led acquisition for categories that are told they don't work on TikTok. Certified media buyer.",
    proof: "Built as a core channel at Enercare",
  },
  {
    icon: Ghost,
    name: "Snapchat Ads",
    description:
      "Broad-reach consumer campaigns where cheap attention still exists and most advertisers aren't looking.",
    proof: "Snap-certified since 2024",
  },
  {
    icon: Video,
    name: "YouTube & app campaigns",
    description:
      "Video acquisition and app promotion optimised to in-app value events rather than installs.",
    proof: "2.7x ROAS on $3M app spend",
  },
  {
    icon: Gauge,
    name: "Tracking & measurement",
    description:
      "GA4, Tag Manager, AppsFlyer, Funnel.io and Looker — because none of the above means anything if the data is wrong.",
    proof: "Set up before spend, not after",
  },
];

/* -------------------------------------------------------------- categories */

export const categories: string[] = [
  "D2C & ecommerce",
  "Consumer apps & fintech",
  "Home services",
  "Home improvement",
  "Consumer EdTech",
  "Fitness & retail",
  "Local & call-driven",
  "Creators & info-products",
];

/* ----------------------------------------------------------------- process */

export type ProcessStep = {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    icon: Search,
    step: "01",
    title: "Audit",
    body: "I go through the account, tracking, funnel and creative before touching a budget. You get the findings either way — whether or not we end up working together.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Restructure",
    body: "Most consumer accounts don't need more spend. They need a structure the algorithm can actually learn inside. This is where the majority of the gain comes from, and it's the step almost everyone skips.",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Test",
    body: "Creative, offer, audience and landing page — one structured hypothesis at a time, with success thresholds set before launch rather than argued about after.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Scale",
    body: "Budget increases follow saturation signals, not the calendar. Scaling on a fixed monthly schedule is how efficiency collapses at exactly the moment it matters.",
  },
];

/* ------------------------------------------------------------- comparison */

export type ComparisonRow = {
  criterion: string;
  me: boolean;
  agency: boolean;
  junior: boolean;
  marketplace: boolean;
};

export const comparison: ComparisonRow[] = [
  { criterion: "A senior operator in the account daily", me: true, agency: false, junior: false, marketplace: false },
  { criterion: "The person you hired runs it personally", me: true, agency: false, junior: true, marketplace: false },
  { criterion: "Experience on $10M+ single accounts", me: true, agency: true, junior: false, marketplace: false },
  { criterion: "Platform-certified across Meta, TikTok & Snap", me: true, agency: true, junior: false, marketplace: false },
  { criterion: "Restructures before scaling", me: true, agency: false, junior: false, marketplace: false },
  { criterion: "Direct line to whoever touches the budget", me: true, agency: false, junior: true, marketplace: true },
  { criterion: "No account-management layer to pay for", me: true, agency: false, junior: true, marketplace: true },
];

export const comparisonColumns = [
  { key: "me", label: "Me" },
  { key: "agency", label: "Full-service agency" },
  { key: "junior", label: "Junior in-house hire" },
  { key: "marketplace", label: "Freelance marketplace" },
] as const;

/* ----------------------------------------------------------- testimonials */

/** Verbatim from the résumé. B2B references (e.g. Universal Robots) are
 *  deliberately excluded — those belong on muneebsyed29.com. */
export const testimonials = [
  {
    quote:
      "I worked with Syed for 6 months on YouTube ads for my career coaching business. Before him, my ROAS was 1–1.5; after he took over, it consistently improved to 2–3.3, driving higher revenue and profits than ever before. Syed is data-driven, highly skilled in performance marketing, and takes full ownership of results.",
    name: "Dr. Karunakaran Nagarajan",
    role: "Career Growth Coach",
  },
  {
    quote:
      "Syed built our Google and Meta ad streams for user acquisition, aligned with our targets, and ran smart experiments that lowered acquisition costs.",
    name: "Sapan Shah",
    role: "Founder, Yoro News",
  },
  {
    quote:
      "Muneeb is great at his work. I have always been satisfied with his results, and the way he tackles challenges. I would highly recommend him for performance marketing.",
    name: "Shivalika Chopra",
    role: "Social Media Expert",
  },
  {
    quote:
      "I worked closely with Syed for over a year and was impressed by his quick grasp of ideas, fast execution, and eagerness to learn.",
    name: "Saransh Maheshwari",
    role: "Performance & Growth, JetLearn",
  },
];

/* --------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    q: "What does the audit actually involve, and is it really free?",
    a: "I review your ad accounts, conversion tracking, funnel and recent creative, then send back what's costing you money and what I'd change first. It's free and it's yours to keep — including if you take it to someone else. It's the fastest way for both of us to find out whether there's real upside here.",
  },
  {
    q: "Who runs my account day to day?",
    a: "I do. There's no pod, no account manager relaying messages, and nothing handed to a junior once the contract is signed. That's the entire point of hiring an operator instead of an agency.",
  },
  {
    q: "What do you charge?",
    a: "Engagements are scoped to your monthly spend and how much of the funnel you want run, and they're month to month — management fee only, never a cut of ad spend. Tell me your budget and what you need covered and I'll quote it in the first conversation.",
  },
  {
    q: "Do you make the creative?",
    a: "I own creative strategy and direction — the hooks, angles, formats and testing plan — and work with your design and video team, or mine. I'm not a production studio, and I'd rather be honest about that than sell you volume you don't need.",
  },
  {
    q: "Which categories do you work with?",
    a: "D2C and ecommerce, consumer apps and fintech, home services and home improvement, consumer EdTech, fitness and retail, local call-driven businesses, and creators. If your category isn't there, ask — the structural problems repeat more than people expect.",
  },
  {
    q: "Which markets and timezones?",
    a: "I've run US, Canada, European and Indian accounts, and I'm based in Bengaluru. I keep overlapping hours with North American teams — that's how the Pella, Enercare and MoneyLion accounts ran.",
  },
  {
    q: "How quickly do results show up?",
    a: "Tracking and structural fixes usually show inside the first few weeks because they're mostly waste removal. Meaningful efficiency gains take a testing cycle or two — the JetLearn scale-up ran over nine months. Anyone promising a transformation in thirty days is selling you the first month.",
  },
  {
    q: "I'm B2B. Can you help?",
    a: "Yes, but not here. B2B SaaS, ABM and pipeline work live on muneebsyed29.com — different problems, different playbook.",
  },
];
