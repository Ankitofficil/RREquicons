import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Google Analytics 4 measurement ID. Override per-environment with
// NEXT_PUBLIC_GA_ID; set it to an empty string to disable analytics entirely.
const gaId =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-CG9ZX6V7LX";

// Kept under ~60 characters so Google shows it without truncating.
const siteTitle = "Ready-Mix Concrete & Construction, Jamshedpur";
const siteDescription =
  "Ready-Mix Concrete supplier and civil construction company in Jamshedpur. M10–M60+ concrete from our own batching plant, delivered by our transit-mixer fleet.";

export const metadata: Metadata = {
  // Resolves all relative URLs below (and in per-page metadata) to absolute
  // ones — required for valid Open Graph / canonical tags in production.
  metadataBase: new URL(siteUrl),
  title: {
    // `default` bypasses `template`, so the homepage title carries the brand
    // itself. Child pages get "<their title> | R R Equicons Pvt Ltd".
    default: `R R Equicons | ${siteTitle}`,
    template: "%s | R R Equicons Pvt Ltd",
  },
  description: siteDescription,
  // No canonical here on purpose: metadata is inherited, so a canonical set
  // in the root layout would make every page claim to be the homepage and
  // stop the inner pages being indexed. Each page sets its own.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_IN",
    images: [
      {
        url: "/rr-equicons-hq.png",
        width: 1070,
        height: 800,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/rr-equicons-hq.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  keywords: [
    "ready mix concrete Jamshedpur",
    "RMC supplier Jharkhand",
    "batching plant Jamshedpur",
    "M20 M25 concrete supplier",
    "transit mixer concrete delivery",
    "civil construction company Jamshedpur",
    "EPC contractor Jharkhand",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#06111f" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before paint to set the theme class from a saved choice or the OS
// preference — prevents a flash of the wrong theme (FOUC).
const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

// Structured data so search engines can show the company as a local business
// (address, phone, hours) in rich results.
const structuredData = {
  "@type": "GeneralContractor",
  name: site.name,
  description: siteDescription,
  url: siteUrl,
  telephone: `+${site.phoneE164}`,
  email: site.email.general,
  image: `${siteUrl}/rr-equicons-hq.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.lines.slice(0, 3).join(", "),
    addressLocality: "Jamshedpur",
    addressRegion: "Jharkhand",
    postalCode: "831006",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "State", name: "Jharkhand" },
    { "@type": "State", name: "Bihar" },
    { "@type": "City", name: "Jamshedpur" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "18:30",
    },
  ],
  foundingDate: "2013",
  knowsAbout: [
    "Ready-Mix Concrete",
    "Civil Construction",
    "EPC Contracting",
    "Road Construction",
    "Bridge Construction",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      ["Ready-Mix Concrete (RMC) Supply", "/services/batching-plant"],
      ["Civil Construction", "/services/construction"],
      ["Transport & Logistics", "/services/transport"],
      ["Real Estate Development", "/services/real-estate"],
      ["EPC Contracting", "/projects/epc"],
    ].map(([name, path]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, url: `${siteUrl}${path}` },
    })),
  },
};

// Names the site itself, so search engines can attribute pages to one entity
// rather than treating each as standalone.
const websiteData = {
  "@type": "WebSite",
  name: site.name,
  url: siteUrl,
  publisher: { "@type": "Organization", name: site.name },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [structuredData, websiteData],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
      {/* Loads gtag.js after hydration, so analytics never blocks first paint.
          Only rendered in production with an ID configured, to keep local and
          preview traffic out of the reporting. */}
      {gaId && process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={gaId} />
      )}
    </html>
  );
}
