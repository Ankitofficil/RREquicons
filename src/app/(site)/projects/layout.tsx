import type { Metadata } from "next";

// projects/page.tsx is a client component (it has category filtering), so it
// cannot export metadata itself — this layout carries it instead.
export const metadata: Metadata = {
  title: {
    // `default` applies to /projects itself. Without re-declaring `template`,
    // this layout would override the root one and child pages
    // (/projects/epc, /projects/case-studies) would lose the brand suffix.
    default: "Projects & Infrastructure Portfolio",
    template: "%s | R R Equicons Pvt Ltd",
  },
  description:
    "Completed and ongoing projects across Jharkhand and Bihar — highways, RCC bridges, industrial complexes, warehouses, commercial buildings and townships.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects & Infrastructure Portfolio",
    description:
      "Completed and ongoing projects across Jharkhand and Bihar — highways, RCC bridges, industrial complexes, warehouses, commercial buildings and townships.",
    url: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
