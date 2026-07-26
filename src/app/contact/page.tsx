import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact R R Equicons Pvt Ltd | Construction Company in Jamshedpur",
  description: "Get in touch with R R Equicons for construction services, EPC projects, RMC supply, and more. Office in Jugsalai, Jamshedpur. Quick response guaranteed.",
};

const contactCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    lines: ["Fastest way to reach us", "Tap to start a chat"],
    color: "from-emerald-500/10 to-emerald-600/5",
    href: site.whatsapp.href,
    external: true,
    accent: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [site.phone, "Mon-Sat, 9:30 AM - 6:30 PM IST"],
    color: "from-blue-500/10 to-blue-600/5",
    href: site.telHref,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@rrequiconspvtltd.com", "careers@rrequiconspvtltd.com", "tenders@rrequiconspvtltd.com"],
    color: "from-amber-500/10 to-amber-600/5",
    href: `mailto:${site.email.general}`,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Mahavir Enclave, Jugsalai", "M.E. School Road", "Jamshedpur, Jharkhand — 831006"],
    color: "from-purple-500/10 to-purple-600/5",
  },
];

const formFields = [
  { name: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "Your full name" },
  { name: "email", label: "Email Address", type: "email" as const, required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone Number", type: "tel" as const, required: true, placeholder: "+91 XXXXX XXXXX" },
  { name: "company", label: "Company / Organization", type: "text" as const, required: false, placeholder: "Your company name" },
  { name: "inquiryType", label: "Inquiry Type", type: "select" as const, required: true, options: ["Project", "RMC Supply", "Transport", "Career", "Tender", "Other"] },
  { name: "subject", label: "Subject", type: "text" as const, required: true, placeholder: "Brief subject line" },
  { name: "message", label: "Message", type: "textarea" as const, required: true, placeholder: "Tell us about your requirement..." },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Let's Talk About Your Project."
        subtitle="Whether you're planning a major infrastructure project, need ready-mix concrete, or just want to learn more about working with us — we'd love to hear from you."
        compact
      />

      {/* Contact Cards */}
      <section className="py-10 sm:py-16 bg-page construction-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => {
              const inner = (
                <>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm ${card.accent ? "bg-[#25D366]" : "bg-white"}`}>
                    <card.icon className={`w-6 h-6 ${card.accent ? "text-white" : "text-primary"}`} />
                  </div>
                  <h3 className="font-bold text-primary-dark mb-3 flex items-center gap-1.5">
                    {card.title}
                    {card.href && <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </h3>
                  <div className="space-y-1">
                    {card.lines.map((line, j) => (
                      <p key={j} className="text-sm text-text-light break-words">{line}</p>
                    ))}
                  </div>
                </>
              );
              const cardClass = `group card-premium p-6 h-full bg-gradient-to-br ${card.color} block`;
              return (
                <ScrollReveal key={i} animation="scale-in" delay={i * 80}>
                  {card.href ? (
                    <a
                      href={card.href}
                      {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-14 sm:py-20 bg-surface dot-pattern relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="card-premium p-5 sm:p-8 !shadow-2xl !shadow-black/5">
                  <SectionHeading title="Send Us a Message" tag="Get in Touch" centered={false} />
                  <ContactForm fields={formFields} source="Contact" />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <ScrollReveal delay={200}>
                <div className="card-premium overflow-hidden">
                  <div className="h-56 bg-gradient-to-br from-primary/15 to-primary/5 flex flex-col items-center justify-center text-center p-6 relative">
                    <div className="absolute inset-0 blueprint-pattern opacity-30" />
                    <MapPin className="w-10 h-10 text-primary/30 mb-3 relative" />
                    <p className="text-sm text-text-muted font-semibold relative">Google Map</p>
                    <p className="text-xs text-text-muted mt-1 relative">Jugsalai, Jamshedpur</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="card-premium p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <h4 className="font-bold text-primary-dark">Business Hours</h4>
                  </div>
                  <p className="text-sm text-text-light mb-1">Monday - Saturday</p>
                  <p className="text-sm text-text-light mb-5">9:30 AM - 6:30 PM IST</p>

                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <h4 className="font-bold text-primary-dark">Quick Response</h4>
                  </div>
                  <p className="text-sm text-text-light">
                    We respond to every enquiry within <strong className="text-text">24 business hours</strong>. For urgent matters, please call us directly.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
