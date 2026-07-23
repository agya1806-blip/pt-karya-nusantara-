"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { ImageReveal } from "@/components/animation/ImageReveal";
import type { MediaItem } from "@/sections/types";

interface GalleryMasonryProps {
  label?: string;
  title: string;
  description?: string;
  images: MediaItem[];
  columns?: number;
  className?: string;
}

export function GalleryMasonry({
  label,
  title,
  description,
  images,
  columns = 3,
  className,
}: GalleryMasonryProps) {
  const cols = Math.min(Math.max(columns, 2), 4);

  const chunks: MediaItem[][] = Array.from({ length: cols }, () => []);
  images.forEach((img, i) => {
    chunks[i % cols]!.push(img);
  });

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Fade direction="up" className="mt-16">
          <div
            className={cn(
              "grid gap-4",
              cols === 2 && "grid-cols-2",
              cols === 3 && "grid-cols-2 md:grid-cols-3",
              cols === 4 && "grid-cols-2 md:grid-cols-4",
            )}
            style={{ alignItems: "start" }}
          >
            {chunks.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {col.map((img, imgIdx) => {
                if (!img) return null;
                return (
                  <div
                    key={`${colIdx}-${imgIdx}`}
                    className="group relative overflow-hidden rounded-xl bg-surface-muted"
                  >
                    <ImageReveal
                      src={img.src}
                      alt={img.alt}
                      width={img.width ?? 600}
                      height={img.height ?? 400}
                      className="w-full transition-transform duration-500 ease-luxury group-hover:scale-105"
                    />
                  </div>
                );
              })}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
