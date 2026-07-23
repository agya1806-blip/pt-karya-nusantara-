"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";

interface BeforeAfterProps {
  title: string;
  description?: string;
  className?: string;
}

export function BeforeAfter({
  title,
  description,
  className,
}: BeforeAfterProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
            <div className="flex h-full items-center justify-center">
              <p className="text-body text-text-tertiary">
                Before & After comparison coming soon
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
