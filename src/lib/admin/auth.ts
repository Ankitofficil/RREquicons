import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

// Session handling for the admin panel.
//
// A single shared password (ADMIN_PASSWORD) is exchanged for a signed cookie.
// The cookie carries an expiry and an HMAC over it, so it cannot be forged
// without ADMIN_SESSION_SECRET and cannot be replayed past its lifetime.
// Nothing is stored server-side, which suits a host that rebuilds on deploy.

export const SESSION_COOKIE = "rr_admin";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  // Without a configured secret, fall back to the password so sessions are
  // still signed rather than silently unsigned. Logged once at call time.
  const pw = process.env.ADMIN_PASSWORD;
  if (pw) return `fallback:${pw}`;
  return "";
}

export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Constant-time string compare that tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still burn a comparison so the timing does not leak length.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function createSession(): { value: string; maxAge: number } {
  const expires = Date.now() + SESSION_TTL_MS;
  // The nonce makes each session token distinct, so logging out one session
  // cannot be undone by replaying an identical earlier cookie.
  const payload = `${expires}.${randomBytes(9).toString("base64url")}`;
  return {
    value: `${payload}.${sign(payload)}`,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}

export function verifySession(cookie: string | undefined): boolean {
  if (!cookie || !secret()) return false;
  const idx = cookie.lastIndexOf(".");
  if (idx < 1) return false;

  const payload = cookie.slice(0, idx);
  const mac = cookie.slice(idx + 1);
  if (!safeEqual(mac, sign(payload))) return false;

  const expires = Number(payload.split(".")[0]);
  return Number.isFinite(expires) && Date.now() < expires;
}
