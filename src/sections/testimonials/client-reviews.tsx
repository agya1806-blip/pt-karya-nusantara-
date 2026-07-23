"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { TestimonialItem } from "@/sections/types";

interface ClientReviewsProps {
  label?: string;
  title: string;
  description?: string;
  testimonials: TestimonialItem[];
  variant?: "grid" | "carousel";
  className?: string;
}

function ReviewCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:shadow-elevation-2">
      {testimonial.rating && (
        <div className="mb-4 flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < testimonial.rating!
                  ? "fill-brand-500 text-brand-500"
                  : "text-border-light"
              }
            />
          ))}
        </div>
      )}
      <blockquote className="flex-1">
        <p className="text-body-lg text-text-secondary leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        {testimonial.avatar && (
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img
              src={testimonial.avatar.src}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="text-body-sm font-medium text-text-primary">
            {testimonial.name}
          </p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-caption text-text-secondary">
              {[testimonial.role, testimonial.company]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ClientReviews({
  label,
  title,
  description,
  testimonials,
  variant = "grid",
  className,
}: ClientReviewsProps) {
  const [current, setCurrent] = useState(0);

  if (variant === "carousel" && testimonials.length > 0) {
    const visible = testimonials[current];
    if (!visible) return null;

    return (
      <section className={cn("bg-surface-secondary py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <div className="mx-auto mt-16 max-w-3xl">
            <ReviewCard testimonial={visible} />
            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((p) =>
                      p === 0 ? testimonials.length - 1 : p - 1,
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-secondary transition-colors duration-300 hover:bg-surface hover:text-text-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === current
                          ? "w-8 bg-text-primary"
                          : "w-2 bg-border-light hover:bg-text-secondary",
                      )}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((p) =>
                      p === testimonials.length - 1 ? 0 : p + 1,
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-secondary transition-colors duration-300 hover:bg-surface hover:text-text-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <ReviewCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
