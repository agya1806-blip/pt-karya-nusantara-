"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/sections/types";

interface GalleryShowcaseProps {
  label?: string;
  title: string;
  description?: string;
  images: MediaItem[];
  className?: string;
}

export function GalleryShowcase({
  label,
  title,
  description,
  images,
  className,
}: GalleryShowcaseProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const hero = images[heroIndex]!;
  const thumbs = images.filter((_, i) => i !== heroIndex);

  const openLightbox = (index: number) => {
    setHeroIndex(index);
    setLightboxOpen(true);
  };

  const prev = () =>
    setHeroIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () =>
    setHeroIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <Fade direction="left" className="lg:col-span-2">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative w-full overflow-hidden rounded-2xl bg-surface-muted aspect-[4/3]"
              aria-label="View fullsize"
            >
              <ImageReveal
                src={hero.src}
                alt={hero.alt}
                fill
                className="h-full w-full transition-transform duration-500 ease-luxury group-hover:scale-105"
              />
            </button>
          </Fade>
          <Fade direction="right" className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {thumbs.slice(0, 4).map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const actualIndex = images.findIndex(
                    (m) => m.src === img.src,
                  );
                  setHeroIndex(actualIndex);
                }}
                className="group relative w-full overflow-hidden rounded-xl bg-surface-muted aspect-[4/3]"
                aria-label={`View ${img.alt}`}
              >
                <ImageReveal
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="h-full w-full transition-transform duration-500 ease-luxury group-hover:scale-105"
                />
              </button>
            ))}
          </Fade>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 ease-luxury hover:bg-white/30"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 ease-luxury hover:bg-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 ease-luxury hover:bg-white/30"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="flex max-h-full max-w-full flex-col items-center">
            {images[heroIndex] && (
              <img
                src={images[heroIndex]!.src}
                alt={images[heroIndex]!.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
