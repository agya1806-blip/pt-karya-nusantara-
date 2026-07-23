"use client";

import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { TeamMember } from "@/sections/types";

interface FounderStoryProps {
  founders: TeamMember[];
  className?: string;
}

export function FounderStory({ founders, className }: FounderStoryProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <Stagger className="mx-auto max-w-4xl space-y-12">
          {founders.map((founder) => (
            <StaggerItem key={founder.name}>
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="aspect-square w-full max-w-xs flex-shrink-0 overflow-hidden rounded-2xl bg-surface">
                  {founder.image ? (
                    <img src={founder.image.src} alt={founder.image.alt} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-display text-text-tertiary">
                      {founder.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-heading font-medium text-text-primary">{founder.name}</h3>
                  <p className="text-body text-text-secondary">{founder.role}</p>
                  {founder.bio && (
                    <p className="mt-3 text-body text-text-secondary leading-relaxed">{founder.bio}</p>
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
