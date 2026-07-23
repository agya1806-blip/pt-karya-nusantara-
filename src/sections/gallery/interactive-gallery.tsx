"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaImage } from "@/sections/types";

interface InteractiveGalleryProps {
  title: string;
  description?: string;
  images: MediaImage[];
  className?: string;
}

export function InteractiveGallery({
  title,
  description,
  images,
  className,
}: InteractiveGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((p) => (p === null ? null : p === 0 ? images.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p === null ? null : p === images.length - 1 ? 0 : p + 1));

  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mt-16">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-surface"
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </button>
            ))}
          </div>
        </Fade>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive gallery viewer"
        >
          <button type="button" onClick={close} className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30" aria-label="Close">
            <X size={20} />
          </button>
          <button type="button" onClick={prev} className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={next} className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30" aria-label="Next">
            <ChevronRight size={20} />
          </button>
          <div className="flex flex-col items-center">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
