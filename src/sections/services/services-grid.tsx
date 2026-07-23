"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ServiceItem } from "@/sections/types";

interface ServicesGridProps {
  label?: string;
  title: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function ServicesGrid({
  label,
  title,
  description,
  services,
  columns = 3,
  className,
}: ServicesGridProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-16 grid gap-6", gridCols[columns])}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={service.href ?? "#"}
                className="group flex h-full flex-col rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:border-brand-200 hover:shadow-elevation-3"
              >
                {service.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-100">
                    {service.icon}
                  </div>
                )}
                <h3 className="text-heading-sm font-medium text-text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-body-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                {service.features && (
                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="text-body-sm text-text-secondary"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-6 inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
