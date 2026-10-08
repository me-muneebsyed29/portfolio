import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/* The sky site's one typeface: Plus Jakarta Sans carries headlines, body,
   labels and figures (with tabular numbers). Chosen over Manrope, DM Sans,
   Onest and two serif pairings for being the softest of the clean sans faces,
   which suits the daylight look. Loaded as a variable font, so every weight
   is one file. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
      className={`${jakarta.variable} ${caveat.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Each site tree owns its own look: the B2B portfolio is the
            daylight sky system, B2C is always dark. Neither has a toggle. */}
        <Analytics />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
