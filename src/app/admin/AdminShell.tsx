"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  LogOut,
  HardHat,
  FileText,
  Newspaper,
  Settings,
  LayoutDashboard,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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
  counts,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
  children: React.ReactNode;
  status?: React.ReactNode;
  counts?: Partial<Record<TabId, number>>;
}) {
  const [signingOut, setSigningOut] = useState(false);

  // The theme lives as a class on <html>, put there by the root layout's
  // pre-paint script — outside React entirely. useSyncExternalStore reads it
  // without setting state from an effect (which cascades renders), and the
  // MutationObserver keeps the icon right if the public site's own toggle
  // changes it in another tab.
  const dark = useSyncExternalStore(
    (onChange) => {
      const mo = new MutationObserver(onChange);
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => mo.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false, // server: the script has not run yet
  );

  function toggleTheme() {
    // Flip relative to what is actually on <html>, not to React state, which
    // starts false on the server and would invert the first click.
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode — the toggle still works for this session.
    }
  }

  // Alt+1..5 jumps between tabs. Alt rather than a bare digit so typing
  // into a form field is never hijacked.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= TABS.length) {
        e.preventDefault();
        onChange(TABS[n - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange]);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                R R Equicons
              </span>
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shrink-0">
                Admin
              </span>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                title="Open the public site"
                className="a-btn hidden sm:inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              >
                View site
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={toggleTheme}
                title={dark ? "Switch to light" : "Switch to dark"}
                aria-label="Toggle theme"
                className="a-btn p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={signOut}
                disabled={signingOut}
                title="Sign out"
                className="a-btn inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-950/50 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>

          <nav className="flex gap-0.5 -mb-px overflow-x-auto scrollbar-none">
            {TABS.map(({ id, label, icon: Icon }, i) => {
              const isActive = active === id;
              const count = counts?.[id];
              return (
                <button
                  key={id}
                  onClick={() => onChange(id)}
                  title={`${label}  (Alt+${i + 1})`}
                  className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {typeof count === "number" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                  {/* The underline slides between tabs rather than jumping. */}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-slate-900 dark:bg-white opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {status}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
