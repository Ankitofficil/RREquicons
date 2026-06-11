// Single source of truth for company contact details.
// Update the placeholder phone number here and it propagates everywhere.

export const site = {
  name: "R R Equicons Pvt Ltd",
  // TODO: replace with the real number — used in Contact page and Footer.
  phone: "+91 XXXXX XXXXX",
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
