"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface ContactFormProps {
  fields: Field[];
  submitLabel?: string;
  compact?: boolean;
  /** Identifies which form/page the submission came from (e.g. "Contact", "Careers"). */
  source?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({
  fields,
  submitLabel = "Send Message",
  compact = false,
  source,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (source) payload.source = source;

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm bg-white placeholder:text-text-muted/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-5`}>
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label className="block text-sm font-semibold text-text mb-2">
              {field.label}
              {field.required && <span className="text-accent ml-0.5">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                rows={4}
                placeholder={field.placeholder}
                className={`${inputClasses} resize-none`}
              />
            ) : field.type === "select" ? (
              <select name={field.name} required={field.required} className={inputClasses}>
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className={inputClasses}
              />
            )}
          </div>
        ))}
      </div>

      {/* Honeypot — hidden from users, bots tend to fill it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && error && (
        <p className="flex items-center gap-2 text-sm text-red-600" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn-primary flex items-center gap-2.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed ${
          status === "success" ? "!bg-success !shadow-success/30" : ""
        }`}
      >
        {status === "success" ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Sent Successfully!
          </>
        ) : status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}
