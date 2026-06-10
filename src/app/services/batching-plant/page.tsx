import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, FlaskConical, Truck, HeadphonesIcon, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Batching Plant (Ready-Mix Concrete)",
  description: "R R Equicons operates state-of-the-art RMC batching plants.",
};

const capabilities = [
  { label: "Grades", value: "M10 through M60+ (custom mix designs available)" },
  { label: "Output", value: "60 m³/hour capacity" },
  { label: "Quality Control", value: "In-house lab with cube testing, slump testing, aggregate analysis" },
  { label: "Logistics", value: "Owned transit mixer fleet for on-time delivery within Jamshedpur region" },
];

const whyChoose = [
  { icon: Gauge, title: "Precision Mix Designs", desc: "Every batch is consistent, computer-controlled for exact specifications.", color: "from-blue-500/10 to-blue-600/5" },
  { icon: FlaskConical, title: "Certified Materials", desc: "Aggregates, cement, and admixtures from approved sources only.", color: "from-emerald-500/10 to-emerald-600/5" },
  { icon: Truck, title: "On-Time Delivery", desc: "Owned fleet, not outsourced — reliability you can count on.", color: "from-amber-500/10 to-amber-600/5" },
  { icon: HeadphonesIcon, title: "Technical Support", desc: "Our engineers help optimize your concrete specifications.", color: "from-purple-500/10 to-purple-600/5" },
];

export default function BatchingPlantPage() {
  return (
    <>
      <HeroSection title="Concrete You Can Count On." compact />

      <section className="py-14 sm:py-24 bg-white construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14">
              Our state-of-the-art ready-mix concrete (RMC) plants deliver computer-controlled batching for concrete that&apos;s consistent, certified, and delivered when you need it.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="Capabilities" tag="Specifications" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-premium p-5">
                  <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">{c.label}</div>
                  <p className="text-text-light text-sm">{c.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <SectionHeading title="Why Choose Our RMC?" tag="Advantages" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {whyChoose.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`card-premium flex gap-4 p-6 bg-gradient-to-br ${item.color}`}>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">{item.title}</h3>
                    <p className="text-sm text-text-light">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="card-premium p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <h3 className="text-lg font-black text-primary-dark mb-2">Who We Serve</h3>
              <p className="text-text-light leading-relaxed mb-6 text-[15px]">
                Construction contractors, real estate developers, industrial clients, and government projects.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                Request RMC Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
