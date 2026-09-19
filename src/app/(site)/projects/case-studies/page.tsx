import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { MapPin, Calendar, Target, CheckCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Project Case Studies",
  description:
    "How we deliver under pressure — the NH-33 extension finished 15 days early with zero lost-time incidents, on a live traffic corridor, through monsoon season.",
  alternates: { canonical: "/projects/case-studies" },
  openGraph: {
    title: "Project Case Studies",
    description:
      "How we deliver under pressure — the NH-33 extension finished 15 days early with zero lost-time incidents, on a live traffic corridor, through monsoon season.",
    url: "/projects/case-studies",
  },
};



export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <HeroSection
        title="Proof, Not Promises."
        subtitle="The best way to understand what we do is to see how we've done it before."
        compact
      />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="card-premium overflow-hidden !shadow-xl !shadow-black/5">
                <div className={`bg-gradient-to-r ${cs.color} p-5 sm:p-7 relative overflow-hidden`}>
                  <div className="absolute inset-0 blueprint-pattern opacity-20" />
                  <div className="relative">
                    <h3 className="text-xl font-black text-white mb-1">{cs.project}</h3>
                    <p className="text-white/60 text-sm">{cs.client}</p>
                  </div>
                </div>
                <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" /> {cs.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent" /> {cs.duration}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1.5">Scope</p>
                    <p className="text-text-light text-[15px]">{cs.scope}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-danger" /> Challenge
                    </p>
                    <p className="text-text-light text-[15px]">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1.5">Our Approach</p>
                    <p className="text-text-light text-[15px]">{cs.approach}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Outcome
                    </p>
                    <p className="text-emerald-700 text-sm leading-relaxed">{cs.outcome}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
