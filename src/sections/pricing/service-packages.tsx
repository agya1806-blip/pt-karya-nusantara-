"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Check } from "lucide-react";

interface ServicePackage {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
}

interface ServicePackagesProps {
  title: string;
  description?: string;
  packages: ServicePackage[];
  className?: string;
}

export function ServicePackages({
  title,
  description,
  packages,
  className,
}: ServicePackagesProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.title}>
              <div className="flex h-full flex-col rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:shadow-elevation-2">
                <div>
                  <h3 className="text-heading-sm font-medium text-text-primary">{pkg.title}</h3>
                  <p className="mt-1 text-body-sm text-text-secondary">{pkg.description}</p>
                </div>
                <div className="mt-4">
                  <span className="text-heading font-light text-text-primary tabular-nums">{pkg.price}</span>
                  {pkg.period && (
                    <span className="ml-1 text-body-sm text-text-secondary">/{pkg.period}</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-brand-500" />
                      <span className="text-body-sm text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
