import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";

// Gate every /admin route and admin API behind a valid session. Proxy runs
// before rendering, so an unauthenticated request never reaches the page —
// this is the real lock, not just a hidden UI.
//
// Proxy uses the Node.js runtime in Next 16, so the HMAC verification in
// lib/admin/auth (node:crypto) works here.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page and the login/logout endpoints must stay reachable.
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  if (verifySession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  // API calls get a JSON 401 ; page requests get sent to the login screen.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const login = new URL("/admin/login", request.url);
  // Remember where they were headed so login can return them there.
  if (pathname !== "/admin") login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
