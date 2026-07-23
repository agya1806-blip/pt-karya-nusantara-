"use client";

import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { ProcessStep } from "@/sections/types";

interface WorkflowProps {
  steps: ProcessStep[];
  className?: string;
}

export function Workflow({ steps, className }: WorkflowProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <Stagger className="mx-auto mt-8 grid max-w-4xl gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="relative flex items-start gap-6">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-text-primary text-text-inverse text-heading-sm font-medium">
                  {step.step ?? i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-heading-sm font-medium text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-body text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  {step.duration && (
                    <span className="mt-2 inline-block rounded-full bg-brand-500/10 px-3 py-1 text-caption text-brand-600">
                      {step.duration}
                    </span>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
