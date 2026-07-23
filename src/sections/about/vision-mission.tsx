"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import type { MediaItem } from "@/sections/types";

interface VisionMissionProps {
  label?: string;
  title: string;
  vision: {
    title: string;
    description: string;
    image?: MediaItem;
  };
  mission: {
    title: string;
    description: string;
    image?: MediaItem;
  };
  className?: string;
}

export function VisionMission({
  label,
  title,
  vision,
  mission,
  className,
}: VisionMissionProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
        />
        <Stagger className="mt-16 grid gap-12 lg:grid-cols-2">
          <StaggerItem>
            <div className="rounded-2xl border border-border-light bg-surface p-10">
              <h3 className="text-heading font-light tracking-tight text-text-primary">
                {vision.title}
              </h3>
              <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
                {vision.description}
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-2xl border border-border-light bg-surface p-10">
              <h3 className="text-heading font-light tracking-tight text-text-primary">
                {mission.title}
              </h3>
              <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
                {mission.description}
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
