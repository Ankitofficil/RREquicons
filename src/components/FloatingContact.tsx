"use client";

import { useEffect, useState } from "react";
import { Phone, X, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Floating quick-contact dock.
 * Bottom-right on desktop; comfortably thumb-reachable on mobile.
 * WhatsApp is the primary action (RMC enquiries land straight in chat),
 * with click-to-call as the secondary.
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);

  // Gentle one-time attention pulse a few seconds after load.
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 3500);
    const t2 = setTimeout(() => setNudge(false), 8500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3 print:hidden">
      {/* Expanded actions */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 pl-4 pr-1.5 py-1.5 bg-white dark:bg-[#0c2340] rounded-full shadow-xl shadow-black/15 dark:shadow-black/40 border border-gray-100 dark:border-white/10 hover:border-[#25D366]/40 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <span className="text-sm font-bold text-text whitespace-nowrap">WhatsApp us</span>
          <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {/* WhatsApp glyph */}
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.402L3.2 28.8l6.56-1.72a12.74 12.74 0 006.24 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.052A12.72 12.72 0 0016.001 3.2zm0 23.02h-.004a10.6 10.6 0 01-5.4-1.48l-.387-.23-4.005 1.05 1.07-3.9-.253-.4a10.56 10.56 0 01-1.62-5.66c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.107 7.517 3.117a10.56 10.56 0 013.113 7.52c0 5.86-4.77 10.61-10.62 10.61zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.848-1.59-1.895-1.777-2.215-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.623-.523-.539-.72-.549l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.574 1.146 3.094 1.306 3.307.16.213 2.256 3.445 5.466 4.83.764.33 1.36.527 1.825.674.767.244 1.464.21 2.015.127.615-.092 1.89-.773 2.156-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
            </svg>
          </span>
        </a>

        <a
          href={site.telHref}
          className="group flex items-center gap-3 pl-4 pr-1.5 py-1.5 bg-white dark:bg-[#0c2340] rounded-full shadow-xl shadow-black/15 dark:shadow-black/40 border border-gray-100 dark:border-white/10 hover:border-accent/40 transition-all"
          aria-label="Call us"
        >
          <span className="text-sm font-bold text-text whitespace-nowrap">Call us</span>
          <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Phone className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </span>
        </a>
      </div>

      {/* Main toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Contact us"}
        aria-expanded={open}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-black/25 transition-all duration-300 ${
          open
            ? "bg-primary-dark rotate-0"
            : "bg-[#25D366] hover:scale-105"
        }`}
      >
        {/* Attention rings */}
        {!open && nudge && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
            <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/40 animate-pulse" />
          </>
        )}
        {open ? (
          <X className="w-6 h-6 text-white relative" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white relative fill-white/10" />
        )}
      </button>
    </div>
  );
}
