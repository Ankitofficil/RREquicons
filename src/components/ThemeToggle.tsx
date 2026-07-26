"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Light/dark theme toggle. Theme state lives on <html>.classList (set pre-hydration
 * by the inline script in layout.tsx) and in localStorage — no global provider needed.
 *
 * `useSyncExternalStore` reads the live DOM class as the external store: the server
 * snapshot is always `false` (light) so SSR + first client render match (no hydration
 * mismatch), then it re-syncs to the real class on the client.
 */

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getClientSnapshot = () =>
  document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
    // MutationObserver in subscribe() picks up the class change and re-renders.
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ${className}`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
