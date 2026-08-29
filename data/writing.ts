import type { FigureId } from "@/components/brand/figures";

/*
 * Essays are stored as typed blocks rather than markdown: it keeps the renderer
 * free of a parser dependency, and it means a pull quote or a stat line can only
 * be set the way the brand system allows.
 */
export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Essay = {
  slug: string;
  title: string;
  excerpt: string;
  standfirst: string;
  readingTime: string;
  date: string;
  /* Every essay opens on a figure from the illustration set. */
  figure: FigureId;
  figureCaption: string;
  body: EssayBlock[];
};

export const essays: Essay[] = [
  {
    slug: "paid-media-needs-an-operating-system",
    title: "Paid Media Needs an Operating System",
    excerpt:
      "Most accounts are a pile of campaigns, not a system. Here's the difference, and why it compounds.",
    standfirst:
      "Two accounts can spend the same money on the same channels and end up in completely different places. The difference is almost never the campaigns.",
    readingTime: "6 min",
    date: "2026-07-14",
    figure: "flagged-row",
    figureCaption: "The line item nobody read",
    body: [
      {
        type: "p",
        text: "Every account I inherit looks busy. Dozens of campaigns, hundreds of ad groups, a naming convention that made sense to someone in 2023. Busy is easy. What is almost always missing is a set of rules that decides what happens next.",
      },
      {
        type: "p",
        text: "That set of rules is the operating system. Without it, an account is a pile of decisions made by different people on different Tuesdays, none of which can be reconstructed six months later.",
      },
      { type: "h2", text: "A pile versus a system" },
      {
        type: "p",
        text: "A pile of campaigns produces results. It just cannot tell you why. When performance improves, nobody can name the cause, so nobody can repeat it. When it degrades, the response is to add more campaigns, which makes the pile larger and the signal worse.",
      },
      {
        type: "p",
        text: "A system produces the same results and a reason. The reason is what compounds. It is the difference between an account that is 20% better every quarter and one that is 20% better once and then drifts.",
      },
      {
        type: "quote",
        text: "A pile of campaigns produces results. It just cannot tell you why.",
      },
      { type: "h2", text: "What the operating system actually contains" },
      {
        type: "p",
        text: "Four things, and they fit on one page. If they do not fit on one page, they will not survive contact with a busy quarter.",
      },
      {
        type: "list",
        items: [
          "A measurement contract. One definition of a conversion, one source of truth, and a written note of what the platform numbers will overstate and by roughly how much. Agreed before the spend, not after the argument.",
          "A testing cadence. How many tests run at once, how long each runs, and the threshold at which you call it. Written down, because the threshold you choose after seeing the data is not a threshold.",
          "A budget rule. What triggers an increase, what triggers a cut, and who is allowed to make the call without a meeting. Most accounts have no rule here, which is why budget moves on sentiment.",
          "A kill list. The things you have already tested and will not test again this year, with the date and the result. This is the most valuable page and the one nobody keeps.",
        ],
      },
      { type: "h2", text: "Why the kill list matters most" },
      {
        type: "p",
        text: "Teams re-run the same failed test roughly every eighteen months, because the person who ran it the first time has moved on and the result lived in their head. I have watched a company test the same broad-match expansion three times in four years. It lost money on all three occasions.",
      },
      {
        type: "p",
        text: "The kill list turns a team's experience into the account's experience. It is also the cheapest thing on this list to maintain — a shared document and ten minutes at the end of a test.",
      },
      { type: "h2", text: "The compounding part" },
      {
        type: "p",
        text: "None of this makes any single quarter dramatically better. That is the honest version. What it does is stop each quarter starting from zero.",
      },
      {
        type: "p",
        text: "An account with an operating system carries its learning forward. Two years in, it is running tests the competition has not thought to run yet, because it stopped re-running the obvious ones a long time ago. That gap is very hard to close with budget.",
      },
      {
        type: "p",
        text: "Start with the measurement contract. Everything else is guesswork until the numbers mean the same thing to everyone reading them.",
      },
    ],
  },

  {
    slug: "ai-changes-demand-generation",
    title: "AI Changes Demand Generation",
    excerpt:
      "Not by replacing marketers — by collapsing the cost of testing until speed of learning becomes the moat.",
    standfirst:
      "The interesting question was never whether AI can write an ad. It is what happens to a team when producing the fortieth variant costs the same as the first.",
    readingTime: "7 min",
    date: "2026-06-02",
    figure: "delta",
    figureCaption: "Before and after the cost of a test collapsed",
    body: [
      {
        type: "p",
        text: "Most of the AI conversation in marketing is about output. Can it write the email, can it cut the video, can it build the landing page. The answer is broadly yes, at a quality that is fine and rarely better than fine.",
      },
      {
        type: "p",
        text: "That is not the part that changes anything. The part that changes things is arithmetic.",
      },
      { type: "h2", text: "What actually got cheaper" },
      {
        type: "p",
        text: "A creative test used to carry a fixed cost that had nothing to do with media spend: a brief, a designer, a review cycle, a week. That fixed cost is why teams tested four concepts a quarter instead of forty. Not caution — overhead.",
      },
      {
        type: "p",
        text: "When the overhead falls far enough, the constraint moves. It is no longer how many ideas you can produce. It is how many you can judge.",
      },
      {
        type: "quote",
        text: "The constraint moved from producing ideas to judging them. Most teams have not rebuilt around the new constraint.",
      },
      { type: "h2", text: "The new bottleneck is judgment" },
      {
        type: "p",
        text: "Forty variants against a budget that could only ever resolve four is not forty tests. It is four tests and thirty-six pieces of noise, and the noise makes the four harder to read.",
      },
      {
        type: "p",
        text: "This is where I see teams go wrong with AI. They scale production, hold the budget flat, and end up with less signal than they had before. Volume without a decision rule is worse than no volume.",
      },
      {
        type: "p",
        text: "The teams that get value from this do something less exciting. They decide what a winner looks like before they generate anything, then use AI to fill the pipeline behind that filter.",
      },
      { type: "h2", text: "Where I actually use it" },
      {
        type: "list",
        items: [
          "Pre-flight scoring. Rank variants against what has already worked in the account before any of them spend. Cheap, and it kills the obvious losers before they cost anything.",
          "Reading the account. Summarizing three months of performance into the four things that changed. This is genuinely tedious work and AI is genuinely good at it.",
          "First drafts of the boring assets. Not the hero concept — the eleven variations on a concept that already won.",
          "Structured research. Turning fifty sales calls into the six objections that actually recur, with counts.",
        ],
      },
      {
        type: "p",
        text: "The pattern: AI on the parts where volume helps and judgment is cheap. Humans on the parts where one decision sets the direction for a quarter.",
      },
      { type: "h2", text: "What it does not fix" },
      {
        type: "p",
        text: "A weak offer generated forty ways is still a weak offer. Broken tracking produces confident nonsense faster. A sales team that takes three days to call a lead will take three days to call an AI-generated lead.",
      },
      {
        type: "p",
        text: "AI compresses the cost of learning. It has no opinion about whether the thing you are learning is worth knowing. That part is still the job.",
      },
    ],
  },

  {
    slug: "building-growth-systems",
    title: "Building Growth Systems",
    excerpt:
      "A practical framework for treating growth as inputs and outputs instead of a list of tactics.",
    standfirst:
      "Tactics do not survive a change in market conditions. Systems do, because a system knows what it is for.",
    readingTime: "6 min",
    date: "2026-04-21",
    figure: "gap",
    figureCaption: "Two systems facing each other and not touching",
    body: [
      {
        type: "p",
        text: "Ask most teams what their growth strategy is and you get a list: LinkedIn ads, a webinar series, an SEO push, outbound. That is not a strategy. It is an inventory.",
      },
      {
        type: "p",
        text: "A system is different in one specific way. It states what it turns into what, and at what rate. Everything else follows from that.",
      },
      { type: "h2", text: "Start at the end" },
      {
        type: "p",
        text: "Write down the revenue number and work backwards through the arithmetic until you hit something you can buy. Revenue, average deal, deals needed, opportunities, qualified leads, raw leads. Six numbers.",
      },
      {
        type: "p",
        text: "Two things happen when you do this honestly. The first is that the plan usually turns out to be impossible at the current conversion rates, which is useful to know in January rather than October. The second is that you find out which rate matters most.",
      },
      {
        type: "quote",
        text: "The plan is usually impossible at current conversion rates. Better to find that out in January.",
      },
      { type: "h2", text: "Find the binding constraint" },
      {
        type: "p",
        text: "In every funnel one number is doing the damage. Not four — one. Doubling lead volume when the sales team already cannot work the leads it has produces nothing except a worse cost per opportunity.",
      },
      {
        type: "p",
        text: "The binding constraint is rarely the one people want it to be. It is usually further down the funnel than the marketing team's remit, which is exactly why it stays unfixed. I have seen more revenue unlocked by a follow-up rule than by a budget increase.",
      },
      { type: "h2", text: "Then instrument it" },
      {
        type: "p",
        text: "A system you cannot see is a hypothesis. Before adding spend, I want each of those six numbers visible weekly, from one source, with an owner.",
      },
      {
        type: "list",
        items: [
          "One source of truth. If marketing and sales quote different numbers, every meeting becomes a debate about the numbers rather than a decision.",
          "Weekly, not monthly. A monthly cadence means a bad change runs for four weeks before anyone notices.",
          "An owner per rate. Not per channel — per conversion rate. Channels have owners already; the handoffs between them do not, which is where things leak.",
        ],
      },
      { type: "h2", text: "Only then, spend" },
      {
        type: "p",
        text: "Paid media is an accelerator. It makes whatever the system already does happen faster, including the parts that lose money. Pointing budget at a funnel with a broken handoff buys you a more expensive version of the same problem.",
      },
      {
        type: "p",
        text: "This is why I look at the business economics before touching a campaign. Not out of thoroughness — because the campaign is often not where the answer is.",
      },
    ],
  },

  {
    slug: "optimize-revenue-not-clicks",
    title: "Optimize Revenue, Not Clicks",
    excerpt:
      "Why the metrics most teams optimize for are several steps removed from the number that actually matters.",
    standfirst:
      "Every metric in an ad account is a proxy. The question is how many steps sit between the proxy and the money.",
    readingTime: "5 min",
    date: "2026-03-09",
    figure: "narrowing",
    figureCaption: "Volume in, less volume out, and where it happens",
    body: [
      {
        type: "p",
        text: "Click-through rate is a proxy for interest. Cost per lead is a proxy for efficiency. Both are several steps removed from revenue, and every step is a place where the relationship can break.",
      },
      {
        type: "p",
        text: "This is not an argument for ignoring them. They are fast, and revenue is slow. It is an argument for knowing exactly how far from the money each one sits.",
      },
      { type: "h2", text: "How the break happens" },
      {
        type: "p",
        text: "A campaign optimizing for cost per lead will find you cheap leads. It is very good at this. It will find the audiences that fill in forms, which is a different population from the audiences that buy.",
      },
      {
        type: "p",
        text: "Six weeks later cost per lead is down 30% and pipeline is flat, and the account looks like it is working. Nothing malfunctioned. The system optimized precisely for what it was asked to optimize for.",
      },
      {
        type: "quote",
        text: "Cost per lead down 30%, pipeline flat. Nothing malfunctioned — the system optimized for exactly what it was asked to.",
      },
      { type: "h2", text: "Move the target down the funnel" },
      {
        type: "p",
        text: "The fix is not a better proxy. It is a proxy closer to the money, fed back to the platform.",
      },
      {
        type: "list",
        items: [
          "Send qualified leads back, not raw leads. Even a crude qualification flag changes what the algorithm chases.",
          "Where volume allows, send closed-won and deal value. Sparse but honest beats dense and misleading.",
          "Weight by segment when data is thin. If enterprise deals are worth 8x, say so, rather than waiting for enough conversions to prove it.",
        ],
      },
      {
        type: "p",
        text: "There is a real trade-off. Optimizing on a downstream event with a long sales cycle means slower learning and a noisier signal. In a business with a ninety-day cycle you cannot wait for closed-won to steer daily decisions.",
      },
      {
        type: "p",
        text: "So you use both. The fast proxy to steer the week, the slow number to check the quarter — and when they disagree, the slow one wins.",
      },
      { type: "h2", text: "The uncomfortable version" },
      {
        type: "p",
        text: "Optimizing for revenue usually makes the dashboard look worse. Cost per lead goes up. Volume goes down. The chart that used to be green is no longer green.",
      },
      {
        type: "p",
        text: "That conversation is easier to have before you change the target than after. Agree with whoever reads the dashboard on what success looks like, and get it in writing, because in eight weeks somebody is going to ask why leads are down.",
      },
    ],
  },
];
