import {
  getProjects,
  getCaseStudies,
  getInsights,
  getLeadership,
} from "@/lib/content";
import { checkAccess } from "@/lib/admin/github";
import { AdminClient } from "./AdminClient";

// Always render fresh: the JSON files change underneath us as content is saved.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, caseStudies, insights, leadership, github] = await Promise.all([
    getProjects(),
    getCaseStudies(),
    getInsights(),
    getLeadership(),
    checkAccess(),
  ]);

  return (
    <AdminClient
      initialProjects={projects as unknown as Record<string, unknown>[]}
      initialCaseStudies={caseStudies as unknown as Record<string, unknown>[]}
      initialInsights={insights as unknown as Record<string, unknown>[]}
      initialLeadership={leadership as unknown as Record<string, unknown>[]}
      github={github}
    />
  );
}
