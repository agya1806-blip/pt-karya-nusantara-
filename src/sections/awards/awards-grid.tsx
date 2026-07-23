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
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <StaggerItem key={`${award.title}-${i}`}>
              <div className="group flex flex-col rounded-2xl border border-border bg-surface-muted p-8 transition-all duration-300 ease-luxury hover:border-border-muted">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-dark text-text-inverse">
                  <Award size={24} />
                </div>
                <h3 className="text-heading-sm font-medium text-text">
                  {award.title}
                </h3>
                <p className="mt-1 text-body-sm text-text-secondary">
                  {award.organization}
                </p>
                {award.description && (
                  <p className="mt-3 text-body-sm text-text-muted leading-relaxed">
                    {award.description}
                  </p>
                )}
                <span className="mt-4 text-caption font-semibold tracking-widest text-text-secondary uppercase">
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
