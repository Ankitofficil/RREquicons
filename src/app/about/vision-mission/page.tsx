import type { Metadata } from "next";
import { Eye, Target, Heart } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Vision, Mission & Values",
  description: "Discover the vision, mission, and core values that drive R R Equicons Pvt Ltd.",
};

const values = [
  { name: "Integrity", desc: "We honor commitments — to clients, employees, vendors, and communities." },
  { name: "Safety", desc: "Every worker goes home safe. No project is worth a life." },
  { name: "Quality", desc: "Excellence is non-negotiable, even when it's invisible." },
  { name: "Accountability", desc: "We own our outcomes — successes and setbacks alike." },
  { name: "Transparency", desc: "Clear communication, open books, no surprises." },
  { name: "Discipline", desc: "Plans get followed. Schedules get met. Promises get kept." },
];

export default function VisionMissionPage() {
  return (
    <>
      <HeroSection title="Vision, Mission & Values" compact />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <ScrollReveal>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl flex items-center justify-center shrink-0">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-primary-dark mb-4">Our Vision</h2>
                <p className="text-text-light leading-relaxed text-[15px]">
                  To be recognized as one of India&apos;s most trusted civil engineering and construction companies — known not for our size, but for the integrity of our work and the lasting impact of our projects on communities.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl flex items-center justify-center shrink-0">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-primary-dark mb-4">Our Mission</h2>
                <p className="text-text-light leading-relaxed text-[15px] mb-5">
                  To deliver world-class engineering and construction services that are <strong className="text-text">efficient, sustainable, and cost-effective</strong> — while upholding the highest standards of safety, quality, and ethical conduct.
                </p>
                <ul className="space-y-2">
                  {[
                    "Putting client outcomes at the center of every decision.",
                    "Investing relentlessly in our people — their skills, their safety, their growth.",
                    "Embracing technology and innovation in construction methods and project management.",
                    "Minimizing our environmental footprint through responsible practices.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-light text-[15px]">
                      <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Heart className="w-7 h-7 text-accent" />
              <h2 className="text-2xl font-black text-primary-dark">Our Core Values</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={i} animation="scale-in" delay={i * 80}>
                <div className="card-premium p-6">
                  <h3 className="font-bold text-lg text-primary mb-2">{v.name}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
