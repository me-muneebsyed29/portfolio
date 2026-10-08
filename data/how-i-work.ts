export type DoodleId = "loop" | "arrow" | "megaphone" | "coins";

/* The four things checked before touching an ad account. Each note carries
   a chalk doodle in place of the old Fig. diagrams. */
export const howIWork: { doodle: DoodleId; title: string; body: string }[] = [
  {
    doodle: "loop",
    title: "Growth is one machine.",
    body: "Channels, creative, pricing and product all feed the same engine. Tune one alone and the whole thing still sputters.",
  },
  {
    doodle: "arrow",
    title: "Speed of learning wins.",
    body: "AI makes testing, writing and analysis cheap. The team that learns fastest beats the team that spends most.",
  },
  {
    doodle: "megaphone",
    title: "Ads amplify. They don’t fix.",
    body: "Budget speeds up a funnel that already converts. It can’t rescue a weak offer.",
  },
  {
    doodle: "coins",
    title: "Start with the business model.",
    body: "I look at unit economics, sales motion and retention first. The biggest lever is rarely inside the ad account.",
  },
];
