"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselWrapperProps {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  arrows?: boolean;
  dots?: boolean;
  loop?: boolean;
  className?: string;
}

export function CarouselWrapper({
  slides,
  autoPlay = false,
  interval = 5000,
  arrows = true,
  dots = true,
  loop = true,
  className,
}: CarouselWrapperProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => {
      if (prev === total - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  }, [total, loop]);

  const prev = useCallback(() => {
    setCurrent((prev) => {
      if (prev === 0) return loop ? total - 1 : prev;
      return prev - 1;
    });
  }, [total, loop]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-500 ease-architectural"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            className="min-w-0 shrink-0 basis-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
          >
            {slides[i]}
          </div>
        ))}
      </div>
      {arrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-900 shadow-lg transition-opacity duration-300 ease-architectural hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-900 shadow-lg transition-opacity duration-300 ease-architectural hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      {dots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-architectural",
                i === current ? "w-6 bg-white" : "w-2 bg-white/50",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
