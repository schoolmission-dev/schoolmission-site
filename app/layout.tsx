import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/nav";
import { siteLd } from "@/lib/seo";
import JsonLd from "@/components/site/JsonLd";
import TopNav from "@/components/marketing/TopNav";
import Footer from "@/components/marketing/Footer";
import "./globals.css";

// display: "swap" is next/font's default; it is written out so the choice is
// visible. Text paints in the fallback immediately and re-renders in Geist,
// rather than holding the first paint behind the font.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "SchoolMission";
const DESCRIPTION = "Community service that pays for school.";

export const metadata: Metadata = {
  // Required so the og:image picked up from app/opengraph-image.png resolves
  // to an absolute URL rather than a relative path.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  // No canonical here on purpose: metadata is inherited, so a canonical in the
  // layout would hand every page — and /_not-found — the home URL. Each route
  // declares its own.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="min-h-full flex flex-col bg-sm-cream text-sm-text">
        {/* Organisation and WebSite, on every page. Per-page nodes reference
            these by @id rather than restating them. */}
        <JsonLd data={siteLd()} />
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
