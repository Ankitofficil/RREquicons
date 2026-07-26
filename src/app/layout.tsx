import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "R R Equicons Pvt Ltd | Ready-Mix Concrete & Civil Construction, Jamshedpur",
    template: "%s | R R Equicons Pvt Ltd",
  },
  description:
    "Ready-Mix Concrete (RMC) supplier and civil construction company in Jamshedpur. Computer-controlled M10–M60+ concrete from our own batching plant, delivered on time by our owned transit-mixer fleet across Jharkhand.",
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
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
