"use client";

import {
  HardHat,
  FileText,
  Newspaper,
  ImageOff,
  CircleCheck,
  TriangleAlert,
  ExternalLink,
  Clock,
} from "lucide-react";
import type { TabId } from "./AdminShell";

type Draft = Record<string, unknown>;

const titleOf = (i: Draft) =>
  (i.name as string) ?? (i.project as string) ?? (i.title as string) ?? "Untitled";

export function Dashboard({
  projects,
  caseStudies,
  insights,
  leadership,
  github,
  onGo,
}: {
  projects: Draft[];
  caseStudies: Draft[];
  insights: Draft[];
  leadership: Draft[];
  github: { ok: boolean; message: string };
  onGo: (tab: TabId, filter?: string) => void;
}) {
  const ongoing = projects.filter((p) => p.status === "Ongoing").length;
  const all = [...projects, ...caseStudies, ...insights, ...leadership];
  const missingPhotos = all.filter((i) => !i.image);

  const cards = [
    {
      tab: "projects" as TabId,
      label: "Projects",
      value: projects.length,
      sub: ongoing ? `${ongoing} ongoing` : "all completed",
      icon: HardHat,
      tone: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50",
      latest: projects[0] ? titleOf(projects[0]) : null,
    },
    {
      tab: "case-studies" as TabId,
      label: "Case Studies",
      value: caseStudies.length,
      sub: "detailed write-ups",
      icon: FileText,
      tone: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50",
      latest: caseStudies[0] ? titleOf(caseStudies[0]) : null,
    },
    {
      tab: "insights" as TabId,
      label: "Insights",
      value: insights.length,
      sub: "articles & news",
      icon: Newspaper,
      tone: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50",
      latest: insights[0] ? titleOf(insights[0]) : null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3 a-stagger">
        {cards.map(({ tab, label, value, sub, icon: Icon, tone, latest }) => (
          <button
            key={label}
            onClick={() => onGo(tab)}
            className="a-row text-left rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 hover:ring-slate-300 dark:hover:ring-slate-700"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`h-9 w-9 rounded-lg grid place-items-center ${tone}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />
            </div>
            <p className="text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {value}
            </p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
              {label}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>
            {latest && (
              <p className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 truncate">
                Top: <span className="text-slate-600 dark:text-slate-300">{latest}</span>
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Things that need attention */}
        <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 a-fade-up">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-amber-500" />
            Needs attention
          </h2>

          {missingPhotos.length === 0 ? (
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <CircleCheck className="h-4 w-4 text-emerald-500" />
              Everything has a photo.
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {missingPhotos.length}
                </span>{" "}
                of {all.length} entries have no photo. Cards fall back to a
                plain gradient without one.
              </p>
              <ul className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {missingPhotos.slice(0, 8).map((i, n) => (
                  <li
                    key={(i.id as string) ?? n}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <ImageOff className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />
                    <span className="truncate">{titleOf(i)}</span>
                  </li>
                ))}
              </ul>
              {missingPhotos.length > 8 && (
                <p className="text-xs text-slate-400 mt-2">
                  and {missingPhotos.length - 8} more
                </p>
              )}
            </>
          )}
        </section>

        {/* Storage / publishing status */}
        <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 a-fade-up">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            Publishing
          </h2>
          <div
            className={`flex items-start gap-2 text-sm rounded-lg p-3 ${
              github.ok
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
                : "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200"
            }`}
          >
            {github.ok ? (
              <CircleCheck className="h-4 w-4 shrink-0 mt-0.5" />
            ) : (
              <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            <p className="font-medium">{github.message}</p>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            Saving commits to the repository and triggers a rebuild, so changes
            reach the live site about a minute or two later — not instantly.
          </p>
          <a
            href="/projects"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mt-4"
          >
            View the live projects page
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>
      </div>
    </div>
  );
}
