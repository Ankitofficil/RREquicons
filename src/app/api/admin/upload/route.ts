import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { commitFile, isGitHubConfigured } from "@/lib/admin/github";
import {
  ACCEPTED_TYPES,
  IMAGE_SPECS,
  MAX_UPLOAD_BYTES,
  type ImageKind,
} from "@/lib/admin/images";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  const kind = String(form.get("kind") ?? "project") as ImageKind;
  // Optional crop rectangle from the client-side cropper, in source pixels.
  const cropRaw = form.get("crop");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return NextResponse.json(
      { error: "Use a JPEG, PNG, WebP or AVIF image." },
      { status: 415 },
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `Image is too large (max ${MAX_UPLOAD_BYTES / 1024 / 1024} MB).` },
      { status: 413 },
    );
  }

  const spec = IMAGE_SPECS[kind] ?? IMAGE_SPECS.project;
  const input = Buffer.from(await file.arrayBuffer());

  let pipeline = sharp(input).rotate(); // honour EXIF orientation

  // Apply the admin's chosen crop first, when one was sent.
  if (typeof cropRaw === "string" && cropRaw) {
    try {
      const c = JSON.parse(cropRaw) as {
        x: number; y: number; width: number; height: number;
      };
      const meta = await sharp(input).rotate().metadata();
      const maxW = meta.width ?? 0;
      const maxH = meta.height ?? 0;
      const left = Math.max(0, Math.round(c.x));
      const top = Math.max(0, Math.round(c.y));
      const width = Math.min(Math.round(c.width), maxW - left);
      const height = Math.min(Math.round(c.height), maxH - top);
      if (width > 0 && height > 0) {
        pipeline = pipeline.extract({ left, top, width, height });
      }
    } catch {
      // A malformed crop falls through to the automatic centre crop below.
    }
  }

  // Normalise to the spec's exact dimensions. `cover` fills the frame and
  // centre-crops the overflow, so every stored image matches its ratio.
  const output = await pipeline
    .resize(spec.width, spec.height, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toBuffer();

  const name = `${kind}-${Date.now().toString(36)}.webp`;
  const rel = `public/uploads/${name}`;
  const publicPath = `/uploads/${name}`;

  let localOk = false;
  try {
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), output);
    localOk = true;
  } catch {
    // Read-only in production; the commit below is what persists it.
  }

  try {
    if (isGitHubConfigured()) {
      await commitFile(rel, output, `Upload ${spec.label.toLowerCase()}: ${name}`);
    } else if (!localOk) {
      throw new Error("No writable storage and GitHub is not configured.");
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    path: publicPath,
    width: spec.width,
    height: spec.height,
    bytes: output.length,
  });
}
