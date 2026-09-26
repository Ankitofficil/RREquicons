import type { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { siteUrl } from "@/lib/site";
import { CONTENT_FILES } from "@/lib/content";

// Every public, indexable route. /api/* is excluded — it is not a page.
// Keep this list in sync when adding or removing a page under src/app.
const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Content files whose mtime should drive this page's lastModified. */
  sources?: (keyof typeof CONTENT_FILES)[];
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly", sources: ["projects"] },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/vision-mission", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/leadership", priority: 0.6, changeFrequency: "yearly", sources: ["leadership"] },
  { path: "/about/equipment", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/qhse", priority: 0.6, changeFrequency: "yearly" },
  { path: "/services/batching-plant", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/construction", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/transport", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/real-estate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly", sources: ["projects"] },
  { path: "/projects/epc", priority: 0.7, changeFrequency: "monthly" },
  { path: "/projects/case-studies", priority: 0.7, changeFrequency: "monthly", sources: ["case-studies"] },
  { path: "/insights", priority: 0.5, changeFrequency: "weekly", sources: ["insights"] },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
];

/**
 * When a content file was last written. Using the real mtime means a page's
 * lastModified only moves when its content actually changed — stamping every
 * page with the build time tells search engines the whole site changed on
 * every deploy, which makes the signal worthless.
 */
async function contentMtime(key: keyof typeof CONTENT_FILES): Promise<number> {
  try {
    const stat = await fs.stat(path.join(process.cwd(), CONTENT_FILES[key]));
    return stat.mtimeMs;
  } catch {
    return 0;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mtimes = Object.fromEntries(
    await Promise.all(
      (Object.keys(CONTENT_FILES) as (keyof typeof CONTENT_FILES)[]).map(
        async (k) => [k, await contentMtime(k)] as const,
      ),
    ),
  ) as Record<keyof typeof CONTENT_FILES, number>;

  // Pages with no content file fall back to the build time, which is the
  // best available signal for hand-edited copy.
  const buildTime = Date.now();

  return routes.map(({ path: p, priority, changeFrequency, sources }) => {
    const stamp = sources?.length
      ? Math.max(...sources.map((s) => mtimes[s] || 0)) || buildTime
      : buildTime;

    return {
      url: `${siteUrl}${p}`,
      lastModified: new Date(stamp),
      changeFrequency,
      priority,
    };
  });
}
