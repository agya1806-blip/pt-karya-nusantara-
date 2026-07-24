"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import type { GalleryItem } from "@/sections/types";

interface ProjectGalleryProps {
  label?: string;
  title: string;
  description?: string;
  images: GalleryItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function ProjectGallery({
  label,
  title,
  description,
  images,
  columns = 3,
  className,
}: ProjectGalleryProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-16 grid gap-4", gridCols[columns])}>
          {images.map((image, i) => (
            <StaggerItem key={image.alt + i}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  i === 0 && columns === 3 && "sm:col-span-2 sm:row-span-2",
                )}
              >
                <div className="aspect-[4/3] w-full">
                  <ImageReveal
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="h-full w-full"
                  />
                </div>
                {image.caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-900/70 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-body-sm text-white">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
