"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import Link from "next/link";
import type { ProjectItem } from "@/sections/types";

interface RelatedProjectsProps {
  title: string;
  description?: string;
  projects: ProjectItem[];
  className?: string;
}

export function RelatedProjects({
  title,
  description,
  projects,
  className,
}: RelatedProjectsProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                href={`/portfolio/${project.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <ImageReveal
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    fill
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-heading-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
