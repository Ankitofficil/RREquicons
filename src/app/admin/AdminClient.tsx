"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  LoaderCircle,
  CircleCheck,
  TriangleAlert,
  Search,
  GitBranch,
  ChevronUp,
  ChevronDown,
  Copy,
} from "lucide-react";
import { AdminShell, type TabId } from "./AdminShell";
import { ItemForm } from "./ItemForm";

// Items are edited as loose records: the three content types share a form
// pipeline, and each has a different field set.
type Draft = Record<string, unknown>;

const titleOf = (i: Draft) =>
  (i.name as string) ?? (i.project as string) ?? (i.title as string) ?? "Untitled";

const subtitleOf = (t: TabId, i: Draft) =>
  t === "projects"
    ? [i.client, i.location, i.year].filter(Boolean).join(" · ")
    : t === "case-studies"
      ? [i.client, i.duration].filter(Boolean).join(" · ")
      : [i.category, i.date].filter(Boolean).join(" · ");

export function AdminClient({
  initialProjects,
  initialCaseStudies,
  initialInsights,
  github,
}: {
  initialProjects: Draft[];
  initialCaseStudies: Draft[];
  initialInsights: Draft[];
  github: { ok: boolean; message: string };
}) {
  const [tab, setTab] = useState<TabId>("projects");
  const [projects, setProjects] = useState<Draft[]>(initialProjects);
  const [caseStudies, setCaseStudies] = useState<Draft[]>(initialCaseStudies);
  const [insights, setInsights] = useState<Draft[]>(initialInsights);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const lists: Record<string, [Draft[], (v: Draft[]) => void]> = {
    projects: [projects, setProjects],
    "case-studies": [caseStudies, setCaseStudies],
    insights: [insights, setInsights],
  };

  function flash(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 5000);
  }

  async function save(item: Draft) {
    setPending("save");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: tab, item }),
      });
      const data = (await res.json()) as {
        id?: string; error?: string; committed?: boolean; item?: Draft;
      };
      if (!res.ok) {
        flash("err", data.error ?? "Could not save.");
        return;
      }

      const [list, setList] = lists[tab];
      // Use the server's merged record, not the form draft — the server
      // merges onto what is stored, so this is the authoritative version.
      const saved = data.item ?? { ...item, id: data.id };
      const idx = list.findIndex((i) => i.id === data.id);
      setList(idx >= 0
        ? list.map((i) => (i.id === data.id ? saved : i))
        : [saved, ...list]);

      setEditing(null);
      flash(
        "ok",
        data.committed
          ? "Saved and pushed to GitHub — live in a minute or two."
          : "Saved locally.",
      );
    } catch {
      flash("err", "Could not reach the server.");
    } finally {
      setPending(null);
    }
  }

  async function remove(item: Draft) {
    if (!confirm(`Delete “${titleOf(item)}”? This cannot be undone.`)) return;
    setPending(item.id as string);
    try {
      const res = await fetch(
        `/api/admin/content?type=${tab}&id=${encodeURIComponent(item.id as string)}`,
        { method: "DELETE" },
      );
      const data = (await res.json()) as { error?: string; committed?: boolean };
      if (!res.ok) {
        flash("err", data.error ?? "Could not delete.");
        return;
      }
      const [list, setList] = lists[tab];
      setList(list.filter((i) => i.id !== item.id));
      flash("ok", data.committed ? "Deleted and pushed to GitHub." : "Deleted locally.");
    } catch {
      flash("err", "Could not reach the server.");
    } finally {
      setPending(null);
    }
  }


  // Ordering matters: the public pages render these lists in array order.
  async function move(item: Draft, delta: number) {
    const [list, setList] = lists[tab];
    const from = list.findIndex((i) => i.id === item.id);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= list.length) return;

    const next = [...list];
    [next[from], next[to]] = [next[to], next[from]];
    setList(next); // optimistic — the server persists the same order

    setPending(item.id as string);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: tab, ids: next.map((i) => i.id) }),
      });
      if (!res.ok) {
        setList(list); // put it back
        flash("err", "Could not save the new order.");
      }
    } catch {
      setList(list);
      flash("err", "Could not reach the server.");
    } finally {
      setPending(null);
    }
  }

  function duplicate(item: Draft) {
    // Drop the id so it saves as a new record, and the photo with it: the
    // copy is a different project, and carrying the original's image (or a
    // stale null) would otherwise be written onto whatever it overwrites.
    const { id: _ignored, image: _img, ...rest } = item;
    void _ignored;
    void _img;
    const copy: Draft = { ...rest };
    const key = "name" in copy ? "name" : "project" in copy ? "project" : "title";
    copy[key] = `${copy[key] as string} (copy)`;
    setEditing(copy);
  }

  const current = tab === "settings" ? [] : lists[tab][0];
  const filtered = query
    ? current.filter((i) =>
        JSON.stringify(i).toLowerCase().includes(query.toLowerCase()),
      )
    : current;

  return (
    <AdminShell
      active={tab}
      onChange={(t) => {
        setTab(t);
        setEditing(null);
        setQuery("");
      }}
      status={
        toast && (
          <div
            className={`px-4 py-2.5 text-sm flex items-center gap-2 ${
              toast.kind === "ok"
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
            }`}
          >
            {toast.kind === "ok" ? (
              <CircleCheck className="h-4 w-4 shrink-0" />
            ) : (
              <TriangleAlert className="h-4 w-4 shrink-0" />
            )}
            {toast.text}
          </div>
        )
      }
    >
      {tab === "settings" ? (
        <Settings github={github} counts={{
          projects: projects.length,
          caseStudies: caseStudies.length,
          insights: insights.length,
        }} />
      ) : editing ? (
        <ItemForm
          type={tab}
          item={editing}
          saving={pending === "save"}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3 justify-between mb-5">
            <div className="relative flex-1 min-w-52 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
            </div>
            <button
              onClick={() => setEditing({})}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-3.5 py-2 text-sm font-medium text-white dark:text-slate-900 hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500 py-12 text-center">
              {query ? "Nothing matches that search." : "Nothing here yet."}
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((item) => (
                <li
                  key={item.id as string}
                  className="flex items-center gap-4 rounded-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-3"
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image as string}
                      alt=""
                      className="h-11 w-16 sm:h-12 sm:w-20 rounded object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
                    />
                  ) : (
                    <div className="h-11 w-16 sm:h-12 sm:w-20 rounded bg-slate-100 dark:bg-slate-800 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 dark:text-white line-clamp-2 sm:truncate">
                      {titleOf(item)}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {subtitleOf(tab, item)}
                    </p>
                  </div>
                  {typeof item.status === "string" && (
                    <span
                      className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full shrink-0 ${
                        item.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                  <div className="flex gap-0.5 shrink-0">
                    {!query && (
                      <>
                        <button
                          onClick={() => move(item, -1)}
                          disabled={filtered.indexOf(item) === 0 || pending === item.id}
                          aria-label="Move up"
                          title="Move up"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => move(item, 1)}
                          disabled={filtered.indexOf(item) === filtered.length - 1 || pending === item.id}
                          aria-label="Move down"
                          title="Move down"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => duplicate(item)}
                      aria-label={`Duplicate ${titleOf(item)}`}
                      title="Duplicate"
                      className="hidden sm:inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditing(item)}
                      aria-label={`Edit ${titleOf(item)}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(item)}
                      disabled={pending === item.id}
                      aria-label={`Delete ${titleOf(item)}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50"
                    >
                      {pending === item.id ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminShell>
  );
}

function Settings({
  github,
  counts,
}: {
  github: { ok: boolean; message: string };
  counts: { projects: number; caseStudies: number; insights: number };
}) {
  return (
    <div className="space-y-6 max-w-2xl">
      <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          Storage
        </h2>
        <div
          className={`flex items-start gap-2 text-sm rounded-lg p-3 ${
            github.ok
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
              : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
          }`}
        >
          {github.ok ? (
            <CircleCheck className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-medium">{github.message}</p>
            {!github.ok && (
              <p className="mt-1 opacity-90">
                Changes save locally only and will be lost on the next deploy.
                Set GITHUB_TOKEN and GITHUB_REPO to store them permanently.
              </p>
            )}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Saving commits to the repository, which triggers a rebuild. Expect
          changes to appear on the live site one to two minutes later.
        </p>
      </section>

      <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Content</h2>
        <dl className="grid grid-cols-3 gap-4 text-center">
          {[
            ["Projects", counts.projects],
            ["Case studies", counts.caseStudies],
            ["Insights", counts.insights],
          ].map(([label, n]) => (
            <div key={label as string}>
              <dd className="text-2xl font-semibold text-slate-900 dark:text-white">{n}</dd>
              <dt className="text-xs text-slate-500">{label}</dt>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
