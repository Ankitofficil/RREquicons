"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, LoaderCircle, TriangleAlert } from "lucide-react";

function LoginForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        setPassword("");
        return;
      }
      // Full navigation so the proxy re-evaluates with the new cookie.
      window.location.href = params.get("next") ?? "/admin";
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 p-8">
          <div className="flex flex-col items-center text-center mb-7">
            <div className="h-12 w-12 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-white dark:text-slate-900" />
            </div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              R R Equicons Admin
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Enter the admin password to continue
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
              >
                <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className="w-full rounded-lg bg-slate-900 dark:bg-white px-4 py-2.5 font-medium text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
          Authorised access only
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  // useSearchParams needs a Suspense boundary during prerendering.
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
