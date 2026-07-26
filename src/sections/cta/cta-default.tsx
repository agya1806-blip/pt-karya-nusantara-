"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

const ctaButtonClasses = {
  default: {
    primary: "bg-gold-500 text-white hover:bg-gold-600",
    secondary: "border border-gold-500/30 text-gold-700 hover:bg-gold-50",
  },
  brand: {
    primary: "bg-white text-neutral-900 hover:bg-neutral-100",
    secondary: "border border-white/20 text-white hover:bg-white/10",
  },
  dark: {
    primary: "bg-white text-neutral-900 hover:bg-neutral-100",
    secondary: "border border-white/20 text-white hover:bg-white/10",
  },
  split: {
    primary: "bg-gold-500 text-white hover:bg-gold-600",
    secondary: "border border-gold-500/30 text-gold-700 hover:bg-gold-50",
  },
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
  const sectionClasses = variantClasses[variant];
  const titleClass = titleClasses[variant];
  const descClass = descClasses[variant];

  if (variant === "split") {
    return (
      <section className={cn("py-24 lg:py-28", sectionClasses, className)}>
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Fade direction="left">
              <div>
                <h2 className={cn("font-serif text-display font-light tracking-tight", titleClass)}>
                  {title}
                </h2>
                {description && (
                  <p className={cn("mt-6 text-body-lg leading-relaxed", descClass)}>
                    {description}
                  </p>
                )}
                <div className="mt-10 flex flex-wrap gap-4">
                  {primaryCta && (
                    <Button asChild size="lg">
                      <Link href={primaryCta.href}>
                        {primaryCta.label} <ArrowRight size={16} />
                      </Link>
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={secondaryCta.href}>
                        {secondaryCta.label}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Fade>
            <Fade direction="right">
              {image ? (
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-sm bg-surface-secondary" />
              )}
            </Fade>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-24 lg:py-28", sectionClasses, className)}>
      <div className="container-site">
        <Fade
          direction="up"
          className={cn(
            "mx-auto max-w-3xl",
            align === "left" ? "text-left" : "text-center",
          )}
        >
          <h2 className={cn("font-serif text-display font-light tracking-tight", titleClass)}>
            {title}
          </h2>
          {description && (
            <p className={cn("mt-6 text-body-lg leading-relaxed", descClass)}>
              {description}
            </p>
          )}
          <div
            className={cn(
              "mt-10 flex flex-wrap gap-4",
              align === "center" && "justify-center",
            )}
          >
            {primaryCta && (
              <Link href={primaryCta.href} className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 text-caption font-medium uppercase tracking-widest transition-all duration-300 ease-architectural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                ctaButtonClasses[variant].primary,
              )}>
                {primaryCta.label} <ArrowRight size={14} />
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 text-caption font-medium uppercase tracking-widest transition-all duration-300 ease-architectural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                ctaButtonClasses[variant].secondary,
              )}>
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}
