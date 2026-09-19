"use client";

import { useState } from "react";
import { LogOut, HardHat, FileText, Newspaper, Settings } from "lucide-react";

const TABS = [
  { id: "projects", label: "Projects", icon: HardHat },
  { id: "case-studies", label: "Case Studies", icon: FileText },
  { id: "insights", label: "Insights", icon: Newspaper },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export function AdminShell({
  active,
  onChange,
  children,
  status,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
  children: React.ReactNode;
  status?: React.ReactNode;
}) {
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                R R Equicons
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium shrink-0">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hidden sm:inline"
              >
                View site ↗
              </a>
              <button
                onClick={signOut}
                disabled={signingOut}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>

          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  active === id
                    ? "border-slate-900 dark:border-white text-slate-900 dark:text-white"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {status}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
