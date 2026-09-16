import type { Metadata } from "next";
import { Truck, HardHat, Factory, Package, Wrench } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Equipment & Fleet",
  description:
    "Our owned fleet — TATA Hitachi excavators, tower and mobile cranes, computer-controlled batching plants, transit mixers — so work never waits on hired plant.",
  alternates: { canonical: "/about/equipment" },
  openGraph: {
    title: "Equipment & Fleet",
    description:
      "Our owned fleet — TATA Hitachi excavators, tower and mobile cranes, computer-controlled batching plants, transit mixers — so work never waits on hired plant.",
    url: "/about/equipment",
  },
};

const categories = [
  { icon: HardHat, title: "Earthmoving & Excavation", color: "from-blue-500/10 to-blue-600/5", items: ["TATA Hitachi Excavators (multiple capacities)", "Caterpillar Excavators", "Bulldozers", "Backhoe Loaders"] },
  { icon: Truck, title: "Road Construction", color: "from-emerald-500/10 to-emerald-600/5", items: ["Hot Mix Plants", "Paver Finishers", "Vibratory Rollers", "Tandem Rollers", "Pneumatic Tyred Rollers"] },
  { icon: Factory, title: "Concrete & Material Handling", color: "from-amber-500/10 to-amber-600/5", items: ["Computer-controlled Batching Plants", "Transit Mixers", "Concrete Pumps", "Tower Cranes & Mobile Cranes"] },
  { icon: Package, title: "Logistics & Transport", color: "from-purple-500/10 to-purple-600/5", items: ["Hyva Dumpers", "Tippers", "Heavy-haul Trailers", "Fuel & Water Tankers"] },
];

export default function EquipmentPage() {
  return (
    <>
      <HeroSection title="A Fleet Built for Every Challenge." compact />

      <section className="py-14 sm:py-24 bg-page construction-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-light leading-relaxed text-lg mb-14 max-w-3xl">
              Self-performance is one of our core advantages — and it starts with owning the right equipment for the job. Our fleet eliminates dependency on third-party rentals, giving us tighter control over schedules, costs, and quality.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className={`card-premium p-7 h-full bg-gradient-to-br ${cat.color}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center shadow-sm">
                      <cat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-black text-primary-dark">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-text-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="mt-10 card-premium p-8 flex items-start gap-5 bg-gradient-to-r from-primary/5 to-accent/5">
              <Wrench className="w-10 h-10 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-black text-primary-dark mb-2">Workshop & Maintenance</h3>
                <p className="text-text-light leading-relaxed text-[15px]">
                  A fully equipped in-house workshop ensures equipment uptime — because a stopped machine is a stopped project.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
