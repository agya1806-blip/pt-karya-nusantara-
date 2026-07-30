"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/sections/types";

interface ImageGalleryProps {
  label?: string;
  title: string;
  description?: string;
  images: MediaItem[];
  className?: string;
}

export function ImageGallery({
  label,
  title,
  description,
  images,
  className,
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1,
    );
  const next = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : prev === images.length - 1 ? 0 : prev + 1,
    );

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img, i) => (
            <StaggerItem key={i}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
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
            {lightboxIndex !== null && images[lightboxIndex] && (
              <img
                src={images[lightboxIndex]!.src}
                alt={images[lightboxIndex]!.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
