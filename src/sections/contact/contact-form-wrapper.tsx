"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface ContactFormWrapperProps {
  label?: string;
  title: string;
  description?: string;
  fields?: FormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  className?: string;
}

const defaultFields: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+62 xxx", required: false },
  {
    name: "inquiry_type",
    label: "Inquiry Type",
    type: "select",
    required: true,
    options: [
      { label: "Select inquiry type", value: "" },
      { label: "New Project", value: "new_project" },
      { label: "Consultation", value: "consultation" },
      { label: "Partnership", value: "partnership" },
      { label: "General Inquiry", value: "general" },
    ],
  },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your project...", required: true },
];

export function ContactFormWrapper({
  label,
  title,
  description,
  fields = defaultFields,
  submitLabel = "Send Message",
  onSubmit,
  className,
}: ContactFormWrapperProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await onSubmit?.(formData);
      setStatus("success");
      setFormData({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            label={label}
            title={title}
            description={description}
            align="center"
          />
          <Fade direction="up">
            <form onSubmit={handleSubmit} className="mt-12 space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="mb-1.5 block text-body-sm font-medium text-text-primary"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500" aria-hidden="true">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`field-${field.name}`}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      disabled={status === "loading"}
                      rows={5}
                      className="w-full resize-y rounded-lg border border-border-light bg-surface-secondary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary transition-colors duration-300 focus:border-text-primary focus:outline-none disabled:opacity-50"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={`field-${field.name}`}
                      name={field.name}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border-light bg-surface-secondary px-4 py-3 text-body text-text-primary transition-colors duration-300 focus:border-text-primary focus:outline-none disabled:opacity-50"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`field-${field.name}`}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border-light bg-surface-secondary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary transition-colors duration-300 focus:border-text-primary focus:outline-none disabled:opacity-50"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-text-primary px-8 py-3.5 text-body-sm font-medium text-text-inverse transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : submitLabel}
                <Send size={16} />
              </button>
              {status === "success" && (
                <div className="flex items-center gap-2 rounded-lg bg-brand-500/10 p-4 text-body-sm text-brand-600">
                  <CheckCircle size={16} />
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-body-sm text-red-500">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </Fade>
        </div>
      </div>
    </section>
  );
}
