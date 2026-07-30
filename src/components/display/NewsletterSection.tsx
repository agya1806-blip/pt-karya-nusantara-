"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

export function NewsletterSection({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest updates.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onSubmit,
  className,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      await onSubmit?.(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container-site">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-heading-xl font-light leading-tight tracking-tight text-text">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-body-lg leading-relaxed text-text-secondary">
              {description}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-border-light bg-surface px-5 py-3.5 text-body text-text placeholder:text-text-tertiary transition-all duration-300 ease-architectural focus:border-text-primary focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-text-primary px-6 py-3.5 text-body-sm font-medium text-text-inverse transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              >
                {buttonLabel}
                <Send size={16} />
              </button>
            </div>

            {status === "success" && (
              <p className="mt-4 text-body-sm text-text-secondary">
                Thank you for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-body-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
