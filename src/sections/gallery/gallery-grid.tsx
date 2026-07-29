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
  layout?: "grid" | "masonry";
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
  layout = "grid",
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
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        {layout === "masonry" ? (
          <div
            className={cn("mt-20 grid gap-5", gridCols[columns])}
            style={{ alignItems: "start" }}
          >
            {Array.from({ length: columns }, (_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-5">
                {items
                  .filter((_, i) => i % columns === colIdx)
                  .map((item, imgIdx) => (
                    <button
                      key={`${colIdx}-${imgIdx}`}
                      type="button"
                      onClick={() => lightbox && setLightboxIndex(items.indexOf(item))}
                      className="group relative w-full overflow-hidden bg-surface-secondary"
                      aria-label={`View ${item.alt}`}
                    >
                      <ImageReveal
                        src={item.src}
                        alt={item.alt}
                        fill
                        zoomOnHover
                      />
                      <div className="absolute inset-0 bg-brand-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </button>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <Stagger className={cn("mt-20 grid gap-5", gridCols[columns])}>
            {items.map((item, i) => (
              <StaggerItem key={i}>
                <button
                  type="button"
                  onClick={() => lightbox && setLightboxIndex(i)}
                  className={cn(
                    "group relative w-full overflow-hidden bg-surface-secondary",
                    aspectRatio !== "auto" && aspectClasses[aspectRatio],
                  )}
                  aria-label={`View ${item.alt}`}
                >
                  <ImageReveal
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="h-full w-full"
                    zoomOnHover
                  />
                  <div className="absolute inset-0 bg-brand-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-brand-900/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-body-sm text-white">{item.caption}</p>
                    </div>
                  )}
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      {lightbox && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="flex max-h-full max-w-full flex-col items-center">
            {(() => {
              const item = items[lightboxIndex];
              if (!item) return null;
              return (
                <>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-[85vh] w-auto max-w-full object-contain"
                  />
                  {item.caption && (
                    <p className="mt-5 text-body-sm text-white/80">
                      {item.caption}
                    </p>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
