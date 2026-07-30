"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { ProcessStep } from "@/sections/types";

interface StepProcessProps {
  label?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
  className?: string;
}

export function StepProcess({
  label,
  title,
  description,
  steps,
  className,
}: StepProcessProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader label={label} title={title} description={description} />
        <Stagger className="mx-auto mt-16 grid max-w-4xl gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="relative flex items-start gap-6">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-text-primary text-text-inverse text-heading-sm font-medium">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-heading-sm font-medium text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-body text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
