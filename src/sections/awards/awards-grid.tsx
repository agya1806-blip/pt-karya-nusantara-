"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Fade } from "@/components/animation/Fade";
import { Award } from "lucide-react";
import type { AwardItem } from "@/sections/types";

interface AwardsGridProps {
  label?: string;
  title: string;
  description?: string;
  awards: AwardItem[];
  className?: string;
}

export function AwardsGrid({
  label,
  title,
  description,
  awards,
  className,
}: AwardsGridProps) {
  return (
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <StaggerItem key={`${award.title}-${i}`}>
              <div className="group flex flex-col border border-border-light/60 bg-surface-muted p-8 lg:p-10 transition-all duration-300 ease-luxury hover:border-border-default hover:shadow-elevation-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-surface-dark text-text-inverse">
                  <Award size={24} />
                </div>
                <h3 className="font-serif text-heading-sm font-medium text-text">
                  {award.title}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {award.organization}
                </p>
                {award.description && (
                  <p className="mt-3 text-body-sm text-text-muted leading-relaxed">
                    {award.description}
                  </p>
                )}
                <span className="mt-5 text-overline tracking-widest text-text-secondary">
                  {award.year}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
