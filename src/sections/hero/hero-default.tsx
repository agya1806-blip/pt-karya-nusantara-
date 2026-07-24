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
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 to-brand-800/30" />
        </div>
      )}
      <div className="container-site relative z-10 py-32">
        <Fade direction="up" className="max-w-4xl">
          {subtitle && (
            <p className="text-caption tracking-widest text-brand-400 uppercase mb-6">
              {subtitle}
            </p>
          )}
          <h1 className={cn("text-display-lg font-light leading-tight tracking-tight", image ? "text-white" : "text-text-primary")}>
            {title}
          </h1>
          {description && (
            <p className={cn("mt-6 text-body-lg max-w-2xl leading-relaxed", image ? "text-white/80" : "text-text-secondary")}>
              {description}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-5">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-body-sm font-medium text-white transition-all duration-300 hover:bg-gold-600"
              >
                {primaryCta.label} <ArrowRight size={16} />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-body-sm font-medium tracking-tight transition-all duration-300",
                  image
                    ? "border-gold-500/40 text-gold-300 hover:bg-gold-500/10"
                    : "border-gold-500/30 text-gold-700 hover:bg-gold-50",
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
