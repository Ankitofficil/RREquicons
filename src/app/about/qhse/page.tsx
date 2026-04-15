import type { Metadata } from "next";
import { Shield, CheckCircle, Heart, Leaf, Award } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Quality, Health, Safety & Environment (QHSE)",
  description: "R R Equicons' commitment to QHSE aligned with ISO standards.",
};

const sections = [
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    color: "from-blue-500/10 to-blue-600/5",
    items: ["Material testing at independent NABL-accredited labs", "Multi-stage QC checkpoints during execution", "Documented inspection and test plans (ITPs) for every project", "Independent third-party audits on major works"],
  },
  {
    icon: Heart,
    title: "Health & Safety",
    color: "from-emerald-500/10 to-emerald-600/5",
    items: ["Mandatory site inductions for every worker and visitor", "Daily toolbox talks and weekly safety reviews", "100% PPE compliance — enforced, not requested", "Trained safety officers on every active site", "Incident reporting and root-cause analysis culture"],
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    color: "from-amber-500/10 to-amber-600/5",
    items: ["Dust suppression and noise control on active sites", "Responsible waste segregation and disposal", "Water conservation in batching and curing operations", "Compliance with all state and central environmental regulations"],
  },
];

const standards = [
  { name: "ISO 9001", desc: "Quality Management" },
  { name: "ISO 45001", desc: "Occupational Health & Safety" },
  { name: "ISO 14001", desc: "Environmental Management" },
];

export default function QHSEPage() {
  return (
    <>
      <HeroSection title="Built Right. Built Safe. Built to Last." compact />

      <section className="py-14 sm:py-24 bg-white construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-start gap-5 card-premium p-7 mb-14 bg-gradient-to-r from-primary/5 to-accent/5">
              <Shield className="w-10 h-10 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-black text-primary-dark mb-2">Our QHSE Commitment</h2>
                <p className="text-text-light leading-relaxed text-[15px]">
                  At R R Equicons, <strong className="text-text">QHSE is not a department — it&apos;s a discipline that lives in every decision we make</strong>, from procurement to handover.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-14">
            {sections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center`}>
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-black text-primary-dark">{section.title}</h3>
                  </div>
                  <div className="space-y-3 pl-13">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 card-premium p-4">
                        <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-sm text-text-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-black text-primary-dark">Our Standards</h3>
            </div>
            <p className="text-text-light mb-8 text-center">We align our practices with internationally recognized frameworks:</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {standards.map((s, i) => (
              <ScrollReveal key={i} animation="scale-in" delay={i * 100}>
                <div className="card-premium p-7 text-center">
                  <div className="text-2xl font-black text-primary mb-1">{s.name}</div>
                  <div className="text-sm text-text-muted font-medium">{s.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
