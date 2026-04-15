"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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
}

export default function ContactForm({ fields, submitLabel = "Send Message", compact = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm bg-white placeholder:text-text-muted/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
      <button
        type="submit"
        className={`btn-primary flex items-center gap-2.5 text-sm ${submitted ? "!bg-success !shadow-success/30" : ""}`}
      >
        {submitted ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Sent Successfully!
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
