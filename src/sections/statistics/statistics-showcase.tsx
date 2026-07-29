"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";
import type { StatItem } from "@/sections/types";

interface StatisticsShowcaseProps {
  label?: string;
  title: string;
  description?: string;
  stats: StatItem[];
  variant?: "grid" | "row" | "cards";
  columns?: 3 | 4;
  className?: string;
}

const gridCols = {
  3: "sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function StatisticsShowcase({
  label,
  title,
  description,
  stats,
  variant = "grid",
  columns = 4,
  className,
}: StatisticsShowcaseProps) {
  if (variant === "row") {
    return (
      <section className={cn("bg-surface-secondary py-24 lg:py-28", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <Fade direction="up" className="mt-16">
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-24">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-display font-light text-text-primary tabular-nums">
                    {stat.prefix}
                    <AnimatedCounter value={Number(stat.value)} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className={cn("bg-surface-secondary py-24 lg:py-28", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <Stagger className={cn("mt-20 grid gap-6", gridCols[columns])}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-gold-500/5 bg-surface p-8 text-center shadow-elevation-1 transition-all duration-500 ease-luxury hover:shadow-elevation-3">
                  <p className="font-serif text-display font-light text-text-primary tabular-nums">
                    {stat.prefix}
                    <AnimatedCounter value={Number(stat.value)} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-surface-secondary py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-20 grid gap-8 text-center", gridCols[columns])}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="font-serif text-display font-light text-text-primary tabular-nums">
                {stat.prefix}
                <AnimatedCounter value={Number(stat.value)} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
