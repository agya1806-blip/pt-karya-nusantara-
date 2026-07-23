"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroDefaultProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
  className?: string;
}

export function HeroDefault({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  className,
}: HeroDefaultProps) {
  return (
    <section className={cn("relative min-h-screen flex items-center bg-surface", className)}>
      {image && (
        <div className="absolute inset-0">
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
      )}
      <div className="container-site relative z-10 py-32">
        <Fade direction="up" className="max-w-3xl">
          {subtitle && (
            <p className="text-caption font-semibold tracking-widest text-brand-500 uppercase mb-4">
              {subtitle}
            </p>
          )}
          <h1 className={cn("text-display font-light tracking-tight", image ? "text-white" : "text-text-primary")}>
            {title}
          </h1>
          {description && (
            <p className={cn("mt-4 text-body-lg max-w-xl leading-relaxed", image ? "text-white/80" : "text-text-secondary")}>
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg bg-text-primary px-8 py-3.5 text-body-sm font-medium text-text-inverse transition-all duration-300 hover:opacity-90"
              >
                {primaryCta.label} <ArrowRight size={16} />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-8 py-3.5 text-body-sm font-medium transition-all duration-300",
                  image
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-border-light text-text-primary hover:bg-surface",
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
