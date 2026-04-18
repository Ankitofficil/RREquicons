"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";

const aboutLinks = [
  { href: "/about", label: "About Us", desc: "Our story & identity" },
  { href: "/about/vision-mission", label: "Vision, Mission & Values", desc: "What drives us" },
  { href: "/about/leadership", label: "Leadership & Management", desc: "The people behind RRE" },
  { href: "/about/qhse", label: "QHSE", desc: "Quality, Health, Safety & Environment" },
  { href: "/about/equipment", label: "Equipment & Resources", desc: "Our owned fleet" },
];

const projectLinks = [
  { href: "/projects", label: "All Projects", desc: "Full portfolio" },
  { href: "/projects/epc", label: "EPC Projects", desc: "Turnkey solutions" },
  { href: "/projects/case-studies", label: "Case Studies", desc: "Proof of execution" },
];

const serviceLinks = [
  { href: "/services/construction", label: "Civil Construction", desc: "Roads, bridges, buildings" },
  { href: "/services/batching-plant", label: "Batching Plant (RMC)", desc: "M10-M60+ concrete" },
  { href: "/services/transport", label: "Transport & Logistics", desc: "Heavy-haul fleet" },
  { href: "/services/real-estate", label: "Real Estate", desc: "Residential & commercial" },
];

function MegaDropdown({
  label,
  links,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  links: { href: string; label: string; desc: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onToggle} onMouseLeave={onClose}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 origin-top transition-all duration-300 ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100/80 overflow-hidden p-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent transition-all"
            >
              <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                {link.label}
              </span>
              <span className="text-xs text-text-muted">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-accent via-accent-light to-accent text-white text-center text-[11px] sm:text-sm py-2 px-3 sm:px-4 font-semibold relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shimmer_3s_ease_infinite] bg-[length:200%_100%]" />
        <span className="relative leading-snug">
          <span className="hidden sm:inline">Now accepting tenders for FY 2026-27 infrastructure projects across Jharkhand, Bihar & Odisha. </span>
          <span className="sm:hidden">FY 2026-27 tenders open — Jharkhand, Bihar & Odisha. </span>
          <Link href="/contact" className="underline font-extrabold hover:text-primary-dark/80 inline-flex items-center gap-1">
            Submit RFQ <ArrowRight className="w-3 h-3" />
          </Link>
        </span>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary-dark/95 backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-primary-dark/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="bg-white rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg shadow-black/10 group-hover:shadow-accent/20 transition-shadow">
                <Image
                  src="/rr-equicons-hq.png"
                  alt="R R Equicons Pvt Ltd"
                  width={540}
                  height={400}
                  priority
                  className="h-8 sm:h-10 w-auto"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7">
              <Link href="/" className="text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2">
                Home
              </Link>
              <MegaDropdown
                label="About"
                links={aboutLinks}
                open={openDropdown === "about"}
                onToggle={() => setOpenDropdown("about")}
                onClose={() => setOpenDropdown(null)}
              />
              <MegaDropdown
                label="Projects"
                links={projectLinks}
                open={openDropdown === "projects"}
                onToggle={() => setOpenDropdown("projects")}
                onClose={() => setOpenDropdown(null)}
              />
              <MegaDropdown
                label="Services"
                links={serviceLinks}
                open={openDropdown === "services"}
                onToggle={() => setOpenDropdown("services")}
                onClose={() => setOpenDropdown(null)}
              />
              <Link href="/careers" className="text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2">
                Careers
              </Link>
              <Link href="/contact" className="text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2">
                Contact
              </Link>
              <Link
                href="/contact"
                className="btn-primary text-sm !px-6 !py-2.5 flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Get a Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-400 ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-primary-dark/98 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
            <Link href="/" className="block py-3 text-white/90 hover:text-white text-sm font-semibold" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            {[
              { title: "About", links: aboutLinks },
              { title: "Projects", links: projectLinks },
              { title: "Services", links: serviceLinks },
            ].map((group) => (
              <div key={group.title} className="border-t border-white/5 pt-3 mt-3">
                <p className="text-[10px] text-accent/70 uppercase tracking-[0.2em] font-bold mb-2">{group.title}</p>
                {group.links.map((l) => (
                  <Link key={l.href} href={l.href} className="block py-2.5 text-white/70 hover:text-white text-sm pl-3 transition-colors" onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="border-t border-white/5 pt-3 mt-3 space-y-1">
              <Link href="/careers" className="block py-3 text-white/90 hover:text-white text-sm font-semibold" onClick={() => setMobileOpen(false)}>Careers</Link>
              <Link href="/contact" className="block py-3 text-white/90 hover:text-white text-sm font-semibold" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>

            <Link
              href="/contact"
              className="block mt-4 btn-primary text-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
