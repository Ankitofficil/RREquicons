"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2, Crop } from "lucide-react";
import { IMAGE_SPECS, type ImageKind } from "@/lib/admin/images";

/**
 * Upload + crop control. The crop box is locked to the target aspect ratio,
 * so whatever the admin picks, the stored image matches the spec exactly and
 * cards never end up with mismatched heights.
 */
export function ImageUploader({
  kind,
  value,
  onChange,
}: {
  kind: ImageKind;
  value?: string | null;
  onChange: (path: string | null) => void;
}) {
  const spec = IMAGE_SPECS[kind];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState<{ file: File; url: string } | null>(null);
  const [offset, setOffset] = useState(0.5); // 0..1 position of the crop window
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = useCallback((file: File) => {
    setError("");
    setOffset(0.5);
    setSource({ file, url: URL.createObjectURL(file) });
  }, []);

  async function upload() {
    if (!source) return;
    setBusy(true);
    setError("");

    const img = imgRef.current;
    const body = new FormData();
    body.set("file", source.file);
    body.set("kind", kind);

    // Work out the crop rectangle in natural pixels: take the largest region
    // of the target ratio, then slide it by the chosen offset.
    if (img?.naturalWidth) {
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const srcRatio = nw / nh;
      let cw = nw;
      let ch = nh;
      let x = 0;
      let y = 0;
      if (srcRatio > spec.ratio) {
        cw = Math.round(nh * spec.ratio);
        x = Math.round((nw - cw) * offset);
      } else {
        ch = Math.round(nw / spec.ratio);
        y = Math.round((nh - ch) * offset);
      }
      body.set("crop", JSON.stringify({ x, y, width: cw, height: ch }));
    }

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { path?: string; error?: string };
      if (!res.ok || !data.path) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      onChange(data.path);
      URL.revokeObjectURL(source.url);
      setSource(null);
    } catch {
      setError("Upload failed — check your connection.");
    } finally {
      setBusy(false);
    }
  }

  // Already has a stored image.
  if (value && !source) {
    return (
      <div className="space-y-2">
        <div
          className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700"
          style={{ aspectRatio: String(spec.ratio) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {spec.ratioLabel} · {spec.width}×{spec.height}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-red-600 hover:text-red-700 inline-flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
        />
      </div>
    );
  }

  // Cropping a freshly chosen file.
  if (source) {
    return (
      <div className="space-y-3">
        <div
          className="relative overflow-hidden rounded-lg bg-slate-900 ring-1 ring-slate-300 dark:ring-slate-700"
          style={{ aspectRatio: String(spec.ratio) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={source.url}
            alt="Crop preview"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: `${offset * 100}% ${offset * 100}%` }}
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/30" />
        </div>

        <label className="block">
          <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-1">
            <Crop className="h-3 w-3" />
            Reposition ({spec.ratioLabel} crop)
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="w-full accent-slate-900 dark:accent-white"
          />
        </label>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={upload}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-3 py-1.5 text-sm font-medium text-white dark:text-slate-900 disabled:opacity-50"
          >
            {busy && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
            {busy ? "Uploading…" : "Use this image"}
          </button>
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(source.url);
              setSource(null);
            }}
            disabled={busy}
            className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Empty state.
  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition p-6 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400"
        style={{ aspectRatio: String(spec.ratio) }}
      >
        <ImagePlus className="h-6 w-6" />
        <span className="text-sm font-medium">Add {spec.label.toLowerCase()}</span>
        <span className="text-xs">
          {spec.ratioLabel} · resized to {spec.width}×{spec.height}
        </span>
      </button>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
      />
    </div>
  );
}
