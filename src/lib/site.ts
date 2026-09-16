// Single source of truth for company contact details.
// Update the placeholder phone number here and it propagates everywhere.

// ─── PHONE ───
//   • phoneDisplay  — shown to users (any formatting you like)
//   • phoneE164     — digits only, with country code, NO "+", spaces, or dashes.
//                     WhatsApp + tel: links are built from this. e.g. "919876543210"
const phoneDisplay = "+91 84570 04176";
const phoneE164 = "918457004176"; // used for wa.me / tel: links

// Canonical public origin, used for absolute URLs in metadata, the sitemap
// and robots.txt. Override per-environment with NEXT_PUBLIC_SITE_URL (no
// trailing slash), e.g. https://rrequiconspvtltd.com
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rrequiconspvtltd.com"
).replace(/[/]$/, "");

export const site = {
  name: "R R Equicons Pvt Ltd",
  url: siteUrl,
  tagline: "Ready-Mix Concrete & Civil Construction",
  phone: phoneDisplay,
  phoneE164,
  // Pre-filled WhatsApp message so enquiries arrive with context.
  whatsapp: {
    href: `https://wa.me/${phoneE164}?text=${encodeURIComponent(
      "Hi R R Equicons, I'd like to enquire about your Ready-Mix Concrete / construction services."
    )}`,
    // A version used on the RMC page CTA.
    rmcHref: `https://wa.me/${phoneE164}?text=${encodeURIComponent(
      "Hi R R Equicons, I'd like a quote for Ready-Mix Concrete (RMC). Grade / quantity / site location: "
    )}`,
  },
  telHref: `tel:+${phoneE164}`,
  email: {
    general: "info@rrequiconspvtltd.com",
    careers: "careers@rrequiconspvtltd.com",
    tenders: "tenders@rrequiconspvtltd.com",
  },
  address: {
    lines: [
      "A/4, Ward No. 5, Plot No. 51 & 52",
      "Mahavir Enclave, Ground Floor",
      "M.E. School Road, Jugsalai",
      "Jamshedpur, Jharkhand — 831006",
    ],
    short: "Jugsalai, Jamshedpur, Jharkhand — 831006",
  },
  hours: "Mon–Sat, 9:30 AM – 6:30 PM IST",
} as const;
