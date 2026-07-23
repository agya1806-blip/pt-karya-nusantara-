"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Play, X } from "lucide-react";
import type { TestimonialItem, VideoItem } from "@/sections/types";

interface VideoTestimonial {
  testimonial: TestimonialItem;
  video: VideoItem;
}

interface VideoTestimonialsProps {
  label?: string;
  title: string;
  description?: string;
  items: VideoTestimonial[];
  className?: string;
}

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\..+?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export function VideoTestimonials({
  label,
  title,
  description,
  items,
  className,
}: VideoTestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.testimonial.name}>
              <div className="group relative overflow-hidden rounded-2xl bg-surface-secondary">
                <button
                  type="button"
                  onClick={() => setActiveVideo(item.testimonial.name)}
                  className="relative aspect-video w-full cursor-pointer overflow-hidden"
                  aria-label={`Play video testimonial from ${item.testimonial.name}`}
                >
                  {item.video.poster ? (
                    <img
                      src={item.video.poster}
                      alt={item.testimonial.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                      <span className="text-text-tertiary">Video</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play size={22} className="ml-1" />
                    </span>
                  </div>
                </button>
                <div className="p-5">
                  <p className="text-body-sm text-text-secondary leading-relaxed line-clamp-2">
                    &ldquo;{item.testimonial.content}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    {item.testimonial.avatar && (
                      <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
                        <img
                          src={item.testimonial.avatar.src}
                          alt={item.testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-body-sm font-medium text-text-primary">
                        {item.testimonial.name}
                      </p>
                      <p className="text-caption text-text-secondary">
                        {item.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {activeVideo && (() => {
        const activeItem = items.find(
          (i) => i.testimonial.name === activeVideo,
        );
        if (!activeItem) return null;
        const { video } = activeItem;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Video testimonial from ${activeItem.testimonial.name}`}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-300 hover:bg-white/30"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full max-w-4xl">
              {video.type === "youtube" && getYouTubeId(video.src) && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(video.src)}?autoplay=1`}
                  title={activeItem.testimonial.name}
                  className="h-full w-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {video.type === "vimeo" && getVimeoId(video.src) && (
                <iframe
                  src={`https://player.vimeo.com/video/${getVimeoId(video.src)}?autoplay=1`}
                  title={activeItem.testimonial.name}
                  className="h-full w-full rounded-xl"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
              {video.type === "local" && (
                <video
                  controls
                  autoPlay
                  className="h-full w-full rounded-xl"
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
