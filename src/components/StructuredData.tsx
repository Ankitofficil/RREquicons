import { siteUrl } from "@/lib/site";

/**
 * Renders a JSON-LD block. Kept as a component so pages declare their schema
 * next to their content rather than duplicating script boilerplate.
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumbs let Google show "Home › Services › Ready-Mix Concrete" in place
 * of a bare URL, which reads better and makes the site's shape explicit.
 * Pass the trail without the site root — that is prepended here.
 */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
      }),
    ),
  };
}
