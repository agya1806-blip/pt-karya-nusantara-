"use client";

import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";

interface CompanyValueItem {
  title: string;
  description: string;
  icon?: string;
}

interface CompanyValuesProps {
  values: CompanyValueItem[];
  className?: string;
}

export function CompanyValues({ values, className }: CompanyValuesProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="rounded-xl border border-border-light bg-surface p-6 transition-all duration-300 hover:shadow-elevation-1">
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
