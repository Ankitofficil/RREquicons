import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Users, Layers, MapPin, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Construction Company in Jamshedpur",
  description:
    "Civil construction, EPC and ready-mix concrete across Jharkhand since 2013 — owned equipment fleet, in-house batching plant, ISO-aligned QHSE systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Construction Company in Jamshedpur",
    description:
      "Civil construction, EPC and ready-mix concrete across Jharkhand since 2013 — owned equipment fleet, in-house batching plant, ISO-aligned QHSE systems.",
    url: "/about",
  },
};

const numbers = [
  { icon: Calendar, value: "2013", label: "Year Founded" },
  { icon: Users, value: "100+", label: "Engineers, Operators & Skilled Workforce" },
  { icon: Layers, value: "3", label: "Active Business Verticals" },
  { icon: MapPin, value: "PAN India", label: "Operational Reach" },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection title="A Decade of Building Trust, One Project at a Time." compact />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Our Story" tag="Since 2013" centered={false} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="space-y-5 text-text-light leading-relaxed text-[15px]">
              <p>
                Founded in 2013 in Jamshedpur — the steel city that built modern India — R R Equicons Pvt Ltd began with a simple conviction: that India&apos;s infrastructure deserves contractors who treat every project as their own.
              </p>
              <p>
                What started as a regional civil works contractor has, over more than a decade, grown into a diversified construction group spanning EPC execution, ready-mix concrete production, and heavy-equipment logistics. Through every phase of growth, we have stayed anchored to the values our founders set on day one — integrity, safety, and craftsmanship.
              </p>
              <p>
                Today, R R Equicons is trusted by government bodies, industrial clients, and private developers across PAN India, with a particularly strong footprint in Jharkhand and the eastern Indian belt.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {numbers.map((n, i) => (
              <ScrollReveal key={i} animation="scale-in" delay={i * 100}>
                <div className="card-premium p-4 sm:p-6 text-center">
                  <n.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-black text-primary tracking-tight">{n.value}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-text-muted mt-1 uppercase tracking-wider leading-tight">{n.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="What Makes Us Different" tag="Our Edge" centered={false} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-text-light mb-8 text-[15px]">
              We&apos;re not the largest contractor in India — and we don&apos;t try to be. Our edge is being <strong className="text-text font-semibold">the most reliable</strong> contractor for the projects we take on. That means:
            </p>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              { bold: "Promised scope, delivered scope.", text: "No surprise change orders." },
              { bold: "Owned equipment, owned outcomes.", text: "We don't subcontract our way out of accountability." },
              { bold: "Engineers, not estimators, on site.", text: "Technical depth at every level." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100 + 200}>
                <div className="flex items-start gap-4 card-premium p-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <p className="text-text-light text-[15px]">
                    <strong className="text-text font-semibold">{item.bold}</strong> {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={500}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10">
              <Link href="/about/leadership" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group">
                Meet Our Leadership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group">
                See Our Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
