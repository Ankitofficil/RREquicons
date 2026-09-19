"use client";

import { useState } from "react";
import type { Project } from "@/lib/content-types";
import Image from "next/image";
import { Building2, MapPin } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["All", "EPC", "Roads & Highways", "Buildings", "Industrial", "Residential", "Institutional"];

const colorMap: Record<string, string> = {
  "Roads & Highways": "from-blue-600/30 to-blue-900/40",
  "Industrial": "from-emerald-600/30 to-emerald-900/40",
  "Residential": "from-amber-600/30 to-amber-900/40",
  "EPC": "from-purple-600/30 to-purple-900/40",
  "Buildings": "from-cyan-600/30 to-cyan-900/40",
  "Institutional": "from-rose-600/30 to-rose-900/40",
};



export function ProjectsView({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <HeroSection
        title="Our Work Speaks for Itself."
        subtitle="From state highways to industrial complexes — every R R Equicons project carries the same commitment: deliver more than promised, faster than expected, safer than required."
        compact
      />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-surface text-text-light hover:bg-primary/5 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ScrollReveal key={`${project.name}-${active}`} delay={i * 60}>
                <div className="group card-premium overflow-hidden h-full">
                  <div className={`h-44 bg-gradient-to-br ${colorMap[project.category] || "from-gray-600/30 to-gray-900/40"} flex items-center justify-center relative`}>
                    {project.image ? (
                      // Uploaded photos are already cropped to 16:9 at 1600x900.
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <Building2 className="w-14 h-14 text-white/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/20"
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-[10px] text-white/50">{project.year}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-text mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-sm text-text-light mb-3">{project.scope}</p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
                      <span className="bg-surface px-2 py-0.5 rounded-full text-[10px] font-medium">{project.category}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
