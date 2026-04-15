import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Civil Construction Services",
  description: "R R Equicons offers comprehensive civil construction services across India.",
};

const services = [
  { title: "Roads & Pavements", desc: "Bituminous, concrete, WBM, GSB — built to last with rigorous material testing.", color: "from-blue-500/10 to-blue-600/5" },
  { title: "Buildings", desc: "RCC structures from foundation to finishing — residential, commercial, and industrial.", color: "from-emerald-500/10 to-emerald-600/5" },
  { title: "Bridges & Underpasses", desc: "Engineered for load, span, and longevity with proven construction methods.", color: "from-amber-500/10 to-amber-600/5" },
  { title: "Drainage & Storm Water", desc: "Comprehensive drainage solutions for urban and industrial sites.", color: "from-purple-500/10 to-purple-600/5" },
  { title: "Site Development & Earthworks", desc: "Land grading, cutting & filling, and site preparation for construction.", color: "from-rose-500/10 to-rose-600/5" },
  { title: "Industrial Civil Works", desc: "Specialized civil works for factories, plants, and industrial facilities.", color: "from-cyan-500/10 to-cyan-600/5" },
];

export default function ConstructionPage() {
  return (
    <>
      <HeroSection title="Civil Construction Done Right." compact />

      <section className="py-14 sm:py-24 bg-white construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14">
              Roads that hold up. Buildings that stand strong. Bridges that last generations. Our civil construction practice is the heart of R R Equicons — backed by our equipment, our engineers, and our refusal to cut corners.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="What We Build" tag="Core Services" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`card-premium p-6 bg-gradient-to-br ${s.color}`}>
                  <h3 className="font-bold text-primary-dark mb-1">{s.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="card-premium p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <h3 className="text-xl font-black text-primary-dark mb-3">Our Approach</h3>
              <p className="text-text-light leading-relaxed text-[15px] mb-6">
                Every project starts with understanding the client&apos;s vision and ends with a structure that exceeds it. In between: rigorous planning, disciplined execution, and constant communication.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                Request a Site Visit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
