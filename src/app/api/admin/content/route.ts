import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { commitFile, isGitHubConfigured } from "@/lib/admin/github";
import { CONTENT_FILES, type ContentType } from "@/lib/content";

export const runtime = "nodejs";

interface Item {
  id?: string;
  [key: string]: unknown;
}

function isValidType(t: string): t is ContentType {
  return t in CONTENT_FILES;
}

async function readCurrent(type: ContentType): Promise<Item[]> {
  const file = path.join(process.cwd(), CONTENT_FILES[type]);
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return [];
  }
}

/**
 * Persist the list: write locally so `next dev` reflects it immediately, then
 * commit to GitHub so it survives the next deploy. Both are best-effort in
 * that order — a local write failure on a read-only host is not fatal.
 */
async function persist(type: ContentType, items: Item[], message: string) {
  const json = JSON.stringify(items, null, 2) + "\n";
  const rel = CONTENT_FILES[type];

  let localOk = false;
  try {
    await fs.writeFile(path.join(process.cwd(), rel), json, "utf8");
    localOk = true;
  } catch {
    // Read-only filesystem in production — GitHub is the real store.
  }

  if (isGitHubConfigured()) {
    await commitFile(rel, json, message);
    return { committed: true, localOk };
  }
  if (!localOk) {
    throw new Error(
      "Nothing could be saved: the filesystem is read-only and GitHub is not configured.",
    );
  }
  return { committed: false, localOk };
}

export async function POST(request: Request) {
  let body: { type?: string; item?: Item };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { type, item } = body;
  if (!type || !isValidType(type) || !item) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }

  const items = await readCurrent(type);
  const isNew = !item.id;
  const id = item.id ?? `${type[0]}${Date.now().toString(36)}`;

  const idx = items.findIndex((i) => i.id === id);

  // Merge onto the stored record rather than replacing it. A browser tab
  // holds its own copy of the list, so a form opened before some other
  // change — or a duplicate taken from a stale row — would otherwise write
  // old values back over newer ones.
  //
  // `undefined` fields are dropped outright. `image` additionally ignores an
  // empty incoming value when one is already stored: a photo is removed via
  // the uploader's explicit Remove (which sends `imageCleared`), so a bare
  // null here is always a stale client, never an intent to delete.
  const incoming = Object.fromEntries(
    Object.entries(item).filter(([k, v]) => {
      if (v === undefined) return false;
      if (k === "image" && v == null && idx >= 0 && items[idx].image && !item.imageCleared) {
        return false;
      }
      return k !== "imageCleared";
    }),
  );
  const record: Item =
    idx >= 0 ? { ...items[idx], ...incoming, id } : { ...incoming, id };

  if (idx >= 0) items[idx] = record;
  else items.unshift(record); // newest first

  const label =
    (record.name as string) ?? (record.project as string) ?? (record.title as string) ?? id;

  try {
    const result = await persist(
      type,
      items,
      `${isNew ? "Add" : "Update"} ${type.replace("-", " ")}: ${label}`,
    );
    return NextResponse.json({ ok: true, id, item: record, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

/**
 * Reorder a list. The public pages render these arrays in order, so this is
 * how an admin controls what appears first.
 */
export async function PATCH(request: Request) {
  let body: { type?: string; ids?: string[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { type, ids } = body;
  if (!type || !isValidType(type) || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Missing type or order." }, { status: 400 });
  }

  const items = await readCurrent(type);
  const byId = new Map(items.map((i) => [i.id, i]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as Item[];

  // Anything not named in `ids` keeps its place at the end, so a stale client
  // cannot silently drop records.
  for (const item of items) {
    if (!ids.includes(item.id as string)) ordered.push(item);
  }

  try {
    const result = await persist(type, ordered, `Reorder ${type.replace("-", " ")}`);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !isValidType(type) || !id) {
    return NextResponse.json({ error: "Missing type or id." }, { status: 400 });
  }

  const items = await readCurrent(type);
  const target = items.find((i) => i.id === id);
  if (!target) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  const label =
    (target.name as string) ?? (target.project as string) ?? (target.title as string) ?? id;

  try {
    const result = await persist(
      type,
      items.filter((i) => i.id !== id),
      `Delete ${type.replace("-", " ")}: ${label}`,
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
