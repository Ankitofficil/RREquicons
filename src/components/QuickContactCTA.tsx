import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Reusable WhatsApp + Call action pair for service-page CTAs.
 * `waHref` lets a page pass a context-specific pre-filled WhatsApp message.
 */
export default function QuickContactCTA({
  waHref = site.whatsapp.href,
  waLabel = "WhatsApp Us",
  className = "",
}: {
  waHref?: string;
  waLabel?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-sm inline-flex items-center justify-center gap-2 !bg-[#25D366] !shadow-[#25D366]/30 w-full sm:w-auto"
      >
        <MessageCircle className="w-4 h-4" /> {waLabel}
      </a>
      <a
        href={site.telHref}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/10 dark:border-white/15 text-primary dark:text-white font-bold text-sm hover:border-accent/30 hover:text-accent dark:hover:border-accent/50 transition-colors w-full sm:w-auto"
      >
        <Phone className="w-4 h-4" /> Call {site.phone}
      </a>
    </div>
  );
}
