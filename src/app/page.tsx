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
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "12+", label: "Years of Experience", icon: HardHat },
  { value: "50+", label: "Projects Delivered", icon: Building2 },
  { value: "100+", label: "Skilled Professionals", icon: Warehouse },
  { value: "100%", label: "Safety Commitment", icon: ShieldCheck },
];

const services = [
  {
    icon: Building2,
    title: "Civil Construction & EPC",
    desc: "End-to-end execution of roads, bridges, buildings, and industrial infrastructure.",
    href: "/services/construction",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Factory,
    title: "Ready-Mix Concrete",
    desc: "Computer-controlled batching plants delivering M10-M60+ grade concrete with on-time logistics.",
    href: "/services/batching-plant",
    gradient: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    icon: Truck,
    title: "Transport & Logistics",
    desc: "Owned fleet of dumpers, trailers, and transit mixers serving construction projects across the region.",
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

const featuredProjects = [
  { name: "State Highway NH-33 Extension", location: "Jharkhand", scope: "Road Construction - 24 km", status: "Completed", color: "from-blue-600/30 to-blue-900/40" },
  { name: "Industrial Complex - Adityapur", location: "Jamshedpur", scope: "Multi-building EPC", status: "Completed", color: "from-emerald-600/30 to-emerald-900/40" },
  { name: "Residential Township - Phase I", location: "Jamshedpur", scope: "120 Unit Housing", status: "Ongoing", color: "from-amber-600/30 to-amber-900/40" },
  { name: "Bridge Construction - Subarnarekha", location: "Jharkhand", scope: "RCC Bridge - 180m", status: "Completed", color: "from-purple-600/30 to-purple-900/40" },
  { name: "Batching Plant Setup", location: "Gamharia", scope: "60 m³/hr RMC Plant", status: "Completed", color: "from-rose-600/30 to-rose-900/40" },
  { name: "Commercial Office Complex", location: "Bistupur", scope: "G+5 Commercial Building", status: "Ongoing", color: "from-cyan-600/30 to-cyan-900/40" },
];

const testimonials = [
  {
    quote: "R R Equicons delivered our highway project ahead of schedule without compromising on quality. Their team's dedication is remarkable.",
    name: "Senior Engineer",
    company: "State PWD, Jharkhand",
  },
  {
    quote: "The RMC quality from their batching plant is consistently excellent. We've been using them for 3 years now and never had an issue.",
    name: "Project Manager",
    company: "Leading Real Estate Developer",
  },
  {
    quote: "What impressed us most was their transparency — no hidden costs, clear timelines, and regular progress updates throughout the project.",
    name: "Plant Head",
    company: "Industrial Client, Adityapur",
  },
];

const enquiryFields = [
  { name: "name", label: "Your Name", type: "text" as const, required: true, placeholder: "Full Name" },
  { name: "email", label: "Email", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "projectType", label: "Project Type", type: "select" as const, required: true, options: ["Road Construction", "Building Construction", "EPC Project", "RMC Supply", "Transport", "Real Estate", "Other"] },
  { name: "description", label: "Brief Description", type: "textarea" as const, required: false, placeholder: "Tell us about your project..." },
];

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 sm:py-36 lg:py-48 hero-gradient overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-pattern" />

        {/* Decorative glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-3xl" />
          {/* Diagonal accent lines */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]"
            style={{ background: "repeating-linear-gradient(-45deg, transparent, transparent 40px, white 40px, white 41px)" }}
          />
          {/* Floating construction elements */}
          <div className="absolute top-20 right-[15%] w-20 h-20 border border-accent/10 rounded-xl rotate-12 animate-float" />
          <div className="absolute bottom-32 left-[10%] w-14 h-14 border border-white/5 rounded-lg -rotate-6 animate-float delay-500" />
          <div className="absolute top-1/3 left-[5%] w-3 h-3 bg-accent/20 rounded-full animate-float delay-300" />
          <div className="absolute bottom-1/4 right-[8%] w-2 h-2 bg-accent/30 rounded-full animate-float delay-700" />
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">Building India&apos;s Infrastructure</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] mb-6 sm:mb-8 animate-fade-in-up tracking-tight">
              Engineering India&apos;s{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
                  Tomorrow
                </span>
              </span>
              <br />
              <span className="text-white/90">Today.</span>
            </h1>

            <p className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in-up delay-200 leading-relaxed">
              From highways and bridges to industrial complexes and residential townships — R R Equicons delivers turnkey construction solutions backed by 12+ years of execution excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Link href="/contact" className="btn-primary text-base flex items-center gap-2.5">
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary text-base">
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative z-10 -mt-10 sm:-mt-12">
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-gray-100 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card p-4 sm:p-8 text-center relative group hover:bg-surface/50 transition-colors border-r border-b border-gray-50 last:border-r-0 md:border-b-0">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mx-auto mb-1.5 sm:mb-2 opacity-60" />
                <div className="text-2xl sm:text-4xl font-black text-primary mb-0.5 sm:mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE ARE ═══ */}
      <section className="py-14 sm:py-24 bg-white construction-grid">
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
                    R R Equicons Pvt Ltd is a Jamshedpur-headquartered civil construction company that has earned its reputation through one principle: <strong className="text-text font-semibold">deliver what you promise, on time, every time.</strong>
                  </p>
                  <p>
                    Since 2013, we have grown from a regional contractor into a multi-vertical construction group — executing EPC projects, operating ready-mix concrete plants, and providing heavy-equipment logistics across Jharkhand, Bihar, Odisha, and beyond.
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
                    { icon: Building2, value: "3", label: "Business Verticals", color: "from-emerald-500/10 to-emerald-600/5" },
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

      {/* ═══ SERVICES ═══ */}
      <section className="py-14 sm:py-24 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Our Expertise"
              title="What We Do"
              subtitle="Comprehensive construction solutions from foundation to finish."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={service.href} delay={i * 100}>
                <Link
                  href={service.href}
                  className={`group card-premium p-7 h-full flex flex-col bg-gradient-to-br ${service.gradient}`}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-105 transition-transform">
                    <service.icon className="w-7 h-7 text-primary" />
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

      {/* ═══ RRE ADVANTAGE ═══ */}
      <section className="py-14 sm:py-24 bg-white relative">
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
                <div className="group flex gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-gray-100 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all">
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
                <div className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.06] transition-all">
                  <div className={`h-44 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                    <Building2 className="w-14 h-14 text-white/10" />
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
      <section className="py-14 sm:py-24 bg-white relative">
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
                <div className="card-premium flex flex-col items-center text-center p-6 group">
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
      <section className="py-14 sm:py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              tag="Start a Conversation"
              title="Have a project in mind?"
              subtitle="Tell us about your requirements and our team will get back to you within 24 hours."
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="card-premium p-5 sm:p-10 !shadow-2xl !shadow-black/5">
              <ContactForm fields={enquiryFields} submitLabel="Send Enquiry" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
