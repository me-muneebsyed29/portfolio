import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GtmHead, GtmNoScript } from "@/components/gtm";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/* The studio site sets in two faces. Manrope carries body copy, labels and
   small figures (with tabular numbers); loaded as a variable font, so every
   weight is one file. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

/* Cormorant Garamond is the display voice: headlines, big figures, pull
   quotes. A classic Garamond cut with a real italic, which is where the taupe
   accent lives. Set at 500 so its fine strokes hold up on the dark ground. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
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
      className={`${manrope.variable} ${cormorant.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <GtmHead />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GtmNoScript />
        {/* Each site tree owns its own look: the B2B portfolio is the
            studio system (charcoal and taupe), B2C is its own dark sub-brand.
            Neither has a toggle. */}
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
