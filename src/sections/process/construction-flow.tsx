"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";

interface ConstructionFlowProps {
  title: string;
  description?: string;
  className?: string;
}

export function ConstructionFlow({
  title,
  description,
  className,
}: ConstructionFlowProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { phase: "Pre-Construction", items: ["Site Preparation", "Permit Acquisition", "Contractor Selection"] },
              { phase: "Construction", items: ["Foundation & Structure", "Architectural Finishes", "MEP Installation"] },
              { phase: "Post-Construction", items: ["Final Inspection", "Handover", "Warranty Support"] },
            ].map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl border border-border-light bg-surface p-6 transition-all duration-300 hover:shadow-elevation-1"
              >
                <h3 className="text-heading-sm font-medium text-text-primary">{phase.phase}</h3>
                <ul className="mt-4 space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="text-body-sm text-text-secondary flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
