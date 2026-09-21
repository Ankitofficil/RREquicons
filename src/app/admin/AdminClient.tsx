"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  X,
  Undo2,
  SlidersHorizontal,
  Keyboard,
  ImageOff,
} from "lucide-react";
import { AdminShell, type TabId } from "./AdminShell";
import { ItemForm } from "./ItemForm";
import { Dashboard } from "./Dashboard";

type Draft = Record<string, unknown>;

const titleOf = (i: Draft) =>
  (i.name as string) ?? (i.project as string) ?? (i.title as string) ?? "Untitled";

const subtitleOf = (t: TabId, i: Draft) =>
  t === "projects"
    ? [i.client, i.location, i.year].filter(Boolean).join(" · ")
    : t === "case-studies"
      ? [i.client, i.duration].filter(Boolean).join(" · ")
      : [i.category, i.date].filter(Boolean).join(" · ");

const LIST_TABS: TabId[] = ["projects", "case-studies", "insights"];

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
  const [tab, setTab] = useState<TabId>("dashboard");
  const [projects, setProjects] = useState<Draft[]>(initialProjects);
  const [caseStudies, setCaseStudies] = useState<Draft[]>(initialCaseStudies);
  const [insights, setInsights] = useState<Draft[]>(initialInsights);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [toast, setToast] = useState<
    { kind: "ok" | "err"; text: string; undo?: () => void } | null
  >(null);
  const [pending, setPending] = useState<string | null>(null);
  const [movedId, setMovedId] = useState<string | null>(null);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lists: Record<string, [Draft[], (v: Draft[]) => void]> = {
    projects: [projects, setProjects],
    "case-studies": [caseStudies, setCaseStudies],
    insights: [insights, setInsights],
  };

  // Update a list from inside an async callback, where the captured `lists`
  // snapshot would otherwise be stale.
  function setLive(t: TabId, fn: (cur: Draft[]) => Draft[]) {
    const setter = { projects: setProjects, "case-studies": setCaseStudies, insights: setInsights }[
      t as "projects" | "case-studies" | "insights"
    ];
    setter?.((cur: Draft[]) => fn(cur));
  }

  function flash(
    kind: "ok" | "err",
    text: string,
    undo?: () => void,
  ) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ kind, text, undo });
    // An undo offer stays up longer — it is useless if it vanishes first.
    toastTimer.current = setTimeout(() => setToast(null), undo ? 9000 : 4500);
  }

  // "/" focuses search, "n" starts a new entry — both only on a list tab and
  // never while typing into a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
      if (e.key === "Escape") {
        // The form owns its own unsaved-changes guard, so Esc must not close
        // it from out here — otherwise the shortcut discards edits silently.
        if (showKeys) setShowKeys(false);
        return;
      }
      if (typing || e.altKey || e.ctrlKey || e.metaKey) return;
      if (!LIST_TABS.includes(tab) || editing) return;
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "n") {
        e.preventDefault();
        setEditing({});
      } else if (e.key === "?") {
        e.preventDefault();
        setShowKeys((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, editing, showKeys]);

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
          ? "Saved — live on the site in a minute or two."
          : "Saved locally.",
      );
    } catch {
      flash("err", "Could not reach the server.");
    } finally {
      setPending(null);
    }
  }

  async function remove(item: Draft) {
    const id = item.id as string;
    setExitingId(id); // play the exit before the row disappears
    await new Promise((r) => setTimeout(r, 200));

    const [list, setList] = lists[tab];
    const index = list.findIndex((i) => i.id === id);
    setList(list.filter((i) => i.id !== id));
    setExitingId(null);
    setPending(id);

    try {
      const res = await fetch(
        `/api/admin/content?type=${tab}&id=${encodeURIComponent(id)}`,
        { method: "DELETE" },
      );
      const data = (await res.json()) as { error?: string; committed?: boolean };
      if (!res.ok) {
        setList(list); // put it back
        flash("err", data.error ?? "Could not delete.");
        return;
      }
      // Deleting is the one destructive action here, so offer a way back
      // instead of a confirm dialog before the fact.
      flash("ok", `Deleted “${titleOf(item)}”.`, async () => {
        setToast(null);
        setPending("save");
        try {
          // Re-create it with the same id, so it keeps its photo and any
          // other stored fields rather than coming back as a new record.
          const res = await fetch("/api/admin/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: tab, item }),
          });
          if (!res.ok) {
            flash("err", "Could not restore it.");
            return;
          }
          const data = (await res.json()) as { item?: Draft };
          const back = data.item ?? item;
          // Put it back at the position it was deleted from.
          setLive(tab, (cur) => {
            const without = cur.filter((i) => i.id !== id);
            const at = Math.min(Math.max(index, 0), without.length);
            return [...without.slice(0, at), back, ...without.slice(at)];
          });
          flash("ok", "Restored.");
        } catch {
          flash("err", "Could not reach the server.");
        } finally {
          setPending(null);
        }
      });
    } catch {
      setList(list);
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
    setMovedId(item.id as string);
    setTimeout(() => setMovedId(null), 700);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: tab, ids: next.map((i) => i.id) }),
      });
      if (!res.ok) {
        setList(list);
        flash("err", "Could not save the new order.");
      }
    } catch {
      setList(list);
      flash("err", "Could not reach the server.");
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

  const current = LIST_TABS.includes(tab) ? lists[tab][0] : [];

  const statuses = useMemo(() => {
    const s = new Set<string>();
    current.forEach((i) => typeof i.status === "string" && s.add(i.status));
    return ["All", ...[...s].sort()];
  }, [current]);

  const filtered = useMemo(() => {
    let out = current;
    if (statusFilter !== "All") out = out.filter((i) => i.status === statusFilter);
    if (query) {
      const q = query.toLowerCase();
      out = out.filter((i) => JSON.stringify(i).toLowerCase().includes(q));
    }
    return out;
  }, [current, query, statusFilter]);

  const counts = {
    projects: projects.length,
    "case-studies": caseStudies.length,
    insights: insights.length,
  } as Partial<Record<TabId, number>>;

  const goTo = (t: TabId) => {
    setTab(t);
    setEditing(null);
    setQuery("");
    setStatusFilter("All");
  };

  return (
    <AdminShell active={tab} onChange={goTo} counts={counts}
      status={
        toast && (
          <div
            className={`a-toast px-4 py-2.5 text-sm flex items-center gap-2 ${
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
            <span className="flex-1">{toast.text}</span>
            {toast.undo && (
              <button
                onClick={toast.undo}
                className="a-btn inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80"
              >
                <Undo2 className="h-3.5 w-3.5" />
                Undo
              </button>
            )}
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              className="a-btn p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      }
    >
      {tab === "dashboard" ? (
        <Dashboard
          projects={projects}
          caseStudies={caseStudies}
          insights={insights}
          github={github}
          onGo={goTo}
        />
      ) : tab === "settings" ? (
        <SettingsPanel github={github} counts={counts} />
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
          <div className="flex flex-wrap items-center gap-2.5 justify-between mb-5 a-fade">
            <div className="relative flex-1 min-w-52 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…  (press /)"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-8 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-shadow"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="a-btn absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {statuses.length > 2 && (
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`a-btn text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                      statusFilter === s
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeys(true)}
                title="Keyboard shortcuts (?)"
                aria-label="Keyboard shortcuts"
                className="a-btn p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Keyboard className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditing({})}
                className="a-btn inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-3.5 py-2 text-sm font-medium text-white dark:text-slate-900 hover:opacity-90 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                New
              </button>
            </div>
          </div>

          {filtered.length !== current.length && (
            <p className="text-xs text-slate-400 mb-3 a-fade">
              Showing {filtered.length} of {current.length}
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16 a-fade-up">
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 grid place-items-center mx-auto mb-3">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {query || statusFilter !== "All"
                  ? "Nothing matches those filters."
                  : "Nothing here yet."}
              </p>
              <button
                onClick={() => {
                  if (query || statusFilter !== "All") {
                    setQuery("");
                    setStatusFilter("All");
                  } else setEditing({});
                }}
                className="a-btn mt-3 text-sm font-medium text-slate-900 dark:text-white underline underline-offset-4"
              >
                {query || statusFilter !== "All" ? "Clear filters" : "Add the first one"}
              </button>
            </div>
          ) : (
            <ul className="space-y-2 a-stagger" key={`${tab}-${statusFilter}`}>
              {filtered.map((item) => {
                const id = item.id as string;
                return (
                  <li
                    key={id}
                    className={`a-row grid grid-cols-[auto_1fr_auto] sm:flex sm:items-center gap-x-3 gap-y-2 sm:gap-4 rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-3 ${
                      movedId === id ? "a-moved" : ""
                    } ${exitingId === id ? "a-exiting" : ""}`}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image as string}
                        alt=""
                        loading="lazy"
                        className="h-11 w-16 sm:h-12 sm:w-20 rounded-lg object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
                      />
                    ) : (
                      <div
                        title="No photo yet"
                        className="h-11 w-16 sm:h-12 sm:w-20 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 grid place-items-center"
                      >
                        <ImageOff className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}

                    <button
                      onClick={() => setEditing(item)}
                      className="min-w-0 sm:flex-1 text-left"
                    >
                      <p className="font-medium text-slate-900 dark:text-white line-clamp-2 sm:truncate">
                        {titleOf(item)}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {subtitleOf(tab, item)}
                      </p>
                    </button>

                    {typeof item.status === "string" && (
                      <span
                        className={`self-start sm:self-auto text-[10px] sm:text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                          item.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "Ongoing"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    )}

                    <div className="a-actions col-span-3 sm:col-auto flex gap-0.5 shrink-0 justify-end border-t sm:border-0 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0 -mx-1 sm:mx-0">
                      {!query && statusFilter === "All" && (
                        <>
                          <button
                            onClick={() => move(item, -1)}
                            disabled={filtered.indexOf(item) === 0}
                            aria-label="Move up"
                            title="Move up"
                            className="a-btn p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => move(item, 1)}
                            disabled={filtered.indexOf(item) === filtered.length - 1}
                            aria-label="Move down"
                            title="Move down"
                            className="a-btn p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => duplicate(item)}
                        aria-label={`Duplicate ${titleOf(item)}`}
                        title="Duplicate"
                        className="a-btn inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditing(item)}
                        aria-label={`Edit ${titleOf(item)}`}
                        title="Edit"
                        className="a-btn p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(item)}
                        disabled={pending === id}
                        aria-label={`Delete ${titleOf(item)}`}
                        title="Delete"
                        className="a-btn p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 disabled:opacity-50"
                      >
                        {pending === id ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {showKeys && <ShortcutHelp onClose={() => setShowKeys(false)} />}
    </AdminShell>
  );
}

function ShortcutHelp({ onClose }: { onClose: () => void }) {
  const keys = [
    ["/", "Focus search"],
    ["n", "New entry"],
    ["Esc", "Close form or dialog"],
    ["Alt + 1…5", "Jump to a tab"],
    ["?", "This help"],
  ];
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-sm a-fade p-4"
      onClick={onClose}
    >
      <div
        className="a-scale-in w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Keyboard shortcuts
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="a-btn p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <dl className="space-y-2">
          {keys.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-sm">
              <dt className="text-slate-600 dark:text-slate-400">{v}</dt>
              <dd>
                <kbd className="px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                  {k}
                </kbd>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function SettingsPanel({
  github,
  counts,
}: {
  github: { ok: boolean; message: string };
  counts: Partial<Record<TabId, number>>;
}) {
  return (
    <div className="space-y-4 max-w-2xl">
      <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 a-fade-up">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          Storage
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

      <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 a-fade-up">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-3">Content</h2>
        <dl className="grid grid-cols-3 gap-4 text-center">
          {[
            ["Projects", counts.projects],
            ["Case studies", counts["case-studies"]],
            ["Insights", counts.insights],
          ].map(([label, n]) => (
            <div key={label as string}>
              <dd className="text-2xl font-semibold text-slate-900 dark:text-white tabular-nums">
                {n ?? 0}
              </dd>
              <dt className="text-xs text-slate-500">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 a-fade-up">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-3">
          Photo sizes
        </h2>
        <p className="text-xs text-slate-500 mb-3">
          Uploads are cropped and re-encoded to these, so cards always line up.
        </p>
        <dl className="space-y-1.5 text-sm">
          {[
            ["Project photos", "16:9 · 1600×900"],
            ["Case study photos", "4:3 · 1600×1200"],
            ["Article images", "16:9 · 1600×900"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-slate-600 dark:text-slate-400">{k}</dt>
              <dd className="font-mono text-xs text-slate-500">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
