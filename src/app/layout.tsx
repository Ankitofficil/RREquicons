import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    default: "R R Equicons Pvt Ltd | Civil Construction & EPC Contractor in Jharkhand",
    template: "%s | R R Equicons Pvt Ltd",
  },
  description:
    "Leading civil engineering and EPC construction company based in Jamshedpur. Specializing in roads, buildings, batching plants, and infrastructure across PAN India.",
  keywords: [
    "construction company Jamshedpur",
    "EPC contractor Jharkhand",
    "civil engineering India",
    "RMC batching plant",
    "road construction",
  ],
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
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
