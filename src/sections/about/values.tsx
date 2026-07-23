"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { ValueItem } from "@/sections/types";

interface ValuesProps {
  label?: string;
  title: string;
  description?: string;
  values: ValueItem[];
  className?: string;
}

export function Values({
  label,
  title,
  description,
  values,
  className,
}: ValuesProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="group rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:border-brand-200 hover:shadow-elevation-2">
                {value.icon && (
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-100">
                    {value.icon}
                  </div>
                )}
                <h3 className="text-heading-sm font-medium text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
