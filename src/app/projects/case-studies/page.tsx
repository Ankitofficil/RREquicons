import type { Metadata } from "next";
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

const caseStudies = [
  {
    project: "State Highway NH-33 Extension",
    client: "State PWD, Jharkhand",
    location: "Ranchi-Jamshedpur Corridor",
    scope: "24 km bituminous road construction with drainage",
    duration: "Jan 2022 - Nov 2023",
    challenge: "Tight timeline with monsoon disruptions and need to maintain traffic flow on an active route during construction.",
    approach: "Implemented phased construction methodology — working on one lane while keeping traffic flowing on the other. Deployed additional equipment during dry windows to accelerate progress. Used real-time weather monitoring to optimize work scheduling.",
    outcome: "Completed 15 days ahead of schedule. Zero lost-time incidents. Traffic disruption kept under 20% of projected levels.",
    color: "from-blue-600 to-blue-800",
  },
  {
    project: "Industrial Complex - Adityapur",
    client: "Private Industrial Group",
    location: "Adityapur Industrial Area, Jamshedpur",
    scope: "Multi-building EPC including factory, warehouse, and admin block",
    duration: "Mar 2021 - Aug 2022",
    challenge: "Complex coordination between multiple building types with different structural requirements, all on a shared site with active industrial operations nearby.",
    approach: "Created a unified project plan with staggered mobilization. Deployed dedicated teams for each building type while sharing equipment across the site. Implemented daily coordination meetings to manage site logistics.",
    outcome: "Delivered all three buildings within budget. Client expanded the scope mid-project for additional storage facility, accommodated without timeline impact.",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    project: "Bridge Construction - Subarnarekha River",
    client: "State PWD, Jharkhand",
    location: "Subarnarekha River Crossing, Jharkhand",
    scope: "180m RCC bridge with approach roads",
    duration: "Jun 2019 - Dec 2021",
    challenge: "River with unpredictable water levels. Foundation work required during a narrow dry-season window. Remote location with limited access for heavy equipment.",
    approach: "Pre-positioned all heavy equipment before the dry season. Used coffer dams for foundation work. Established a temporary access road for material delivery. Leveraged our own transit mixers for uninterrupted concrete supply.",
    outcome: "Foundation work completed in a single dry season (vs. the two seasons typically needed). Bridge load-tested 10% above design specification. Project came in 5% under budget.",
    color: "from-amber-600 to-amber-800",
  },
  {
    project: "Residential Township Phase I",
    client: "Real Estate Developer",
    location: "Jamshedpur",
    scope: "120 residential units with common amenities",
    duration: "Feb 2024 - Present (Ongoing)",
    challenge: "Large-scale residential project with high quality expectations and tight cost controls. Multiple unit types with customization options adding complexity.",
    approach: "Standardized construction methods while maintaining design flexibility. Set up a dedicated RMC supply line from our batching plant. Implemented a quality-gate system where each unit passes independent inspection.",
    outcome: "On track for on-time delivery. Quality metrics consistently exceeding benchmarks. RMC from our own plant has reduced concrete costs by 12% vs. market rates.",
    color: "from-purple-600 to-purple-800",
  },
];

export default function CaseStudiesPage() {
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
