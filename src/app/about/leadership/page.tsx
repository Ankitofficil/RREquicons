import type { Metadata } from "next";
import { User, Users } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Leadership & Management",
  description: "Meet the leadership team at R R Equicons Pvt Ltd.",
};

const directors = [
  {
    name: "Mr. Shubham Kamal",
    role: "Director",
    bio: "With a strong background in civil engineering and construction management, Mr. Shubham Kamal provides strategic direction and oversees the company's growth trajectory. His hands-on approach ensures that every project meets R R Equicons' exacting standards.",
    gradient: "from-blue-600/30 to-blue-900/40",
  },
  {
    name: "Ms. Vandana Mishra",
    role: "Director",
    bio: "Ms. Vandana Mishra brings operational expertise and a keen eye for detail to the company's management. Her leadership in finance, compliance, and administration has been instrumental in building R R Equicons into a trusted name in the industry.",
    gradient: "from-emerald-600/30 to-emerald-900/40",
  },
];

const managementRoles = [
  "Project Managers with PMP/equivalent certifications",
  "Site Engineers specialized in roads, buildings, and infrastructure",
  "Quantity Surveyors & Estimators",
  "QA/QC Engineers",
  "Safety Officers trained to international standards",
  "Equipment Operators licensed and experienced",
  "Procurement & Finance specialists",
];

export default function LeadershipPage() {
  return (
    <>
      <HeroSection title="The People Behind the Projects." compact />

      <section className="py-14 sm:py-24 bg-white construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14">
              Our leadership combines decades of construction expertise with hands-on operational discipline. Together, they ensure every project is backed by experienced judgment, technical rigor, and unwavering ethics.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="Leadership Team" tag="Directors" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 mb-20">
            {directors.map((d, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="card-premium overflow-hidden">
                  <div className={`h-52 bg-gradient-to-br ${d.gradient} flex items-center justify-center relative`}>
                    <User className="w-20 h-20 text-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-primary-dark">{d.name}</h3>
                    <p className="text-accent font-bold text-sm mb-3">{d.role}</p>
                    <p className="text-text-light text-sm leading-relaxed">{d.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <SectionHeading title="Management Team" tag="Our Team" centered={false} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="flex items-start gap-3 mb-5">
              <Users className="w-6 h-6 text-accent mt-0.5" />
              <p className="text-text-light text-[15px]">Our directors are supported by a deep bench of qualified professionals:</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-3 mb-14">
            {managementRoles.map((role, i) => (
              <ScrollReveal key={i} delay={i * 60 + 150}>
                <div className="flex items-center gap-3 card-premium p-4">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-text-light">{role}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="card-premium p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <h3 className="text-xl font-black text-primary-dark mb-3">Our Culture</h3>
              <p className="text-text-light leading-relaxed text-[15px]">
                We believe great construction comes from great teams. That&apos;s why we invest in continuous training, transparent career progression, and a workplace where every voice — from site supervisor to director — is heard.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
