"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { Check } from "lucide-react";
import type { MediaItem } from "@/sections/types";

interface ServiceDetailProps {
  title: string;
  description: string;
  image: MediaItem;
  features: string[];
  reverse?: boolean;
  className?: string;
}

export function ServiceDetail({
  title,
  description,
  image,
  features,
  reverse = false,
  className,
}: ServiceDetailProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Fade
            direction={reverse ? "right" : "left"}
            className={cn(reverse && "lg:order-2")}
          >
            <div>
              <h2 className="text-display font-light tracking-tight text-text-primary">
                {title}
              </h2>
              <p className="mt-6 text-body-lg text-text-secondary leading-relaxed">
                {description}
              </p>
              <ul className="mt-8 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-brand-500"
                    />
                    <span className="text-body text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
          <Fade
            direction={reverse ? "left" : "right"}
            className={cn(reverse && "lg:order-1")}
          >
            <ImageReveal
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full rounded-2xl"
              fill
            />
          </Fade>
        </div>
      </div>
    </section>
  );
}
