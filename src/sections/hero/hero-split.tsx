"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { Button } from "@/components/ui/Button";
import type { ButtonAction, MediaItem } from "@/sections/types";

interface HeroSplitProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: MediaItem;
  actions?: ButtonAction[];
  reverse?: boolean;
  className?: string;
}

export function HeroSplit({
  title,
  subtitle,
  description,
  image,
  actions,
  reverse = false,
  className,
}: HeroSplitProps) {
  return (
    <section className={cn("relative overflow-hidden bg-surface", className)}>
      <div
        className={cn(
          "grid min-h-[80vh] lg:grid-cols-2",
          reverse && "lg:direction-rtl",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center px-6 py-24 lg:px-16",
            reverse ? "lg:order-2" : "lg:order-1",
          )}
        >
          {subtitle && (
            <Fade direction="up" delay={0.1}>
              <span className="mb-3 block text-caption font-semibold tracking-widest text-text-secondary uppercase">
                {subtitle}
              </span>
            </Fade>
          )}
          <Fade direction="up" delay={0.2}>
            <h1 className="text-display-xl font-light tracking-tight text-text-primary">
              {title}
            </h1>
          </Fade>
          {description && (
            <Fade direction="up" delay={0.3}>
              <p className="mt-6 max-w-xl text-body-lg text-text-secondary leading-relaxed">
                {description}
              </p>
            </Fade>
          )}
          {actions && actions.length > 0 && (
            <Fade direction="up" delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4">
                {actions.map((action) => (
                  <Button key={action.label} variant={action.variant ?? "primary"}>
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            </Fade>
          )}
        </div>
        <div
          className={cn(
            "relative h-[50vh] lg:h-auto",
            reverse ? "lg:order-1" : "lg:order-2",
          )}
        >
          <ImageReveal
            src={image.src}
            alt={image.alt}
            fill
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
