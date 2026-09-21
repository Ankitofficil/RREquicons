"use client";

import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
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
}

const FIELDS: Record<string, { fields: FieldDef[]; image: ImageKind }> = {
  projects: {
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
    image: "case-study",
    fields: [
      { name: "project", label: "Project name", required: true, full: true },
      { name: "client", label: "Client", required: true },
      { name: "location", label: "Location", required: true },
      { name: "scope", label: "Scope", full: true },
      { name: "duration", label: "Duration", hint: "e.g. Jan 2022 – Nov 2023" },
      { name: "challenge", label: "Challenge", type: "textarea", full: true },
      { name: "approach", label: "Approach", type: "textarea", full: true },
      { name: "outcome", label: "Outcome", type: "textarea", full: true },
    ],
  },
  insights: {
    image: "insight",
    fields: [
      { name: "title", label: "Title", required: true, full: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", full: true, hint: "One or two sentences shown on the card" },
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

  const set = (name: string, value: unknown) =>
    setDraft((d) => ({ ...d, [name]: value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing: Record<string, boolean> = {};
    for (const f of config.fields) {
      if (f.required && !String(draft[f.name] ?? "").trim()) missing[f.name] = true;
    }
    setErrors(missing);
    if (Object.keys(missing).length) return;
    onSave(draft);
  }

  const isNew = !item.id;

  return (
    <form onSubmit={submit} className="max-w-4xl">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </button>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        {isNew ? "New" : "Edit"} {type.replace("-", " ").replace(/s$/, "")}
      </h2>

      <div className="rounded-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-5 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          {config.fields.map((f) => (
            <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label
                htmlFor={f.name}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                {f.label}
                {f.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>

              {f.type === "select" ? (
                <select
                  id={f.name}
                  value={(draft[f.name] as string) ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className={`w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white ${
                    errors[f.name]
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
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
                  rows={3}
                  value={(draft[f.name] as string) ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className={`w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white ${
                    errors[f.name]
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                />
              ) : (
                <input
                  id={f.name}
                  type="text"
                  value={(draft[f.name] as string) ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className={`w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white ${
                    errors[f.name]
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                />
              )}

              {errors[f.name] ? (
                <p className="text-xs text-red-600 mt-1">{f.label} is required.</p>
              ) : f.hint ? (
                <p className="text-xs text-slate-500 mt-1">{f.hint}</p>
              ) : null}
            </div>
          ))}
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

      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50"
        >
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {saving ? "Saving…" : isNew ? "Create" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
