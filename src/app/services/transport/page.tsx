import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Package, MapPin, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Transport & Logistics",
  description: "R R Equicons provides reliable heavy transport and logistics services.",
};

const fleet = ["Hyva Dumpers (10-25 ton capacity)", "Tippers", "Trailers for heavy equipment movement", "Transit mixers", "Material transport trucks"];
const cargo = ["Construction aggregates (sand, stone, gravel)", "Ready-mix concrete", "Steel and structural materials", "Heavy machinery and equipment", "Bulk construction supplies"];
const areas = ["Jharkhand", "Bihar", "Odisha", "West Bengal", "PAN India (on request)"];

export default function TransportPage() {
  return (
    <>
      <HeroSection title="Heavy Loads. Reliable Delivery." compact />

      <section className="py-14 sm:py-24 bg-white construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14">
              Construction runs on logistics. Our transport division — built to support our own projects — also serves external clients who need reliable, on-time movement of heavy materials and equipment.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-8 mb-14">
            <ScrollReveal>
              <div className="card-premium p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-black text-primary-dark">Our Fleet</h3>
                </div>
                <ul className="space-y-2.5">
                  {fleet.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-text-light text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="card-premium p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-black text-primary-dark">What We Move</h3>
                </div>
                <ul className="space-y-2.5">
                  {cargo.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-text-light text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="card-premium p-6 mb-10 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-black text-primary-dark">Service Area</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((area, i) => (
                  <span key={i} className="bg-white px-4 py-2 rounded-xl text-sm text-text-light border border-gray-100 font-medium shadow-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Request Transport Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
