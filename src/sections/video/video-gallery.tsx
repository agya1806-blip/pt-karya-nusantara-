"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Play, X } from "lucide-react";

interface VideoEntry {
  src: string;
  title: string;
  thumbnail?: string;
}

interface VideoGalleryProps {
  title: string;
  description?: string;
  videos: VideoEntry[];
  className?: string;
}

export function VideoGallery({
  title,
  description,
  videos,
  className,
}: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <button
              key={video.title}
              type="button"
              onClick={() => setActiveVideo(video.src)}
              className="group relative aspect-video w-full overflow-hidden rounded-xl bg-surface-secondary"
              aria-label={`Play ${video.title}`}
            >
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-text-tertiary">No thumbnail</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform group-hover:scale-110">
                  <Play size={22} className="ml-1" />
                </span>
              </div>
              <div className="absolute right-0 bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-body-sm font-medium text-white">{video.title}</p>
              </div>
            </button>
          ))}
        </Fade>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
          <div className="aspect-video w-full max-w-4xl">
            <video controls autoPlay className="h-full w-full rounded-xl">
              <source src={activeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
