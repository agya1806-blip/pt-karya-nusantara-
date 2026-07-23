"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { PartnerItem } from "@/sections/types";

interface PartnersGridProps {
  label?: string;
  title: string;
  description?: string;
  partners: PartnerItem[];
  className?: string;
}

export function PartnersGrid({
  label,
  title,
  description,
  partners,
  className,
}: PartnersGridProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <a
                href={partner.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-32 items-center justify-center rounded-2xl border border-border bg-surface-muted p-8 transition-all duration-300 ease-luxury hover:border-border-muted hover:shadow-lg hover:-translate-y-1"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo.src}
                    alt={partner.logo.alt || partner.name}
                    className="max-h-14 w-auto object-contain opacity-60 grayscale transition-all duration-300 ease-luxury group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-body font-medium text-text-muted">
                    {partner.name}
                  </span>
                )}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
