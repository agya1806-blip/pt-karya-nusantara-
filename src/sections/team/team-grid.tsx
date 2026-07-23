"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import type { TeamMember } from "@/sections/types";

interface TeamGridProps {
  label?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "compact";
  className?: string;
}

const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function TeamGrid({
  label,
  title,
  description,
  members,
  columns = 4,
  variant = "default",
  className,
}: TeamGridProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        {title && (
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
        )}
        <Stagger className={cn("mt-16 grid gap-8", gridCols[columns])}>
          {members.map((member) => (
            <StaggerItem key={member.name}>
              <div className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-secondary">
                  {member.image ? (
                    <ImageReveal
                      src={member.image.src}
                      alt={member.name}
                      fill
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-display text-text-tertiary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-heading-sm font-medium text-text-primary">
                    {member.name}
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="mt-2 text-body-sm text-text-secondary leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                  {member.social && member.social.length > 0 && (
                    <div className="mt-3 flex gap-3">
                      {member.social.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          className="text-text-tertiary transition-colors duration-300 hover:text-text-primary"
                          aria-label={link.label ?? link.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
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
