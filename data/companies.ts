import type { PlatformId } from "@/components/brand/platform-logos";

export type Tool = { id: PlatformId; name: string };
export type ToolGroup = { label: string; tools: Tool[] };

/*
 * The stack, grouped the way the work is actually divided. Client logos are
 * absent by necessity — the case studies are anonymised under NDA — so this wall
 * is the platforms and tools rather than the customers.
 */
export const toolGroups: ToolGroup[] = [
  {
    label: "Ad platforms",
    tools: [
      { id: "google-ads", name: "Google Ads" },
      { id: "meta", name: "Meta Ads" },
      { id: "linkedin", name: "LinkedIn Ads" },
      { id: "bing", name: "Bing Ads" },
      { id: "tiktok", name: "TikTok Ads" },
      { id: "reddit", name: "Reddit Ads" },
      { id: "snapchat", name: "Snapchat Ads" },
      { id: "pinterest", name: "Pinterest Ads" },
      { id: "chatgpt", name: "ChatGPT Ads" },
    ],
  },
  {
    label: "Data & GTM",
    tools: [
      { id: "ga4", name: "GA4" },
      { id: "gtm", name: "Tag Manager" },
      { id: "segment", name: "Segment" },
      { id: "amplitude", name: "Amplitude" },
      { id: "hubspot", name: "HubSpot" },
      { id: "salesforce", name: "Salesforce" },
      { id: "sixsense", name: "6sense" },
      { id: "propensity", name: "Propensity" },
      { id: "apollo", name: "Apollo" },
      { id: "clay", name: "Clay" },
      { id: "contactlevel", name: "ContactLevel" },
    ],
  },
  {
    label: "Build & automate",
    tools: [
      { id: "n8n", name: "n8n" },
      { id: "zapier", name: "Zapier" },
      { id: "claude", name: "Claude Code" },
      { id: "lovable", name: "Lovable" },
      { id: "webflow", name: "Webflow" },
      { id: "shopify", name: "Shopify" },
      { id: "gohighlevel", name: "GoHighLevel" },
      { id: "lemlist", name: "lemlist" },
    ],
  },
];
