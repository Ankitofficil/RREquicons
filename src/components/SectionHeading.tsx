interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  tag?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  tag,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 sm:mb-12 ${centered ? "text-center" : ""}`}>
      {tag && (
        <span className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
          light ? "text-accent/80" : "text-accent-dark"
        }`}>
          {tag}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 ${
        light ? "text-white" : "text-primary-dark"
      }`}>
        {title}
      </h2>
      <div className={`flex items-center gap-2 ${centered ? "justify-center" : ""} mb-4`}>
        <div className="w-8 h-1 rounded-full bg-accent" />
        <div className="w-2 h-1 rounded-full bg-accent/50" />
        <div className="w-1 h-1 rounded-full bg-accent/30" />
      </div>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${
          light ? "text-white/60" : "text-text-light"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
