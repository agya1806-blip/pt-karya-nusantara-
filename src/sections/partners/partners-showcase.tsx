"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import type { PartnerItem } from "@/sections/types";

interface PartnersShowcaseProps {
  label?: string;
  title: string;
  description?: string;
  partners: PartnerItem[];
  variant?: "grid" | "carousel" | "simple";
  className?: string;
}

export function PartnersShowcase({
  label,
  title,
  description,
  partners,
  variant = "simple",
  className,
}: PartnersShowcaseProps) {
  if (variant === "grid") {
    return (
      <section className={cn("bg-surface-secondary py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <Fade direction="up" className="mt-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center rounded-xl border border-border-light bg-surface p-8 transition-all duration-300 hover:shadow-elevation-1"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo.src}
                      alt={partner.logo.alt || partner.name}
                      className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-body font-medium text-text-tertiary">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Fade>
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
        <Fade direction="up" className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {partners.map((partner) => (
              <div key={partner.name} className="transition-opacity duration-300 hover:opacity-80">
                {partner.logo ? (
                  <img
                    src={partner.logo.src}
                    alt={partner.logo.alt || partner.name}
                    className="max-h-10 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-body font-medium text-text-tertiary">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
