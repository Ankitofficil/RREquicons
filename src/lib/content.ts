import { promises as fs } from "node:fs";
import path from "node:path";
import { CONTENT_FILES, type Project, type CaseStudy, type Insight } from "./content-types";

// Server-only content loading. Content lives as JSON in /content and images in
// /public/uploads; the admin panel commits changes back to GitHub, which
// triggers a rebuild — so the repository is the database and nothing depends
// on a writable runtime disk.
//
// Types and constants live in ./content-types so client components can import
// them without pulling node:fs into the browser bundle.

export * from "./content-types";

const contentDir = path.join(process.cwd(), "content");

async function readJson<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(contentDir, file), "utf8"));
  } catch {
    // A missing or unparseable file must not take the public site down.
    return [];
  }
}

export const getProjects = () => readJson<Project>("projects.json");
export const getCaseStudies = () => readJson<CaseStudy>("case-studies.json");
export const getInsights = () => readJson<Insight>("insights.json");

export { CONTENT_FILES };
