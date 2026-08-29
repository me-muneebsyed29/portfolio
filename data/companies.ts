import type { PlatformId } from "@/components/brand/platform-logos";

export type Company = { id: PlatformId; name: string };

/* The platforms and tools the work actually runs on. Client logos are absent by
   necessity — the case studies are anonymised under NDA. */
export const companies: Company[] = [
  { id: "google-ads", name: "Google Ads" },
  { id: "meta", name: "Meta Ads" },
  { id: "linkedin", name: "LinkedIn Ads" },
  { id: "hubspot", name: "HubSpot" },
  { id: "salesforce", name: "Salesforce" },
  { id: "amplitude", name: "Amplitude" },
  { id: "segment", name: "Segment" },
  { id: "webflow", name: "Webflow" },
];
