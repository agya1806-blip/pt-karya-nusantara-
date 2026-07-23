"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { Send } from "lucide-react";

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  variant?: "default" | "brand" | "dark";
  className?: string;
}

const variantClasses = {
  default: "bg-surface-secondary",
  brand: "bg-brand-500",
  dark: "bg-neutral-950",
};

const headingClasses = {
  default: "text-text-primary",
  brand: "text-white",
  dark: "text-white",
};

const descriptionClasses = {
  default: "text-text-secondary",
  brand: "text-neutral-200",
  dark: "text-neutral-400",
};

export function NewsletterCTA({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest architectural insights and project updates.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onSubmit,
  variant = "brand",
  className,
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    <section className={cn("py-24", variantClasses[variant], className)}>
      <div className="container-site">
        <Fade direction="up" className="mx-auto max-w-2xl text-center">
          <h2 className={cn("text-display font-light tracking-tight", headingClasses[variant])}>
            {title}
          </h2>
          {description && (
            <p className={cn("mt-4 text-body-lg leading-relaxed", descriptionClasses[variant])}>
              {description}
            </p>
          )}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mx-auto flex max-w-md items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  disabled={status === "loading"}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-body transition-colors duration-300 focus:outline-none disabled:opacity-50",
                    variant === "default"
                      ? "border-border-light bg-surface text-text-primary placeholder:text-text-tertiary focus:border-text-primary"
                      : "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white",
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-body-sm font-medium transition-all duration-300 disabled:opacity-50",
                  variant === "default"
                    ? "bg-text-primary text-text-inverse hover:opacity-90"
                    : "bg-white text-neutral-900 hover:bg-neutral-100",
                )}
              >
                {buttonLabel}
                <Send size={16} />
              </button>
            </div>
            {status === "success" && (
              <p className={cn("mt-3 text-body-sm", variant === "default" ? "text-text-secondary" : "text-neutral-300")}>
                Thank you for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-body-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </Fade>
      </div>
    </section>
  );
}
