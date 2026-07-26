"use client";

import { useState } from "react";
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

const projects = [
  { name: "State Highway NH-33 Extension", client: "State PWD, Jharkhand", location: "Jharkhand", scope: "Road Construction - 24 km bituminous road", category: "Roads & Highways", status: "Completed", year: "2023" },
  { name: "Industrial Complex - Adityapur", client: "Private Industrial Group", location: "Jamshedpur", scope: "Multi-building EPC for manufacturing facility", category: "Industrial", status: "Completed", year: "2022" },
  { name: "Residential Township Phase I", client: "Real Estate Developer", location: "Jamshedpur", scope: "120 Unit residential housing", category: "Residential", status: "Ongoing", year: "2024" },
  { name: "Bridge Construction - Subarnarekha", client: "State PWD", location: "Jharkhand", scope: "RCC Bridge - 180m span", category: "EPC", status: "Completed", year: "2021" },
  { name: "Batching Plant Operations", client: "Internal / Multi-client", location: "Gamharia", scope: "60 m³/hr RMC Plant setup & operations", category: "Industrial", status: "Completed", year: "2020" },
  { name: "Commercial Office Complex", client: "Private Developer", location: "Bistupur", scope: "G+5 Commercial Building", category: "Buildings", status: "Ongoing", year: "2025" },
  { name: "District Road Upgrade", client: "State Rural Development", location: "Bihar", scope: "15 km road widening & resurfacing", category: "Roads & Highways", status: "Completed", year: "2023" },
  { name: "Temple Complex Construction", client: "Religious Trust", location: "Deoghar, Jharkhand", scope: "Multi-structure religious campus", category: "Institutional", status: "Completed", year: "2022" },
  { name: "Warehouse & Logistics Hub", client: "Industrial Client", location: "Adityapur", scope: "20,000 sq ft warehouse facility", category: "Industrial", status: "Completed", year: "2021" },
  { name: "Staff Housing Colony", client: "PSU Client", location: "Jharkhand", scope: "60 unit staff quarters with amenities", category: "Residential", status: "Completed", year: "2020" },
  { name: "Flyover Approach Road", client: "National Highways Authority", location: "Jharkhand", scope: "2.5 km approach road construction", category: "EPC", status: "Completed", year: "2023" },
  { name: "School Building Complex", client: "State Education Dept", location: "Jharkhand", scope: "G+2 school building with playground", category: "Institutional", status: "Completed", year: "2022" },
];

export default function ProjectsPage() {
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
                    <Building2 className="w-14 h-14 text-white/10" />
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
