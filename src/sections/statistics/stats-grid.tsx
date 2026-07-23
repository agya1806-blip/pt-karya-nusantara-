"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { useInView, motion } from "framer-motion";
import type { StatItem } from "@/sections/types";

interface StatsGridProps {
  label?: string;
  title: string;
  description?: string;
  stats: StatItem[];
  columns?: number;
  className?: string;
}

function AnimatedValue({ value, prefix, suffix }: { value: string; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const num = parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(num);

  return (
    <span ref={ref} className="text-display font-light text-text tabular-nums">
      {prefix}
      {isNumeric && isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
      ) : (
        value
      )}
      {suffix}
    </span>
  );
}

export function StatsGrid({
  label,
  title,
  description,
  stats,
  columns = 4,
  className,
}: StatsGridProps) {
  const cols = Math.min(Math.max(columns, 2), 4);
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  } as const;

  return (
    <section className={cn("bg-surface-muted py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger
          className={cn(
            "mt-16 grid gap-8 text-center",
            gridCols[cols as keyof typeof gridCols] ?? gridCols[4],
          )}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="text-display font-light text-text tabular-nums">
                <AnimatedValue value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-body-sm font-medium text-text-secondary tracking-widest uppercase">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
