"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";

interface ServiceOverviewProps {
  title: string;
  description: string;
  className?: string;
}

export function ServiceOverview({
  title,
  description,
  className,
}: ServiceOverviewProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <Fade direction="up" className="mx-auto max-w-3xl text-center">
          <h1 className="text-display font-light tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
            {description}
          </p>
        </Fade>
      </div>
    </section>
  );
}
