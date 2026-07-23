"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { ImageReveal } from "@/components/animation/ImageReveal";
import type { MediaItem } from "@/sections/types";

interface CompanyOverviewProps {
  label?: string;
  title: string;
  description: string[];
  image: MediaItem;
  stats?: { value: string; label: string }[];
  className?: string;
}

export function CompanyOverview({
  label,
  title,
  description,
  image,
  stats,
  className,
}: CompanyOverviewProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeader
              label={label}
              title={title}
              align="left"
            />
            <div className="mt-6 space-y-4">
              {description.map((paragraph, i) => (
                <Fade key={i} direction="up" delay={0.2 + i * 0.1}>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                </Fade>
              ))}
            </div>
            {stats && (
              <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <Fade key={stat.label} direction="up" delay={0.3}>
                    <div>
                      <p className="text-display font-light tracking-tight text-text-primary">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-body-sm text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  </Fade>
                ))}
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <ImageReveal
              src={image.src}
              alt={image.alt}
              className="aspect-[4/5] w-full"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
