"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
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
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-20 grid gap-8", gridCols[columns])}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={service.href ?? "#"}
                className="group flex h-full flex-col overflow-hidden border border-border-light/60 bg-surface transition-all duration-500 hover:border-brand-200/80 hover:shadow-luxury-lg"
              >
                {service.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <ImageReveal
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8 lg:p-10">
                  {service.icon && (
                    <div className="mb-5 flex h-12 w-12 items-center justify-center bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-100 group-hover:text-brand-700">
                      {service.icon}
                    </div>
                  )}
                  <h3 className="font-serif text-heading-sm font-medium text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-sm text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  {service.features && (
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feat) => (
                        <li
                          key={feat}
                          className="text-body-sm text-text-secondary"
                        >
                          — {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-caption font-medium tracking-widest uppercase text-brand-600 transition-all duration-300 group-hover:gap-3">
                    Selengkapnya <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
