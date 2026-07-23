"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { ProcessStep } from "@/sections/types";

interface ProcessStepsProps {
  label?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
  variant?: "numbered" | "timeline";
  className?: string;
}

export function ProcessSteps({
  label,
  title,
  description,
  steps,
  variant = "numbered",
  className,
}: ProcessStepsProps) {
  if (variant === "timeline") {
    return (
      <section className={cn("bg-surface-secondary py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <div className="relative mt-16">
            <div className="absolute left-8 top-0 h-full w-px bg-border-light" />
            <Stagger className="space-y-12">
              {steps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="relative pl-20">
                    <div className="absolute left-4 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-500 bg-surface text-body-sm font-medium text-brand-600">
                      {i + 1}
                    </div>
                    <h3 className="text-heading-sm font-medium text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-body text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
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
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="relative h-full rounded-2xl border border-border-light bg-surface p-8">
                <span className="text-display-sm font-light text-brand-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-heading-sm font-medium text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
