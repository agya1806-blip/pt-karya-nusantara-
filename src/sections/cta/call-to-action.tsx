"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "brand" | "dark";
  className?: string;
}

const variantClasses = {
  default: "bg-surface-secondary",
  brand: "bg-brand-500",
  dark: "bg-neutral-950",
};

const titleClasses = {
  default: "text-text-primary",
  brand: "text-white",
  dark: "text-white",
};

const descClasses = {
  default: "text-text-secondary",
  brand: "text-neutral-200",
  dark: "text-neutral-400",
};

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "brand",
  className,
}: CallToActionProps) {
  return (
    <section className={cn("py-24", variantClasses[variant], className)}>
      <div className="container-site">
        <Fade direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className={cn("text-display font-light tracking-tight", titleClasses[variant])}>
            {title}
          </h2>
          {description && (
            <p className={cn("mt-4 text-body-lg leading-relaxed", descClasses[variant])}>
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-body-sm font-medium transition-all duration-300",
                  variant === "default"
                    ? "bg-text-primary text-text-inverse hover:opacity-90"
                    : "bg-white text-neutral-900 hover:bg-neutral-100",
                )}
              >
                {primaryCta.label}
                <ArrowRight size={16} />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-8 py-3.5 text-body-sm font-medium transition-all duration-300",
                  variant === "default"
                    ? "border-border-light text-text-primary hover:bg-surface"
                    : "border-white/20 text-white hover:bg-white/10",
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}
