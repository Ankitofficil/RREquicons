import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSession,
  isConfigured,
  verifyPassword,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

// Crude in-memory rate limit. It resets on redeploy and is per-instance, but
// it is enough to blunt password guessing against a single shared secret.
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  const key = clientKey(request);
  const now = Date.now();
  const rec = attempts.get(key);
  if (rec && rec.until > now && rec.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!password || !verifyPassword(password)) {
    const next = rec && rec.until > now ? rec : { count: 0, until: now + WINDOW_MS };
    next.count += 1;
    attempts.set(key, next);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  attempts.delete(key);

  const session = createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });
  return res;
}
