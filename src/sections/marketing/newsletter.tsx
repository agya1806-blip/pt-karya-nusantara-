"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Button } from "@/components/ui/Button";
import { Mail, Check } from "lucide-react";

interface NewsletterProps {
  label?: string;
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function Newsletter({
  label,
  title,
  description,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className={cn("bg-surface-dark py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Fade direction="up" className="mx-auto mt-10 max-w-md">
          {submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-xl bg-surface-muted/20 px-6 py-4 text-text-inverse">
              <Check size={20} />
              <span className="text-body font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full rounded-lg border border-border-muted bg-surface-muted/10 px-10 py-3 text-body-sm text-text-inverse placeholder:text-text-muted focus:border-text-inverse focus:outline-none focus:ring-1 focus:ring-text-inverse transition-all duration-300 ease-luxury"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-shrink-0"
              >
                {buttonText}
              </Button>
            </form>
          )}
        </Fade>
      </div>
    </section>
  );
}
