"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";

interface ProjectLifecycleProps {
  title: string;
  description?: string;
  className?: string;
}

export function ProjectLifecycle({
  title,
  description,
  className,
}: ProjectLifecycleProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-border-light hidden md:block" />
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision, needs, and site conditions." },
              { step: "02", title: "Design", desc: "Developing concepts, refining details, and preparing documents." },
              { step: "03", title: "Permitting", desc: "Navigating regulations and obtaining approvals." },
              { step: "04", title: "Construction", desc: "Overseeing execution to ensure design fidelity." },
              { step: "05", title: "Completion", desc: "Final walkthrough, handover, and ongoing support." },
            ].map((phase, i) => (
              <div key={phase.step} className="relative flex items-start gap-6 pb-12 last:pb-0">
                <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-text-primary bg-surface text-body-sm font-medium text-text-primary">
                  {phase.step}
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-heading-sm font-medium text-text-primary">{phase.title}</h3>
                  <p className="mt-1 text-body text-text-secondary">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
