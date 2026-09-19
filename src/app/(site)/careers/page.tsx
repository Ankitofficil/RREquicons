import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, TrendingUp, Shield, GraduationCap, Heart, Building2, MapPin, Clock, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Careers & Construction Jobs",
  description:
    "Openings for civil engineers, project managers, site supervisors and skilled trades with an established Jharkhand construction company. Jamshedpur & PAN India.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers & Construction Jobs",
    description:
      "Openings for civil engineers, project managers, site supervisors and skilled trades with an established Jharkhand construction company. Jamshedpur & PAN India.",
    url: "/careers",
  },
};

const benefits = [
  { icon: Briefcase, title: "Competitive Compensation", desc: "Benchmarked to industry standards", color: "from-blue-500/10 to-blue-600/5" },
  { icon: Building2, title: "Project Diversity", desc: "Work across roads, buildings, industrial, and commercial", color: "from-emerald-500/10 to-emerald-600/5" },
  { icon: TrendingUp, title: "Career Progression", desc: "Clear paths from site engineer to project manager and beyond", color: "from-amber-500/10 to-amber-600/5" },
  { icon: GraduationCap, title: "Continuous Learning", desc: "Funded certifications, training programs, and mentorship", color: "from-purple-500/10 to-purple-600/5" },
  { icon: Shield, title: "Safe Workplace", desc: "Culture and infrastructure built around employee wellbeing", color: "from-rose-500/10 to-rose-600/5" },
  { icon: Heart, title: "Stability", desc: "A 12+ year track record and a growing order book", color: "from-cyan-500/10 to-cyan-600/5" },
];

const openings = [
  { role: "Senior Civil Engineer", location: "Jamshedpur", experience: "5-8 yrs" },
  { role: "Project Manager (Roads)", location: "Jharkhand", experience: "8+ yrs" },
  { role: "Quantity Surveyor", location: "Jamshedpur", experience: "3-5 yrs" },
  { role: "Safety Officer", location: "Site-based", experience: "3+ yrs" },
  { role: "Site Supervisor", location: "Multiple", experience: "2-5 yrs" },
  { role: "Heavy Equipment Operator", location: "Site-based", experience: "2+ yrs" },
  { role: "Accountant", location: "Jamshedpur", experience: "2-4 yrs" },
];

const applicationFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "position", label: "Position of Interest", type: "select" as const, required: true, options: ["Senior Civil Engineer", "Project Manager", "Quantity Surveyor", "Safety Officer", "Site Supervisor", "Equipment Operator", "Accountant", "Other"] },
  { name: "experience", label: "Years of Experience", type: "text" as const, required: true, placeholder: "e.g., 5 years" },
  { name: "message", label: "Tell us about yourself", type: "textarea" as const, required: false, placeholder: "Brief introduction and relevant experience..." },
];

export default function CareersPage() {
  return (
    <>
      <HeroSection
        title="Build a Career as Solid as What We Build."
        subtitle="At R R Equicons, you won't be a cog in a corporate machine. You'll be part of a team where your work is visible, your contribution matters, and your growth is taken seriously."
        compact
      />

      {/* Benefits */}
      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading tag="Why Join Us" title="What We Offer" />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`card-premium flex gap-4 p-6 bg-gradient-to-br ${b.color}`}>
                  <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-0.5">{b.title}</h3>
                    <p className="text-sm text-text-light">{b.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-12 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-black text-white mb-3">Who We&apos;re Looking For</h3>
          <p className="text-white/50 leading-relaxed">
            We hire for <strong className="text-accent font-semibold">attitude first, skills second</strong>. If you bring integrity, ownership, and a willingness to learn, we&apos;ll invest in the rest.
          </p>
        </div>
      </section>

      {/* Openings */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading tag="Open Roles" title="Current Openings" />
          </ScrollReveal>
          <div className="space-y-3 mb-10">
            {openings.map((job, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="group card-premium flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                  <div>
                    <h3 className="font-bold text-text group-hover:text-primary transition-colors">{job.role}</h3>
                    <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.experience}</span>
                    </div>
                  </div>
                  <Link href="#apply" className="text-sm font-bold text-primary hover:text-accent transition-colors shrink-0 flex items-center gap-1 group/link">
                    Apply <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="card-premium p-6 text-center mb-12 bg-gradient-to-r from-primary/5 to-accent/5">
              <p className="text-text-light mb-1">Don&apos;t see your role? We&apos;re always interested in hearing from talented people.</p>
              <p className="text-text font-semibold">Email your CV to: <a href="mailto:careers@rrequiconspvtltd.com" className="text-primary hover:text-accent transition-colors">careers@rrequiconspvtltd.com</a></p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div id="apply" className="card-premium p-5 sm:p-10 !shadow-2xl !shadow-black/5">
              <h3 className="text-xl font-black text-primary-dark mb-6">Submit Application</h3>
              <ContactForm fields={applicationFields} submitLabel="Submit Application" source="Careers Application" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
