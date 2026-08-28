import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { B2CNav } from "@/components/b2c/nav";
import { B2CFooter } from "@/components/b2c/footer";
import { b2cConfig } from "@/lib/b2c-config";

/* Loaded here rather than in the root layout so the B2B site doesn't pay for a
   font it never renders. The B2B site moved to Instrument Sans with the rev 01
   brand system; this sub-brand is not on that system and stays on Figtree.
   JetBrains Mono now comes from the root layout, which the brand system needs
   for figures anyway, so it is no longer loaded twice. */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(b2cConfig.url),
  title: {
    // `absolute` opts out of the root layout's B2B title template, which would
    // otherwise append "— Muneeb Syed" a second time.
    absolute: b2cConfig.title,
    template: `%s — ${b2cConfig.name}`,
  },
  description: b2cConfig.description,
  keywords: [
    "consumer paid media",
    "D2C performance marketing",
    "Meta Ads freelancer",
    "Google Ads consultant",
    "TikTok Ads",
    "app install campaigns",
    "ROAS",
    "customer acquisition cost",
  ],
  authors: [{ name: b2cConfig.name, url: b2cConfig.url }],
  creator: b2cConfig.name,
  /* The apex domain also serves this tree at /b2c, so point canonical at the
     subdomain to keep the two from competing in search. */
  alternates: { canonical: b2cConfig.url },
  openGraph: {
    type: "website",
    url: b2cConfig.url,
    title: b2cConfig.title,
    description: b2cConfig.description,
    siteName: `${b2cConfig.name} — Consumer`,
  },
  twitter: {
    card: "summary_large_image",
    title: b2cConfig.title,
    description: b2cConfig.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${b2cConfig.name} — Consumer Performance Marketing`,
  description: b2cConfig.description,
  url: b2cConfig.url,
  email: b2cConfig.email,
  founder: { "@type": "Person", name: b2cConfig.name, url: b2cConfig.b2bUrl },
  areaServed: ["US", "CA", "IN"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [b2cConfig.linkedin, b2cConfig.b2bUrl],
};

export default function B2CLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`b2c ${figtree.variable} flex min-h-screen flex-col bg-background text-foreground`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <B2CNav />
      <main className="flex-1">{children}</main>
      <B2CFooter />
    </div>
  );
}
