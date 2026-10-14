/*
 * The brands wall, in the order the sky direction doc sets: names a US or
 * Canadian SaaS buyer will recognise first, then the rest.
 *
 * Logos: drop an SVG at public/brands/<slug>.svg and set `logo: true`. At rest
 * every logo is tinted white so the wall reads as part of the sky; hover shows
 * its real colours. Until a file exists the brand's name is set in type
 * instead, in the same tint.
 *
 * `note` is the one line on the hover sticky note, in the format
 * "what you ran · market · result", e.g. "Google Ads · US · CPL −86%".
 * Without one the note shows the site address.
 *
 * `caseStudy` links a brand to its story page, once a case study can name it.
 */
export type Brand = {
  slug: string;
  name: string;
  site: string;
  logo?: boolean;
  note?: string;
  caseStudy?: string;
};

export const brandRows: Brand[][] = [
  [
    { slug: "pella", name: "Pella", site: "pella.com", note: "Paid social · US & Canada · 0.8x → 3x ROAS", caseStudy: "pella" },
    { slug: "planet-fitness", name: "Planet Fitness", site: "planetfitness.com", note: "Paid social · US · $2M+ budget" },
    { slug: "universal-robots", name: "Universal Robots", site: "universal-robots.com", note: "Campaign localisation · India" },
    { slug: "rocket-software", name: "Rocket Software", site: "rocketsoftware.com", note: "B2B ABM · Meta & LinkedIn" },
    { slug: "creative-planning", name: "Creative Planning", site: "creativeplanning.com", note: "ABM · $11M+ AUM from $90K spend" },
    { slug: "moneylion", name: "MoneyLion", site: "moneylion.com", note: "App promotion · US · 2.7x ROAS" },
    { slug: "enercare", name: "Enercare", site: "enercare.ca", note: "Paid social · Canada · $2.8M budget" },
  ],
  [
    { slug: "time-doctor", name: "Time Doctor", site: "timedoctor.com", note: "B2B SaaS pipeline · now" },
    { slug: "wingify", name: "Wingify", site: "wingify.com", note: "B2B SaaS pipeline (VWO) · now" },
    { slug: "lightyear", name: "Lightyear", site: "lightyear.ai", note: "B2B SaaS pipeline · now" },
    { slug: "culturex", name: "CultureX", site: "culturex.ai" },
    { slug: "datamoon", name: "Datamoon", site: "datamoon.com", note: "B2B SaaS pipeline · now" },
    { slug: "wework-india", name: "WeWork India", site: "wework.co.in", note: "B2B pipeline · India · now" },
    { slug: "mudrex", name: "Mudrex", site: "mudrex.com" },
  ],
  [
    { slug: "jetlearn", name: "JetLearn", site: "jetlearn.com", note: "Google Ads · Europe · CAC −65%", caseStudy: "jetlearn" },
    { slug: "alphagen-learning", name: "AlphaGen Learning", site: "alphagenlearning.com" },
    { slug: "icodeschool", name: "iCodeSchool", site: "icodeschool.com", note: "Google Ads · US · CPL −86%", caseStudy: "icode-school" },
    { slug: "blue-compass-rv", name: "Blue Compass RV", site: "bluecompassrv.com", note: "Paid social · US" },
    { slug: "canada-masq", name: "Canada Masq", site: "canadamasq.com", note: "Google Ads · Canada · 1.9x → 6.9x ROAS", caseStudy: "canadamasq" },
  ],
  [
    { slug: "slow-living-stays", name: "Slow Living Stays", site: "slowlivingstays.com", note: "Meta Ads · India · 23x ROAS", caseStudy: "slow-living-stays" },
    { slug: "inara", name: "Inara", site: "inara.store", note: "Meta Ads · India · 3x ROAS", caseStudy: "inara" },
    { slug: "modern-yard", name: "Modern Yard", site: "modernyard.in", note: "Meta Ads · India · ₹58L in 3.5 months", caseStudy: "modernyard" },
    { slug: "home-artisan", name: "Home Artisan", site: "homeartisan.in" },
    { slug: "baby-saffron", name: "Baby Saffron", site: "babysaffron.com" },
  ],
];

export const brands = brandRows.flat();
