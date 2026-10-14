import type { PlatformId } from "@/components/brand/platform-logos";

/* Platform certifications, from Muneeb's CV and LinkedIn. IDs are shown so
   anyone can verify them. */
export const certifications: { name: string; issuer: string; platform: PlatformId; short: string; id?: string }[] = [
  { name: "Meta Certified Media Buyer", issuer: "Meta", platform: "meta", short: "Meta", id: "CF01161622" },
  { name: "TikTok Certified Media Buyer", issuer: "TikTok", platform: "tiktok", short: "TikTok", id: "117120670" },
  { name: "Snapchat Ads Certified", issuer: "Snap Inc.", platform: "snapchat", short: "Snapchat", id: "343118674" },
  { name: "Pinterest Certified", issuer: "Pinterest", platform: "pinterest", short: "Pinterest" },
];

/* Where Muneeb has worked, newest first. */
export const career: { org: string; role: string; period: string }[] = [
  { org: "TripleDart", role: "Senior Specialist, Paid Media", period: "2026 to now" },
  { org: "GALE Partners", role: "Senior Associate, Paid Media", period: "2024 to 2026" },
  { org: "Zeta Global", role: "Senior Associate, Paid Media", period: "2023 to 2024" },
  { org: "Growth Hackers Digital", role: "Performance Marketing Specialist", period: "2022 to 2023" },
  { org: "Freelance", role: "Performance and growth marketing", period: "2020 to 2023" },
];
