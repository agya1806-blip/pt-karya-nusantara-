"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { MapPin, Calendar } from "lucide-react";
import type { ProjectItem } from "@/sections/types";

interface ProjectDetailHeaderProps {
  project: ProjectItem;
  className?: string;
}

export function ProjectDetailHeader({
  project,
  className,
}: ProjectDetailHeaderProps) {
  return (
    <section className={cn("relative min-h-[60vh] flex items-end bg-surface", className)}>
      {project.thumbnail && (
        <div className="absolute inset-0">
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      )}
      <div className="container-site relative z-10 pb-16">
        <Fade direction="up">
          <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            {project.category}
          </span>
          <h1 className="mt-2 text-display font-light tracking-tight text-white max-w-3xl">
            {project.title}
          </h1>
          <p className="mt-3 text-body-lg text-white/80 max-w-2xl leading-relaxed">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-body-sm text-white/70">
            {project.location && (
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {project.year}
              </span>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}
