export type LabProject = {
  name: string;
  tagline: string;
  description: string;
  status: "Experiment" | "In build";
};

/* No icons here by design: the illustration system allows six drawn figures and
   nothing else — "no metaphors", and explicitly no chart or rocket icons. Cards
   are indexed in mono instead, which is how the spec sheets number things. */
export const labProjects: LabProject[] = [
  {
    name: "AI Creative Analyzer",
    tagline: "Scores ad creative before it spends a dollar",
    description:
      "Ingests ad copy and creative, predicts fatigue and hook strength against historical performance patterns.",
    status: "Experiment",
  },
  {
    name: "AI Media Buyer",
    tagline: "Reallocates budget across channels daily",
    description:
      "A rules-plus-model layer that shifts spend toward what's working without waiting for a weekly review.",
    status: "In build",
  },
  {
    name: "AI Campaign Planner",
    tagline: "Turns a growth goal into a media plan",
    description:
      "Takes a target CAC and pipeline number and outputs a channel mix, budget curve, and testing calendar.",
    status: "Experiment",
  },
  {
    name: "AI Attribution",
    tagline: "Separates lift from noise",
    description:
      "Blends MMM and incrementality testing to explain what's actually driving pipeline, channel by channel.",
    status: "In build",
  },
  {
    name: "AI Landing Page Auditor",
    tagline: "Finds conversion leaks in seconds",
    description:
      "Crawls a landing page against CRO heuristics and flags friction points before a test is even set up.",
    status: "Experiment",
  },
];
