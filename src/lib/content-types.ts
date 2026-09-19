// Types and constants shared by server and client code.
//
// Kept separate from content.ts because that module imports node:fs — pulling
// it into a client component breaks the browser bundle.

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  scope: string;
  category: string;
  status: string;
  year: string;
  image?: string | null;
}

export interface CaseStudy {
  id: string;
  project: string;
  client: string;
  location: string;
  scope: string;
  duration: string;
  challenge: string;
  approach: string;
  outcome: string;
  color?: string;
  image?: string | null;
}

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string | null;
}

export const PROJECT_CATEGORIES = [
  "EPC",
  "Roads & Highways",
  "Buildings",
  "Industrial",
  "Residential",
  "Institutional",
] as const;

export const PROJECT_STATUSES = ["Completed", "Ongoing", "Upcoming"] as const;

export const INSIGHT_CATEGORIES = [
  "Industry Insights",
  "Project Stories",
  "Technical Knowledge",
  "Company News",
] as const;

export const CONTENT_FILES = {
  projects: "content/projects.json",
  "case-studies": "content/case-studies.json",
  insights: "content/insights.json",
} as const;

export type ContentType = keyof typeof CONTENT_FILES;
