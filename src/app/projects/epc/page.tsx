import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Cog, Package, HardHat, FileCheck, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "EPC Projects",
  description: "R R Equicons offers end-to-end EPC services for roads, bridges, buildings, and industrial infrastructure.",
};

const whyUs = [
  "Single point of accountability — no finger-pointing across vendors",
  "Optimized design-build interface — engineering decisions informed by execution reality",
  "Faster timelines — overlapping design and construction phases",
  "Cost certainty — fixed-price commercial models available",
];

const sectors = [
  { title: "Roads & Highways", desc: "State highways, district roads, urban arterials" },
  { title: "Bridges & Culverts", desc: "RCC, prestressed, steel composite" },
  { title: "Industrial Buildings", desc: "Factories, warehouses, workshops" },
  { title: "Commercial Buildings", desc: "Offices, retail, mixed-use" },
  { title: "Residential", desc: "Townships, staff quarters, group housing" },
  { title: "Water & Sanitation", desc: "Pipelines, treatment plants, drainage" },
  { title: "Institutional", desc: "Schools, hospitals, religious complexes" },
];

const process = [
  { icon: Cog, step: "1", title: "Engineering & Design", desc: "Concept development, feasibility studies, detailed engineering drawings, BOQ preparation.", color: "from-blue-500/10 to-blue-600/5" },
  { icon: Package, step: "2", title: "Procurement", desc: "Vendor evaluation, material sourcing, quality verification, just-in-time logistics.", color: "from-emerald-500/10 to-emerald-600/5" },
  { icon: HardHat, step: "3", title: "Construction", desc: "Mobilization, self-performed execution, multi-stage QA/QC, daily progress tracking.", color: "from-amber-500/10 to-amber-600/5" },
  { icon: FileCheck, step: "4", title: "Commissioning & Handover", desc: "Testing, snag-list closure, as-built documentation, training, warranty support.", color: "from-purple-500/10 to-purple-600/5" },
];

export default function EPCPage() {
  return (
    <>
      <HeroSection title="End-to-End EPC. One Team. One Accountability." compact />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="What is EPC?" tag="Overview" centered={false} />
            <p className="text-text-light leading-relaxed text-[15px] mb-14">
              <strong className="text-text">Engineering, Procurement, and Construction</strong> is a turnkey contracting model where a single contractor takes responsibility for the entire project lifecycle — from design through commissioning. It&apos;s the model demanding clients prefer when they want certainty on cost, schedule, and quality.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="Why R R Equicons for EPC?" tag="Advantages" centered={false} />
          </ScrollReveal>
          <div className="space-y-3 mb-14">
            {whyUs.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex items-start gap-3 card-premium p-5">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-text-light text-[15px]">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Sectors We Serve via EPC" tag="Sectors" />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((s, i) => (
              <ScrollReveal key={i} animation="scale-in" delay={i * 60}>
                <div className="card-premium p-5">
                  <h3 className="font-bold text-primary-dark mb-1">{s.title}</h3>
                  <p className="text-sm text-text-muted">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Our EPC Process" tag="How We Work" />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className={`card-premium text-center p-6 bg-gradient-to-br ${p.color}`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-[10px] font-black text-accent mb-1 tracking-[0.2em]">STEP {p.step}</div>
                  <h3 className="font-bold text-primary-dark mb-2">{p.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Discuss Your EPC Requirement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
