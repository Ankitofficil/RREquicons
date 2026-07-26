"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

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

// RMC leads the services list — it's the flagship offering.
const serviceLinks = [
  { href: "/services/batching-plant", label: "Ready-Mix Concrete (RMC)", desc: "M10–M60+ · own batching plant" },
  { href: "/services/construction", label: "Civil Construction", desc: "Roads, bridges, buildings" },
  { href: "/services/transport", label: "Transport & Logistics", desc: "Owned transit-mixer fleet" },
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
        <div className="bg-white dark:bg-[#0c2340] rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-gray-100/80 dark:border-white/10 overflow-hidden p-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent dark:hover:from-accent/10 transition-all"
            >
              <span className="text-sm font-semibold text-text group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
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

  // Lock body scroll + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement / quick-contact bar */}
      <div className="bg-gradient-to-r from-accent via-accent-light to-accent text-white text-[11px] sm:text-sm py-2 px-3 sm:px-4 font-semibold relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shimmer_3s_ease_infinite] bg-[length:200%_100%]" />
        <div className="relative max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-3 leading-snug">
          <span className="hidden sm:inline">
            Ready-Mix Concrete supplied across Jamshedpur & Jharkhand — M10 to M60+, delivered on time.
          </span>
          <span className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a href={site.telHref} className="inline-flex items-center gap-1.5 hover:text-primary-dark/80 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="tabular-nums">{site.phone}</span>
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 underline font-extrabold hover:text-primary-dark/80"
            >
              WhatsApp <ArrowRight className="w-3 h-3" />
            </a>
          </span>
        </div>
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
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2">
                Home
              </Link>
              <Link
                href="/services/batching-plant"
                className="text-[13px] font-bold text-accent-light hover:text-white tracking-wide uppercase transition-colors py-2 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Ready-Mix Concrete
              </Link>
              <MegaDropdown
                label="Services"
                links={serviceLinks}
                open={openDropdown === "services"}
                onToggle={() => setOpenDropdown("services")}
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
                label="About"
                links={aboutLinks}
                open={openDropdown === "about"}
                onToggle={() => setOpenDropdown("about")}
                onClose={() => setOpenDropdown(null)}
              />
              <Link href="/careers" className="text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors py-2">
                Careers
              </Link>
              <ThemeToggle />
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !px-5 !py-2.5 flex items-center gap-2 !bg-[#25D366] !shadow-[#25D366]/30 hover:!shadow-[#25D366]/40"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/*
        Mobile menu — a self-contained, full-screen overlay rendered OUTSIDE <nav>.
        It must live outside the nav because the nav's `backdrop-blur` establishes a
        containing block that would otherwise trap `position: fixed` children.
      */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sliding full-height panel with its own header + internal scroll */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[70] flex flex-col bg-primary-dark transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
          <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-lg shadow-black/10">
            <Image src="/rr-equicons-hq.png" alt="R R Equicons Pvt Ltd" width={540} height={400} className="h-8 w-auto" />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable links */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
          {/* Flagship RMC link */}
          <Link
            href="/services/batching-plant"
            className="flex items-center justify-between py-3.5 px-4 mb-1 rounded-xl bg-accent/15 border border-accent/25 text-white font-bold text-sm active:bg-accent/25 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Ready-Mix Concrete
            </span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <Link href="/" className="block py-3 text-white/90 hover:text-white text-sm font-semibold" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          {[
            { title: "Services", links: serviceLinks },
            { title: "Projects", links: projectLinks },
            { title: "About", links: aboutLinks },
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
        </div>

        {/* Sticky quick-contact footer — always reachable, never clipped */}
        <div className="shrink-0 border-t border-white/10 p-4 grid grid-cols-2 gap-3 bg-primary-dark pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-bold active:scale-[0.98] transition-transform"
            onClick={() => setMobileOpen(false)}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={site.telHref}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-bold active:scale-[0.98] transition-transform"
            onClick={() => setMobileOpen(false)}
          >
            <Phone className="w-4 h-4" /> Call
          </a>
        </div>
      </div>
    </>
  );
}
