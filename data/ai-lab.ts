export type LabProject = {
  /* No "AI" in the names: the section heading already says it. */
  name: string;
  oneLiner: string;
  status: "Testing" | "In build";
};

export const labProjects: LabProject[] = [
  { name: "Creative Analyzer", oneLiner: "Scores an ad before it spends a dollar.", status: "Testing" },
  { name: "Media Buyer", oneLiner: "Moves budget to what’s working, every day.", status: "In build" },
  { name: "Campaign Planner", oneLiner: "Give it a target CAC. Get a media plan back.", status: "Testing" },
  { name: "Attribution", oneLiner: "Separates real lift from noise.", status: "In build" },
  { name: "Landing Page Auditor", oneLiner: "Finds the leaks before you run a test.", status: "Testing" },
];
