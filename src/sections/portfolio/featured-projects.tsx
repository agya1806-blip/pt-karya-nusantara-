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
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-20 space-y-20 lg:space-y-24">
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <Link
                href={project.href}
                className={cn(
                  "group grid items-center gap-10 lg:grid-cols-2",
                  i % 2 === 1 && "lg:direction-rtl",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-sm",
                    i % 2 === 1 && "lg:order-2",
                  )}
                >
                  <div className="absolute inset-0 bg-brand-900/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                  <ImageReveal
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    zoomOnHover
                    className="h-full w-full"
                  />
                </div>
                <div className={cn(i % 2 === 1 && "lg:order-1", "lg:px-6")}>
                  <span className="text-overline tracking-widest text-brand-500">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-serif text-heading-xl font-light tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex gap-5 text-body-sm text-text-secondary">
                    {project.location && <span>{project.location}</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-caption font-medium tracking-widest uppercase text-brand-600 transition-all duration-300 group-hover:gap-3">
                    Lihat Proyek <ArrowRight size={12} />
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
