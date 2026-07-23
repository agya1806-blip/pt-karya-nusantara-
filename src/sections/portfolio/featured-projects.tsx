"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PortfolioItem } from "@/sections/types";

interface FeaturedProjectsProps {
  label?: string;
  title: string;
  description?: string;
  projects: PortfolioItem[];
  className?: string;
}

export function FeaturedProjects({
  label,
  title,
  description,
  projects,
  className,
}: FeaturedProjectsProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 space-y-16">
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <Link
                href={project.href}
                className={cn(
                  "group grid items-center gap-8 lg:grid-cols-2",
                  i % 2 === 1 && "lg:direction-rtl",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-2xl",
                    i % 2 === 1 && "lg:order-2",
                  )}
                >
                  <ImageReveal
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    className="h-full w-full"
                  />
                </div>
                <div className={cn(i % 2 === 1 && "lg:order-1")}>
                  <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-heading-xl font-light tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {project.title}
                  </h3>
                  <div className="mt-3 flex gap-4 text-body-sm text-text-secondary">
                    {project.location && <span>{project.location}</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2">
                    View Project <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
