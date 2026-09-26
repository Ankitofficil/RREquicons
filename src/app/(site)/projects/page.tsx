import { getProjects } from "@/lib/content";
import { StructuredData, breadcrumbs } from "@/components/StructuredData";
import { site, siteUrl } from "@/lib/site";
import { ProjectsView } from "./ProjectsView";

export default async function ProjectsPage() {
  // Content comes from content/projects.json, which the admin panel edits.
  const projects = await getProjects();

  // The portfolio as a list, so the projects are visible to search engines as
  // discrete works rather than one page of text.
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.scope,
        ...(p.image ? { image: `${siteUrl}${p.image}` } : {}),
        creator: { "@type": "Organization", name: site.name },
        locationCreated: { "@type": "Place", name: p.location },
        dateCreated: p.year,
      },
    })),
  };

  return (
    <>
      <StructuredData data={breadcrumbs([{ name: "Projects", path: "/projects" }])} />
      <StructuredData data={listSchema} />
      <ProjectsView projects={projects} />
    </>
  );
}
