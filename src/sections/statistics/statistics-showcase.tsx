"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
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
      <section className={cn("bg-surface-secondary py-24", className)}>
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
                  <p className="text-display font-light text-text-primary tabular-nums">
                    {stat.prefix}
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-body-sm text-text-secondary">
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
      <section className={cn("bg-surface-secondary py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <Stagger className={cn("mt-16 grid gap-6", gridCols[columns])}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-border-light bg-surface p-8 text-center transition-all duration-300 hover:shadow-elevation-1">
                  <p className="text-display font-light text-text-primary tabular-nums">
                    {stat.prefix}
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-body-sm text-text-secondary">
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
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-16 grid gap-8 text-center", gridCols[columns])}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="text-display font-light text-text-primary tabular-nums">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-body-sm text-text-secondary">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
