import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // The panel must never be indexed, whatever the public robots rules say.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root min-h-screen bg-slate-100 dark:bg-slate-950">{children}</div>;
}
