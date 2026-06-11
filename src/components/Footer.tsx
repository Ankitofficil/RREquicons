import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

const socialLinks = [
  { label: "Li", title: "LinkedIn", href: "#" },
  { label: "Fb", title: "Facebook", href: "#" },
  { label: "Ig", title: "Instagram", href: "#" },
  { label: "Yt", title: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Trust strip */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 construction-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-2 sm:gap-y-3 text-xs sm:text-sm font-medium text-white/70">
            {[
              "12+ Years in Business",
              "ISO-Aligned QHSE",
              "PAN India Operations",
              "100+ Strong Workforce",
              "Owned Equipment Fleet",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 blueprint-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* About */}
            <div className="lg:col-span-1">
              <div className="inline-block bg-white rounded-xl px-3 py-2 mb-5 shadow-lg shadow-black/20">
                <Image
                  src="/rr-equicons-hq.png"
                  alt="R R Equicons Pvt Ltd"
                  width={540}
                  height={400}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                A leading civil engineering and construction company headquartered in Jamshedpur, delivering EPC, RMC, and infrastructure solutions across India since 2013.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 bg-white/5 hover:bg-accent/20 border border-white/5 hover:border-accent/30 rounded-lg flex items-center justify-center transition-all group"
                    title={social.title}
                  >
                    <span className="text-[10px] font-bold text-white/40 group-hover:text-accent transition-colors">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 text-accent/70">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/projects", label: "Projects" },
                  { href: "/services/construction", label: "Services" },
                  { href: "/careers", label: "Careers" },
                  { href: "/contact", label: "Contact" },
                  { href: "/insights", label: "Insights" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 text-accent/70">Services</h4>
              <ul className="space-y-3">
                {[
                  { href: "/services/construction", label: "Civil Construction" },
                  { href: "/projects/epc", label: "EPC Projects" },
                  { href: "/services/batching-plant", label: "Batching Plant" },
                  { href: "/services/transport", label: "Transport" },
                  { href: "/services/real-estate", label: "Real Estate" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 text-accent/70">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/40">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent/60 shrink-0" />
                  <span>Jugsalai, Jamshedpur,<br />Jharkhand &mdash; 831006</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Phone className="w-4 h-4 text-accent/60 shrink-0" />
                  <span>{site.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Mail className="w-4 h-4 text-accent/60 shrink-0" />
                  <span>info@rrequiconspvtltd.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <p>&copy; 2026 R R Equicons Pvt Ltd. All rights reserved. CIN: U45201JH2013PTC001777</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white/50 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
