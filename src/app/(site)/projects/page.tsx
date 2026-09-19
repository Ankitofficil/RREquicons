import { getProjects } from "@/lib/content";
import { ProjectsView } from "./ProjectsView";

export default async function ProjectsPage() {
  // Content comes from content/projects.json, which the admin panel edits.
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
