import type { Metadata } from "next";
import { CheckCircle, Bell } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Real Estate Development",
  description: "R R Equicons real estate vertical — quality-first developments in Jharkhand.",
};

const approach = [
  { title: "Quality-First Construction", desc: "Built by the same teams that deliver our EPC projects.", color: "from-blue-500/10 to-blue-600/5" },
  { title: "Thoughtful Design", desc: "Spaces that work for how people actually live and work.", color: "from-emerald-500/10 to-emerald-600/5" },
  { title: "Trusted Partnerships", desc: "Collaborations with reputed architects and consultants.", color: "from-amber-500/10 to-amber-600/5" },
  { title: "Transparent Dealings", desc: "Clear pricing, clear timelines, clear documentation.", color: "from-purple-500/10 to-purple-600/5" },
];

const interestFields = [
  { name: "name", label: "Your Name", type: "text" as const, required: true, placeholder: "Full Name" },
  { name: "email", label: "Email", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "interest", label: "Project Interest", type: "select" as const, required: true, options: ["Residential Plots", "Apartments", "Commercial Space", "Other"] },
];

export default function RealEstatePage() {
  return (
    <>
      <HeroSection title="Building Spaces Where Lives Happen." compact />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14">
              Our real estate vertical brings together everything R R Equicons has learned about construction — and channels it into homes, workplaces, and communities designed for the next generation.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="Our Approach" tag="Philosophy" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {approach.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`card-premium flex items-start gap-4 p-6 bg-gradient-to-br ${item.color}`}>
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-text mb-0.5">{item.title}</h3>
                    <p className="text-sm text-text-light">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="card-premium p-8 mb-14 bg-gradient-to-r from-primary/5 to-accent/5">
              <h3 className="text-xl font-black text-primary-dark mb-3">Upcoming Projects</h3>
              <p className="text-text-light text-[15px]">
                Exciting residential and commercial projects are in the planning stage. Register your interest below to be the first to know when we launch.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="card-premium p-8 !shadow-2xl !shadow-black/5">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-black text-primary-dark">Register Your Interest</h3>
              </div>
              <ContactForm fields={interestFields} submitLabel="Notify Me About Launches" compact source="Real Estate Interest" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
