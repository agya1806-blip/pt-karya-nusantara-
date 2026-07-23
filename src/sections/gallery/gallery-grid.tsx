"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/sections/types";

interface GalleryGridProps {
  label?: string;
  title: string;
  description?: string;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  aspectRatio?: "square" | "4/3" | "3/4" | "16/9" | "auto";
  lightbox?: boolean;
  className?: string;
}

const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const aspectClasses = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  auto: "",
};

export function GalleryGrid({
  label,
  title,
  description,
  items,
  columns = 3,
  aspectRatio = "4/3",
  lightbox = true,
  className,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? items.length - 1 : prev - 1,
    );
  const next = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === items.length - 1 ? 0 : prev + 1,
    );

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-16 grid gap-4", gridCols[columns])}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <button
                type="button"
                onClick={() => lightbox && setLightboxIndex(i)}
                className={cn(
                  "group relative w-full overflow-hidden rounded-xl bg-surface-secondary",
                  aspectRatio !== "auto" && aspectClasses[aspectRatio],
                )}
                aria-label={`View ${item.alt}`}
              >
                <ImageReveal
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-body-sm text-white">{item.caption}</p>
                  </div>
                )}
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {lightbox && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 hover:bg-white/30"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 hover:bg-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 hover:bg-white/30"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="flex max-h-full max-w-full flex-col items-center">
            <img
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].alt}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
            {items[lightboxIndex].caption && (
              <p className="mt-4 text-body-sm text-white/80">
                {items[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
