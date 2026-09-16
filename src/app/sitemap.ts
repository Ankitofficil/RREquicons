import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Every public, indexable route. /api/* is excluded — it is not a page.
// Keep this list in sync when adding or removing a page under src/app.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/vision-mission", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/leadership", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/equipment", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/qhse", priority: 0.6, changeFrequency: "yearly" },
  { path: "/services/batching-plant", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/construction", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/transport", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/real-estate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/epc", priority: 0.7, changeFrequency: "monthly" },
  { path: "/projects/case-studies", priority: 0.7, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.5, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
