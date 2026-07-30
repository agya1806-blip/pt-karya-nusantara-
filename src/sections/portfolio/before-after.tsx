"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { BeforeAfterComparison } from "@/features";
import type { ProjectItem } from "@/sections/types";

interface BeforeAfterProps {
  title: string;
  description?: string;
  project?: ProjectItem;
  className?: string;
}

export function BeforeAfter({
  title,
  description,
  project,
  className,
}: BeforeAfterProps) {
  const firstImage = project?.images?.[0];
  const lastImage = project?.images?.[project.images.length - 1];
  const beforeImage = firstImage
    ? { src: firstImage.src, alt: `Before: ${firstImage.alt}` }
    : undefined;
  const afterImage = lastImage
    ? { src: lastImage.src, alt: `After: ${lastImage.alt}` }
    : undefined;

  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-4xl">
          {beforeImage && afterImage ? (
            <BeforeAfterComparison
              before={beforeImage}
              after={afterImage}
              orientation="horizontal"
            />
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-surface">
              <p className="text-body text-text-tertiary">
                Before & After comparison images not available
              </p>
            </div>
          )}
        </Fade>
      </div>
    </section>
  );
}
