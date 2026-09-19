import type { Metadata } from "next";
import { getInsights } from "@/lib/content";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Insights & News",
  description:
    "Industry insights and project stories — the infrastructure push in eastern India, how we deliver highway projects, and a practical guide to concrete grades.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights & News",
    description:
      "Industry insights and project stories — the infrastructure push in eastern India, how we deliver highway projects, and a practical guide to concrete grades.",
    url: "/insights",
  },
};

const categories = ["All", "Industry Insights", "Project Stories", "Technical Knowledge", "Company News"];

const colorMap: Record<string, string> = {
  "Industry Insights": "from-blue-600/30 to-blue-900/40",
  "Project Stories": "from-emerald-600/30 to-emerald-900/40",
  "Technical Knowledge": "from-amber-600/30 to-amber-900/40",
  "Company News": "from-purple-600/30 to-purple-900/40",
};



export default async function InsightsPage() {
  const posts = await getInsights();
  return (
    <>
      <HeroSection
        title="Insights & News"
        subtitle="Industry trends, project stories, technical knowledge, and updates from R R Equicons."
        compact
      />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-8 sm:mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-surface text-text-light hover:bg-primary/5 border border-gray-100 cursor-pointer transition-all"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <article className="card-premium overflow-hidden group h-full flex flex-col">
                  <div className={`h-40 bg-gradient-to-br ${colorMap[post.category] || "from-gray-600/30 to-gray-900/40"} flex items-center justify-center relative`}>
                    <Tag className="w-8 h-8 text-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                      <span className="bg-accent/10 text-accent-dark px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">{post.category}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    </div>
                    <h3 className="font-bold text-text mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-text-light leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">{post.readTime}</span>
                      <span className="text-sm text-primary font-bold flex items-center gap-1 group-hover:text-accent transition-colors">
                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
