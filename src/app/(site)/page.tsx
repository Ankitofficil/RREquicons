import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/content";
import Link from "next/link";
import {
  Building2,
  Factory,
  Truck,
  Landmark,
  ShieldCheck,
  Ruler,
  Clock,
  Wrench,
  IndianRupee,
  Handshake,
  HardHat,
  Warehouse,
  Building,
  Church,
  Pickaxe,
  ArrowRight,
  MapPin,
  Quote,
  MessageCircle,
  Phone,
  FlaskConical,
  Gauge,
  BadgeCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/site";

// The root layout supplies the title/description/OG for this page; only the
// canonical is page-specific.
// Fallback tints when a project has no photo, so the grid still reads as a
// set rather than six identical grey boxes.
const cardTints = [
  "from-blue-600/30 to-blue-900/40",
  "from-emerald-600/30 to-emerald-900/40",
  "from-amber-600/30 to-amber-900/40",
  "from-purple-600/30 to-purple-900/40",
  "from-rose-600/30 to-rose-900/40",
  "from-cyan-600/30 to-cyan-900/40",
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const concreteGrades = [
  "M10", "M15", "M20", "M25", "M30", "M35", "M40", "M45", "M50", "M55", "M60+",
  "Custom Mix Designs", "Pumpable Concrete", "Self-Compacting", "High-Strength",
];

const stats = [
  { value: "60", suffix: " m³/hr", label: "RMC Plant Output", icon: Gauge },
  { value: "M10–M60+", label: "Concrete Grades", icon: FlaskConical },
  { value: "12+", label: "Years of Experience", icon: HardHat },
  { value: "50+", label: "Projects Delivered", icon: Building2 },
];

// RMC leads; other verticals follow as secondary services.
const services = [
  {
    icon: Factory,
    title: "Ready-Mix Concrete (RMC)",
    desc: "Our flagship. Computer-controlled batching plant supplying M10–M60+ concrete, delivered on time by our own transit-mixer fleet.",
    href: "/services/batching-plant",
    gradient: "from-accent/10 to-accent/[0.03]",
    featured: true,
  },
  {
    icon: Building2,
    title: "Civil Construction & EPC",
    desc: "End-to-end execution of roads, bridges, buildings, and industrial infrastructure.",
    href: "/services/construction",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Truck,
    title: "Transport & Logistics",
    desc: "Owned fleet of dumpers, trailers, and transit mixers serving projects across the region.",
    href: "/services/transport",
    gradient: "from-amber-500/10 to-amber-600/5",
  },
  {
    icon: Landmark,
    title: "Real Estate Development",
    desc: "Upcoming residential and commercial developments in high-growth corridors of Jharkhand.",
    href: "/services/real-estate",
    gradient: "from-purple-500/10 to-purple-600/5",
  },
];

const rmcHighlights = [
  { icon: Gauge, title: "Computer-Controlled Batching", desc: "Every batch is weighed and mixed to exact specification — consistent strength, load after load." },
  { icon: FlaskConical, title: "In-House Testing Lab", desc: "Cube tests, slump tests, and aggregate analysis on site, so quality is proven, not promised." },
  { icon: Truck, title: "Owned Transit-Mixer Fleet", desc: "Delivery isn't outsourced. Your pour starts on schedule because we control the logistics." },
  { icon: BadgeCheck, title: "Certified Materials Only", desc: "Cement, aggregates, and admixtures sourced from approved suppliers — no shortcuts." },
];

const advantages = [
  { icon: ShieldCheck, title: "Safety First, Always", desc: "Zero-tolerance safety culture protects our people and your project." },
  { icon: Ruler, title: "Engineered Precision", desc: "Data-driven QA/QC reduces field rework far below industry averages." },
  { icon: Clock, title: "On-Time Delivery", desc: "Disciplined planning, scheduling, and procurement keep projects on track." },
  { icon: Wrench, title: "Self-Performed Execution", desc: "We own our equipment and manage critical paths in-house — fewer dependencies, fewer delays." },
  { icon: IndianRupee, title: "Predictable Costs", desc: "Transparent budgeting with no hidden surprises." },
  { icon: Handshake, title: "Long-Term Partnerships", desc: "A majority of our work comes from repeat clients. That's the metric we're proudest of." },
];

const industries = [
  { icon: Landmark, label: "Government & Public Works" },
  { icon: Factory, label: "Industrial & Manufacturing" },
  { icon: Building, label: "Commercial Real Estate" },
  { icon: Building2, label: "Residential Townships" },
  { icon: Church, label: "Religious & Institutional" },
  { icon: Pickaxe, label: "Mining & Heavy Industry" },
];


const testimonials = [
  {
    quote: "The RMC quality from their batching plant is consistently excellent. We've been using them for 3 years now and never had an issue.",
    name: "Project Manager",
    company: "Leading Real Estate Developer",
  },
  {
    quote: "R R Equicons delivered our highway project ahead of schedule without compromising on quality. Their team's dedication is remarkable.",
    name: "Senior Engineer",
    company: "State PWD, Jharkhand",
  },
  {
    quote: "What impressed us most was their transparency — no hidden costs, clear timelines, and regular progress updates throughout the project.",
    name: "Plant Head",
    company: "Industrial Client, Adityapur",
  },
];

const enquiryFields = [
  { name: "name", label: "Your Name", type: "text" as const, required: true, placeholder: "Full Name" },
  { name: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "projectType", label: "I'm interested in", type: "select" as const, required: true, options: ["Ready-Mix Concrete (RMC) Supply", "Road Construction", "Building Construction", "EPC Project", "Transport", "Real Estate", "Other"] },
  { name: "email", label: "Email", type: "email" as const, required: false, placeholder: "you@example.com" },
  { name: "description", label: "Grade / Quantity / Site (for RMC) or project details", type: "textarea" as const, required: false, placeholder: "e.g. M25, 40 m³, site at Adityapur — pour on 25th" },
];

export default async function HomePage() {
  // Same source as /projects and the admin panel, so photos added there
  // appear here too.
  const featuredProjects = (await getProjects()).slice(0, 6);

  return (
    <>
      {/* ═══ HERO — RMC-forward ═══ */}
      <section className="relative py-16 sm:py-32 lg:py-40 hero-gradient overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />

        {/* Decorative glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-[15%] w-20 h-20 border border-accent/10 rounded-xl rotate-12 animate-float" />
          <div className="absolute bottom-32 left-[10%] w-14 h-14 border border-white/5 rounded-lg -rotate-6 animate-float delay-500" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-4 py-1.5 mb-7 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold text-white/80 tracking-wider uppercase">Jamshedpur&apos;s Ready-Mix Concrete Partner</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] mb-6 animate-fade-in-up tracking-tight">
              Ready-Mix Concrete,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
                Delivered On Time.
              </span>
              <br className="hidden sm:block" />
              <span className="text-white/90"> Every Pour.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up delay-200 leading-relaxed">
              Computer-controlled M10–M60+ concrete from our own batching plant, delivered by our owned transit-mixer fleet across Jamshedpur & Jharkhand — backed by 12+ years of civil construction expertise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-300">
              <a
                href={site.whatsapp.rmcHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base flex items-center gap-2.5 !bg-[#25D366] !shadow-[#25D366]/30 hover:!shadow-[#25D366]/40 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5" /> Get an RMC Quote on WhatsApp
              </a>
              <a href={site.telHref} className="btn-secondary text-base flex items-center gap-2.5 w-full sm:w-auto justify-center">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
            <p className="mt-4 text-xs text-white/40 animate-fade-in-up delay-300">
              Also delivering roads, bridges, EPC & real estate projects.
            </p>
          </div>
        </div>

        {/* Concrete-grade marquee */}
        <div className="relative mt-12 sm:mt-16 marquee-mask animate-fade-in delay-500">
          <div className="marquee-track gap-3 text-white/30">
            {[...concreteGrades, ...concreteGrades].map((g, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                {g}
                <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative z-10 -mt-8 sm:-mt-12">
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="bg-white dark:bg-[#0c2340] rounded-2xl shadow-2xl shadow-black/8 dark:shadow-black/40 border border-gray-100 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card p-4 sm:p-8 text-center relative group hover:bg-surface/50 transition-colors border-r border-b border-gray-50 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:border-b-0">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mx-auto mb-1.5 sm:mb-2 opacity-60" />
                <div className="text-xl sm:text-3xl font-black text-primary mb-0.5 sm:mb-1 tracking-tight whitespace-nowrap">
                  {stat.value}<span className="text-accent">{stat.suffix ?? ""}</span>
                </div>
                <div className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RMC FLAGSHIP — the new focal point ═══ */}
      <section className="py-14 sm:py-24 bg-page construction-grid relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: the pitch */}
            <ScrollReveal animation="slide-left">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-accent-dark mb-3">
                  <span className="w-6 h-px bg-accent" /> Our Flagship
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-primary-dark mb-4">
                  Concrete you can build a schedule around
                </h2>
                <p className="text-text-light leading-relaxed text-[15px] mb-6">
                  Ready-Mix Concrete is where R R Equicons started earning repeat business — and it&apos;s still the heart of what we do. Because we <strong className="text-text font-semibold">own the plant and the mixers</strong>, we control quality and timing end to end. When we say the truck arrives at 7 AM, it arrives at 7 AM.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {rmcHighlights.map((h, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0">
                        <h.icon className="w-5 h-5 text-accent-dark" />
                      </div>
                      <div>
                        <h3 className="font-bold text-text text-sm mb-0.5">{h.title}</h3>
                        <p className="text-xs text-text-light leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={site.whatsapp.rmcHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm inline-flex items-center justify-center gap-2 !bg-[#25D366] !shadow-[#25D366]/30"
                  >
                    <MessageCircle className="w-4 h-4" /> Request RMC Quote
                  </a>
                  <Link href="/services/batching-plant" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/10 text-primary font-bold text-sm hover:border-accent/30 hover:text-accent transition-colors">
                    Explore the Plant <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: visual "mixer drum" spec card */}
            <ScrollReveal animation="slide-right" delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-[2rem] -z-10" />
                <div className="relative rounded-3xl bg-primary-dark overflow-hidden p-8 sm:p-10 shadow-2xl shadow-primary/20">
                  <div className="absolute inset-0 blueprint-pattern opacity-40" />
                  {/* Rotating drum motif */}
                  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[3px] border-dashed border-accent/20 animate-drum" />
                  <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full border-2 border-white/5 animate-drum" style={{ animationDuration: "22s" }} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <Factory className="w-6 h-6 text-accent-light" />
                      </div>
                      <div>
                        <div className="text-white font-black text-lg leading-tight">RMC Batching Plant</div>
                        <div className="text-white/40 text-xs">Gamharia, Jamshedpur region</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
                      {[
                        { k: "Plant Output", v: "60 m³/hr" },
                        { k: "Grade Range", v: "M10–M60+" },
                        { k: "Mixing", v: "Computer-controlled" },
                        { k: "Delivery", v: "Owned mixers" },
                      ].map((row) => (
                        <div key={row.k} className="bg-primary-dark/80 p-4 sm:p-5">
                          <div className="text-[10px] uppercase tracking-widest text-accent/70 font-bold mb-1">{row.k}</div>
                          <div className="text-white font-black text-base sm:text-lg">{row.v}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
                      <BadgeCheck className="w-4 h-4 text-[#25D366]" />
                      Slump & cube-tested in our on-site lab, batch by batch.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES (RMC first) ═══ */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Our Expertise"
              title="What We Do"
              subtitle="Ready-Mix Concrete leads the way — supported by full-scope civil construction."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={service.href} delay={i * 100}>
                <Link
                  href={service.href}
                  className={`group card-premium p-7 h-full flex flex-col bg-gradient-to-br ${service.gradient} ${
                    service.featured ? "ring-2 ring-accent/30 relative" : ""
                  }`}
                >
                  {service.featured && (
                    <span className="absolute -top-3 left-6 text-[10px] font-black uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-full shadow-lg shadow-accent/30">
                      Flagship
                    </span>
                  )}
                  <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                    <service.icon className={`w-7 h-7 ${service.featured ? "text-accent" : "text-primary"}`} />
                  </div>
                  <h3 className="font-bold text-lg text-text mb-2">{service.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed mb-4 flex-1">{service.desc}</p>
                  <span className="text-sm text-primary font-bold flex items-center gap-1.5 group-hover:text-accent transition-colors">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE ARE ═══ */}
      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <SectionHeading
                  tag="Who We Are"
                  title="A Trusted Partner in India's Construction Story"
                  centered={false}
                />
                <div className="space-y-5 text-text-light leading-relaxed text-[15px]">
                  <p>
                    R R Equicons Pvt Ltd is a Jamshedpur-headquartered company that has earned its reputation through one principle: <strong className="text-text font-semibold">deliver what you promise, on time, every time.</strong>
                  </p>
                  <p>
                    Since 2013, we have grown from a regional contractor into a multi-vertical construction group — with <strong className="text-text font-semibold">Ready-Mix Concrete at our core</strong>, alongside EPC projects and heavy-equipment logistics across Jharkhand, Bihar, Odisha, and beyond.
                  </p>
                  <p>
                    What sets us apart isn&apos;t just our equipment or our scale — it&apos;s our refusal to compromise on <strong className="text-text font-semibold">quality, safety, and integrity</strong>, even when deadlines tighten or margins shrink.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-8 text-primary font-bold hover:text-accent transition-colors group"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl -z-10" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: HardHat, value: "2013", label: "Year Founded", color: "from-blue-500/10 to-blue-600/5" },
                    { icon: Factory, value: "RMC", label: "At Our Core", color: "from-accent/10 to-accent/[0.03]" },
                    { icon: Warehouse, value: "50+", label: "Projects Delivered", color: "from-amber-500/10 to-amber-600/5" },
                    { icon: Truck, value: "PAN", label: "India Operations", color: "from-purple-500/10 to-purple-600/5" },
                  ].map((item, i) => (
                    <div key={i} className={`card-premium p-6 text-center bg-gradient-to-br ${item.color}`}>
                      <item.icon className="w-7 h-7 text-accent mx-auto mb-3" />
                      <div className="text-2xl font-black text-primary tracking-tight">{item.value}</div>
                      <div className="text-xs font-medium text-text-muted mt-1 uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ RRE ADVANTAGE ═══ */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Why Choose Us"
              title="The RRE Advantage"
              subtitle="Why clients choose us — and keep coming back."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="group flex gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c2340] border border-gray-100 dark:border-white/10 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/15 to-accent/5 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <adv.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-0.5 sm:mb-1 text-sm sm:text-base">{adv.title}</h3>
                    <p className="text-xs sm:text-sm text-text-light leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROJECTS ═══ */}
      <section className="py-14 sm:py-24 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Portfolio"
              title="Featured Projects"
              subtitle="A snapshot of our diverse portfolio across India."
              light
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.06] transition-all h-full">
                  <div className={`h-44 bg-gradient-to-br ${cardTints[i % cardTints.length]} flex items-center justify-center relative`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <Building2 className="w-14 h-14 text-white/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/20"
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-[10px] text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {project.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white/90 mb-1 group-hover:text-accent transition-colors">{project.name}</h3>
                    <p className="text-sm text-white/40">{project.scope}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-10">
              <Link href="/projects" className="inline-flex items-center gap-2 text-accent font-bold hover:text-accent-light transition-colors group">
                See All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-14 sm:py-24 bg-page relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Client Feedback"
              title="What Our Clients Say"
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="relative card-premium p-7 h-full">
                  <Quote className="w-8 h-8 text-accent/20 mb-4" />
                  <p className="text-text-light text-[15px] leading-relaxed mb-6">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center text-xs font-black text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text">{t.name}</div>
                      <div className="text-xs text-text-muted">{t.company}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading tag="Sectors" title="Industries We Serve" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <ScrollReveal key={i} animation="scale-in" delay={i * 80}>
                <div className="card-premium flex flex-col items-center text-center p-6 group h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ind.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-text">{ind.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="py-14 sm:py-24 bg-page relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Start a Conversation"
              title="Need concrete, or a construction partner?"
              subtitle="Tell us the grade, quantity, and site — or your project scope — and our team will get back within 24 hours. Prefer to talk now? WhatsApp or call us."
            />
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
              <ContactForm fields={enquiryFields} submitLabel="Send Enquiry" source="Homepage Enquiry" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
