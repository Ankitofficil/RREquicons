import type { Metadata } from "next";
import Link from "next/link";
import {
  Gauge,
  FlaskConical,
  Truck,
  Headphones,
  ArrowRight,
  MessageCircle,
  Phone,
  BadgeCheck,
  Factory,
  Clock,
  Layers,
  ClipboardCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ready-Mix Concrete (RMC) Supplier in Jamshedpur | Batching Plant",
  description:
    "R R Equicons supplies computer-controlled M10–M60+ ready-mix concrete from our own batching plant, delivered on time by our owned transit-mixer fleet across Jamshedpur and Jharkhand.",
};

const specs = [
  { icon: Gauge, k: "Plant Output", v: "60 m³ / hour" },
  { icon: Layers, k: "Grade Range", v: "M10 – M60+" },
  { icon: FlaskConical, k: "Quality Control", v: "On-site lab: cube, slump & aggregate testing" },
  { icon: Truck, k: "Logistics", v: "Owned transit-mixer fleet, Jamshedpur region" },
];

const grades = [
  { grade: "M10 – M15", use: "PCC, levelling, non-structural fills" },
  { grade: "M20 – M25", use: "Residential slabs, columns, footings" },
  { grade: "M30 – M35", use: "Commercial structures, heavy floors" },
  { grade: "M40 – M60+", use: "High-rise, bridges, industrial & precast" },
];

const whyChoose = [
  { icon: Gauge, title: "Precision Mix Designs", desc: "Every batch is weighed and mixed by computer to exact specification — consistent strength, load after load.", color: "from-blue-500/10 to-blue-600/5" },
  { icon: FlaskConical, title: "Certified Materials", desc: "Aggregates, cement, and admixtures from approved sources only. No shortcuts on inputs.", color: "from-emerald-500/10 to-emerald-600/5" },
  { icon: Truck, title: "On-Time Delivery", desc: "Owned fleet, not outsourced — your pour starts on schedule because we control the logistics.", color: "from-amber-500/10 to-amber-600/5" },
  { icon: Headphones, title: "Technical Support", desc: "Our engineers help optimise your concrete specifications for strength and workability.", color: "from-purple-500/10 to-purple-600/5" },
];

const process = [
  { icon: ClipboardCheck, step: "01", title: "Tell us your requirement", desc: "Grade, quantity, site location and pour date — over WhatsApp, call, or the form below." },
  { icon: FlaskConical, step: "02", title: "Mix design & scheduling", desc: "We confirm the mix design, price, and a delivery slot that fits your site programme." },
  { icon: Factory, step: "03", title: "Batched & tested", desc: "Concrete is computer-batched and slump/cube-tested in our on-site lab before dispatch." },
  { icon: Truck, step: "04", title: "Delivered on time", desc: "Our transit mixers arrive at the agreed time, ready to pour." },
];

const rmcFields = [
  { name: "name", label: "Your Name", type: "text" as const, required: true, placeholder: "Full Name" },
  { name: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "grade", label: "Concrete Grade", type: "select" as const, required: true, options: ["M10", "M15", "M20", "M25", "M30", "M35", "M40", "M45", "M50", "M60+", "Not sure — need advice"] },
  { name: "quantity", label: "Approx. Quantity (m³)", type: "text" as const, required: false, placeholder: "e.g. 40 m³" },
  { name: "site", label: "Site Location & Pour Date", type: "textarea" as const, required: false, placeholder: "e.g. Adityapur — pour on 25th, morning" },
];

export default function BatchingPlantPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 sm:py-28 hero-gradient overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-24 w-72 h-72 rounded-full border-[3px] border-dashed border-accent/15 animate-drum" />
          <div className="absolute -bottom-24 -left-16 w-52 h-52 rounded-full border-2 border-white/5 animate-drum" style={{ animationDuration: "22s" }} />
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold text-white/80 tracking-wider uppercase">Ready-Mix Concrete</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-5 tracking-tight animate-fade-in-up">
            Concrete You Can{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">Count On.</span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-200">
            Computer-controlled M10–M60+ ready-mix concrete from our own batching plant — certified, tested, and delivered on time across Jamshedpur & Jharkhand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-300">
            <a
              href={site.whatsapp.rmcHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base flex items-center gap-2.5 !bg-[#25D366] !shadow-[#25D366]/30 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" /> Get a Quote on WhatsApp
            </a>
            <a href={site.telHref} className="btn-secondary text-base flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4" /> Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SPEC STRIP ═══ */}
      <section className="relative z-10 -mt-8 sm:-mt-12">
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="bg-white dark:bg-[#0c2340] rounded-2xl shadow-2xl shadow-black/8 dark:shadow-black/40 border border-gray-100 dark:border-white/10 grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
            {specs.map((s, i) => (
              <div key={i} className="p-4 sm:p-6 text-center border-r border-b border-gray-50 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:border-b-0">
                <s.icon className="w-5 h-5 text-accent mx-auto mb-2 opacity-70" />
                <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{s.k}</div>
                <div className="text-sm font-bold text-primary-dark leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTRO + GRADES ═══ */}
      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-12 max-w-3xl">
              Ready-Mix Concrete is our flagship. Because we <strong className="text-text">own the plant and the mixers</strong>, we control both quality and timing end to end — so you get consistent, certified concrete delivered exactly when your site needs it.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading title="Grades We Supply" tag="Mix Designs" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {grades.map((g, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-premium flex items-center gap-4 p-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-sm text-center leading-tight">{g.grade}</span>
                  </div>
                  <p className="text-text-light text-sm">{g.use}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <p className="text-xs text-text-muted mt-4">Custom mix designs, pumpable, self-compacting, and high-strength concrete available on request.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHY CHOOSE ═══ */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Why Choose Our RMC" tag="Advantages" centered={false} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyChoose.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`card-premium flex gap-4 p-6 bg-gradient-to-br ${item.color} h-full`}>
                  <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">{item.title}</h3>
                    <p className="text-sm text-text-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-14 sm:py-24 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="From Enquiry to Pour" tag="How It Works" subtitle="Four simple steps — most enquiries get a same-day quote." light />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 h-full hover:border-accent/20 transition-colors">
                  <div className="text-5xl font-black text-white/5 absolute top-3 right-4">{p.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6 text-accent-light" />
                  </div>
                  <h3 className="font-bold text-white mb-1.5 relative">{p.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed relative">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE FORM ═══ */}
      <section className="py-14 sm:py-24 bg-page relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Request an RMC Quote" tag="Get Started" subtitle="Share your grade, quantity, and site — or reach us instantly on WhatsApp." />
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href={site.whatsapp.rmcHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center justify-center gap-2 !bg-[#25D366] !shadow-[#25D366]/30 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href={site.telHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/10 text-primary font-bold text-sm hover:border-accent/30 hover:text-accent transition-colors w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" /> {site.phone}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="card-premium p-5 sm:p-10 !shadow-2xl !shadow-black/5">
              <ContactForm fields={rmcFields} submitLabel="Request Quote" source="RMC Quote Request" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-accent" /> Batch-tested quality</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> On-time delivery</span>
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-accent" /> Owned mixer fleet</span>
            </div>
          </ScrollReveal>

          <div className="text-center mt-10">
            <Link href="/services/construction" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group text-sm">
              Also need civil construction? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
