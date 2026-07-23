"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";

interface ProcessStepItem {
  step: number;
  title: string;
  description: string;
}

interface ConsultationProcessProps {
  title: string;
  description?: string;
  steps: ProcessStepItem[];
  className?: string;
}

export function ConsultationProcess({
  title,
  description,
  steps,
  className,
}: ConsultationProcessProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Stagger className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <StaggerItem key={step.title}>
              <div className="flex items-start gap-4 rounded-xl border border-border-light bg-surface-secondary p-6">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-text-primary text-text-inverse text-body-sm font-medium">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-body font-medium text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-body-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
