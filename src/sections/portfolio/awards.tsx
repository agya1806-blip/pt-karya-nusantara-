"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Award } from "lucide-react";
import type { AwardItem } from "@/sections/types";

interface AwardsProps {
  label?: string;
  title: string;
  description?: string;
  awards: AwardItem[];
  className?: string;
}

export function Awards({
  label,
  title,
  description,
  awards,
  className,
}: AwardsProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => (
            <StaggerItem key={`${award.title}-${award.year}`}>
              <div className="group rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:border-brand-200 hover:shadow-elevation-2">
                <Award
                  size={28}
                  className="mb-4 text-brand-500"
                />
                <h3 className="text-heading-sm font-medium text-text-primary">
                  {award.title}
                </h3>
                <p className="mt-1 text-body-sm text-text-secondary">
                  {award.organization}
                </p>
                <span className="mt-3 inline-block text-caption font-semibold tracking-widest text-brand-500 uppercase">
                  {award.year}
                </span>
                {award.description && (
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
