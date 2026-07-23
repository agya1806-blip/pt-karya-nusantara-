"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CTADefaultProps {
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "center" | "left";
  variant?: "default" | "brand" | "dark" | "split";
  image?: string;
  className?: string;
}

const variantClasses = {
  default: "bg-surface-secondary",
  brand: "bg-brand-500",
  dark: "bg-neutral-950",
  split: "bg-surface",
};

const titleClasses = {
  default: "text-text-primary",
  brand: "text-white",
  dark: "text-white",
  split: "text-text-primary",
};

const descClasses = {
  default: "text-text-secondary",
  brand: "text-neutral-200",
  dark: "text-neutral-400",
  split: "text-text-secondary",
};

export function CTADefault({
  title,
  description,
  primaryCta,
  secondaryCta,
  align = "center",
  variant = "default",
  image,
  className,
}: CTADefaultProps) {
  if (variant === "split") {
    return (
      <section className={cn("py-24", variantClasses[variant], className)}>
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Fade direction="left">
              <div>
                <h2
                  className={cn(
                    "text-display font-light tracking-tight",
                    titleClasses[variant],
                  )}
                >
                  {title}
                </h2>
                {description && (
                  <p
                    className={cn(
                      "mt-4 text-body-lg leading-relaxed",
                      descClasses[variant],
                    )}
                  >
                    {description}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-4">
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex items-center gap-2 rounded-lg bg-text-primary px-8 py-3.5 text-body-sm font-medium text-text-inverse transition-all duration-300 hover:opacity-90"
                    >
                      {primaryCta.label}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-border-light px-8 py-3.5 text-body-sm font-medium text-text-primary transition-all duration-300 hover:bg-surface"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              </div>
            </Fade>
            <Fade direction="right">
              {image ? (
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-surface-secondary" />
              )}
            </Fade>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-24", variantClasses[variant], className)}>
      <div className="container-site">
        <Fade
          direction="up"
          className={cn(
            "mx-auto max-w-3xl",
            align === "left" ? "text-left" : "text-center",
          )}
        >
          <h2
            className={cn(
              "text-display font-light tracking-tight",
              titleClasses[variant],
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-body-lg leading-relaxed",
                descClasses[variant],
              )}
            >
              {description}
            </p>
          )}
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-4",
              align === "center" && "justify-center",
            )}
          >
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
