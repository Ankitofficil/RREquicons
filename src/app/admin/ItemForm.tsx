"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LoaderCircle, TriangleAlert } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  INSIGHT_CATEGORIES,
} from "@/lib/content-types";
import type { ImageKind } from "@/lib/admin/images";

type Draft = Record<string, unknown>;

interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: readonly string[];
  required?: boolean;
  hint?: string;
  full?: boolean;
  rows?: number;
  /** Soft target for length — shown as a counter, never blocks saving. */
  ideal?: [number, number];
}

const FIELDS: Record<
  string,
  { noun: string; fields: FieldDef[]; image: ImageKind }
> = {
  projects: {
    noun: "project",
    image: "project",
    fields: [
      { name: "name", label: "Project name", required: true, full: true },
      { name: "client", label: "Client", required: true },
      { name: "location", label: "Location", required: true },
      { name: "scope", label: "Scope", full: true, hint: "e.g. Road Construction — 24 km bituminous road" },
      { name: "category", label: "Category", type: "select", options: PROJECT_CATEGORIES, required: true },
      { name: "status", label: "Status", type: "select", options: PROJECT_STATUSES, required: true },
      { name: "year", label: "Year", required: true, hint: "e.g. 2024" },
    ],
  },
  "case-studies": {
    noun: "case study",
    image: "case-study",
    fields: [
      { name: "project", label: "Project name", required: true, full: true },
      { name: "client", label: "Client", required: true },
      { name: "location", label: "Location", required: true },
      { name: "scope", label: "Scope", full: true },
      { name: "duration", label: "Duration", hint: "e.g. Jan 2022 – Nov 2023" },
      { name: "challenge", label: "Challenge", type: "textarea", full: true, rows: 3, hint: "What made this job hard?" },
      { name: "approach", label: "Approach", type: "textarea", full: true, rows: 4, hint: "How the team solved it" },
      { name: "outcome", label: "Outcome", type: "textarea", full: true, rows: 3, hint: "The result — with numbers where you have them" },
    ],
  },
  insights: {
    noun: "insight",
    image: "insight",
    fields: [
      { name: "title", label: "Title", required: true, full: true, ideal: [40, 70] },
      { name: "excerpt", label: "Excerpt", type: "textarea", full: true, rows: 3, hint: "One or two sentences shown on the card", ideal: [120, 165] },
      { name: "category", label: "Category", type: "select", options: INSIGHT_CATEGORIES, required: true },
      { name: "date", label: "Date", required: true, hint: "e.g. March 15, 2026" },
      { name: "readTime", label: "Read time", hint: "e.g. 5 min read" },
    ],
  },
};

export function ItemForm({
  type,
  item,
  saving,
  onSave,
  onCancel,
}: {
  type: string;
  item: Draft;
  saving: boolean;
  onSave: (item: Draft) => void;
  onCancel: () => void;
}) {
  const config = FIELDS[type];
  const [draft, setDraft] = useState<Draft>(item);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [original] = useState(() => JSON.stringify(item));

  const dirty = useMemo(
    () => JSON.stringify(draft) !== original,
    [draft, original],
  );

  // Warn before a browser refresh or tab close throws away edits. In-app
  // navigation is guarded separately, in `back()`.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Esc leaves the form, but asks first when there are unsaved edits — the
  // list-level Esc shortcut deliberately does not close the form for this
  // reason.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      if (dirty && !confirm("Discard your unsaved changes?")) return;
      onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, onCancel]);

  const set = (name: string, value: unknown) =>
    setDraft((d) => ({ ...d, [name]: value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing: Record<string, boolean> = {};
    for (const f of config.fields) {
      if (f.required && !String(draft[f.name] ?? "").trim()) missing[f.name] = true;
    }
    setErrors(missing);
    const keys = Object.keys(missing);
    if (keys.length) {
      // Take the user to the first problem rather than leaving them to hunt
      // for it — the case study form is long enough to hide one.
      const el = document.getElementById(keys[0]);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    onSave(draft);
  }

  function back() {
    if (dirty && !confirm("Discard your unsaved changes?")) return;
    onCancel();
  }


  const isNew = !item.id;
  const errorCount = Object.keys(errors).length;

  const fieldClass = (name: string) =>
    `w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white ${
      errors[name]
        ? "border-red-500 ring-1 ring-red-500/30"
        : "border-slate-300 dark:border-slate-700"
    }`;

  return (
    <form onSubmit={submit} className="max-w-4xl pb-24">
      <div className="a-fade-up">
      <button
        type="button"
        onClick={back}
        className="a-btn inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </button>

      <div className="flex items-baseline gap-3 mb-6 flex-wrap">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {isNew ? "New" : "Edit"} {config.noun}
        </h2>
        {dirty && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Unsaved changes
          </span>
        )}
      </div>

      {errorCount > 0 && (
        <p
          role="alert"
          className="a-fade flex items-center gap-2 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 rounded-lg px-3 py-2 mb-4"
        >
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {errorCount === 1
            ? "One required field is empty."
            : `${errorCount} required fields are empty.`}
        </p>
      )}

      <div className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          {config.fields.map((f) => {
            const value = (draft[f.name] as string) ?? "";
            const len = value.trim().length;
            const withinIdeal = f.ideal && len >= f.ideal[0] && len <= f.ideal[1];

            return (
              <div
                key={f.name}
                className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <label
                    htmlFor={f.name}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {f.label}
                    {f.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  {f.ideal && (
                    <span
                      className={`text-[11px] tabular-nums ${
                        len === 0
                          ? "text-slate-400"
                          : withinIdeal
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                      }`}
                      title={`Reads best between ${f.ideal[0]} and ${f.ideal[1]} characters in search results`}
                    >
                      {len}/{f.ideal[1]}
                    </span>
                  )}
                </div>

                {f.type === "select" ? (
                  <select
                    id={f.name}
                    value={value}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={fieldClass(f.name)}
                  >
                    <option value="">Select…</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    id={f.name}
                    rows={f.rows ?? 3}
                    value={value}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={fieldClass(f.name)}
                  />
                ) : (
                  <input
                    id={f.name}
                    type="text"
                    value={value}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={fieldClass(f.name)}
                  />
                )}

                {errors[f.name] ? (
                  <p className="text-xs text-red-600 mt-1">{f.label} is required.</p>
                ) : f.hint ? (
                  <p className="text-xs text-slate-500 mt-1">{f.hint}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
          <p className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Photo
          </p>
          <div className="max-w-sm">
            <ImageUploader
              kind={config.image}
              value={draft.image as string | null}
              onChange={(p) =>
                setDraft((d) => ({ ...d, image: p, imageCleared: p === null }))
              }
            />
          </div>
        </div>
      </div>

      </div>

      {/* Long forms — case studies especially — push the buttons past the
          fold, so the action bar sticks to the bottom of the viewport. */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="a-btn inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 shadow-sm"
          >
            {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {saving ? "Saving…" : isNew ? "Create" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={back}
            disabled={saving}
            className="a-btn rounded-lg px-4 py-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>
          <span className="ml-auto text-xs text-slate-400 hidden sm:block">
            {dirty ? "Unsaved changes" : "No changes yet"}
          </span>
        </div>
      </div>
    </form>
  );
}
