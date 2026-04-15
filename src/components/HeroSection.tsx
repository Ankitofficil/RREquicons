import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  compact = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${compact ? "py-14 sm:py-28" : "py-16 sm:py-36 lg:py-48"} hero-gradient overflow-hidden`}
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-pattern" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
        {/* Diagonal lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]"
          style={{
            background: "repeating-linear-gradient(-45deg, transparent, transparent 20px, white 20px, white 21px)"
          }}
        />
      </div>

      {/* Bottom edge accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-4 sm:mb-6 animate-fade-in-up tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto px-2 sm:px-0 mb-6 sm:mb-10 animate-fade-in-up delay-200 leading-relaxed">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary text-base">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary text-base">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
