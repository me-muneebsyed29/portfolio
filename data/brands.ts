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
 * "what you ran · market", e.g. "Paid media · US". Empty until Muneeb fills
 * them in; without one the note shows the site address.
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
    { slug: "pella", name: "Pella", site: "pella.com" },
    { slug: "planet-fitness", name: "Planet Fitness", site: "planetfitness.com" },
    { slug: "universal-robots", name: "Universal Robots", site: "universal-robots.com" },
    { slug: "rocket-software", name: "Rocket Software", site: "rocketsoftware.com" },
    { slug: "creative-planning", name: "Creative Planning", site: "creativeplanning.com" },
    { slug: "enercare", name: "Enercare", site: "enercare.ca" },
  ],
  [
    { slug: "time-doctor", name: "Time Doctor", site: "timedoctor.com" },
    { slug: "wingify", name: "Wingify", site: "wingify.com" },
    { slug: "lightyear", name: "Lightyear", site: "lightyear.ai" },
    { slug: "culturex", name: "CultureX", site: "culturex.ai" },
    { slug: "datamoon", name: "Datamoon", site: "datamoon.com" },
    { slug: "mudrex", name: "Mudrex", site: "mudrex.com" },
  ],
  [
    { slug: "jetlearn", name: "JetLearn", site: "jetlearn.com" },
    { slug: "alphagen-learning", name: "AlphaGen Learning", site: "alphagenlearning.com" },
    { slug: "icodeschool", name: "iCodeSchool", site: "icodeschool.com" },
    { slug: "blue-compass-rv", name: "Blue Compass RV", site: "bluecompassrv.com" },
    { slug: "canada-masq", name: "Canada Masq", site: "canadamasq.com" },
  ],
  [
    { slug: "slow-living-stays", name: "Slow Living Stays", site: "slowlivingstays.com" },
    { slug: "inara", name: "Inara", site: "inara.store" },
    { slug: "modern-yard", name: "Modern Yard", site: "modernyard.in" },
    { slug: "home-artisan", name: "Home Artisan", site: "homeartisan.in" },
    { slug: "baby-saffron", name: "Baby Saffron", site: "babysaffron.com" },
  ],
];

export const brands = brandRows.flat();
