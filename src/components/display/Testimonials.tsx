"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  variant?: "grid" | "carousel";
  className?: string;
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating;

  return (
    <div className="flex flex-col rounded-xl border border-border-light bg-surface p-8 transition-all duration-500 ease-architectural hover:border-border-default hover:shadow-elevation-4">
      {rating !== undefined && (
        <div className="mb-5 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < rating ? "fill-current text-text" : "text-border-light",
              )}
            />
          ))}
        </div>
      )}

      <blockquote className="flex-1">
        <p className="text-body leading-relaxed text-text-secondary">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>

      <div className="mt-8 flex items-center gap-4">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-11 w-11 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-body-sm font-medium text-text">
            {testimonial.name}
          </p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-caption text-text-tertiary">
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

export function Testimonials({
  title,
  description,
  testimonials,
  variant = "grid",
  className,
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  if (variant === "carousel" && testimonials.length > 0) {
    const visible = testimonials[current];
    if (!visible) return null;

    return (
      <section className={cn("py-24 md:py-32", className)}>
        <div className="container-site">
          {(title || description) && (
            <div className="mx-auto mb-14 max-w-3xl text-center">
              {title && (
                <h2 className="text-heading-xl font-light leading-tight tracking-tight text-text">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-5 text-body-lg leading-relaxed text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            <ReviewCard testimonial={visible} />

            {testimonials.length > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((p) =>
                      p === 0 ? testimonials.length - 1 : p - 1,
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-secondary transition-all duration-300 hover:border-border-default hover:bg-surface-muted hover:text-text"
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
                        "h-2 rounded-full transition-all duration-500 ease-architectural",
                        i === current
                          ? "w-8 bg-text"
                          : "w-2 bg-border-light hover:bg-text-tertiary",
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-secondary transition-all duration-300 hover:border-border-default hover:bg-surface-muted hover:text-text"
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
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container-site">
        {(title || description) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {title && (
              <h2 className="text-heading-xl font-light leading-tight tracking-tight text-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-body-lg leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <ReviewCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
