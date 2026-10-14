import type { Metadata } from "next";
import { Figtree, Caveat } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GtmHead, GtmNoScript } from "@/components/gtm";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/* The site's one typeface: Figtree carries headlines, body, labels and figures
   (with tabular numbers). Picked as the closest free match to Circular, over
   Plus Jakarta Sans, Albert Sans, Outfit, DM Sans and Onest: round, open and
   easy to read at small sizes, which suits the daylight look. Display headlines
   set it at 800 with tight tracking to keep their weight. Loaded as a variable
   font, so every weight is one file; the B2C sub-brand shares it. */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

/* The sky redesign's handwritten voice: the chalk-marker notes from the banner.
   Annotation only, so two weights are enough. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  /* Google ignores this tag; kept short for the engines that still read it. */
  keywords: [
    "B2B SaaS paid media",
    "paid media consultant",
    "B2B SaaS growth",
    "demand generation",
    "performance marketing",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  /* Explicit canonical. Without it the page emitted none, which left Google to
     pick between the apex and www itself. */
  alternates: { canonical: siteConfig.url },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${caveat.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <GtmHead />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GtmNoScript />
        {/* Each site tree owns its own look: the B2B portfolio is the
            daylight sky system, B2C is always dark. Neither has a toggle. */}
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
