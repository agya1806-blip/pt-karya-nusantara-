"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Play, X } from "lucide-react";
import type { VideoItem } from "@/sections/types";

interface VideoShowcaseProps {
  label?: string;
  title: string;
  description?: string;
  video: VideoItem;
  poster?: string;
  aspectRatio?: string;
  overlay?: boolean;
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

export function VideoShowcase({
  label,
  title,
  description,
  video,
  poster,
  aspectRatio = "aspect-video",
  overlay = true,
  className,
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = poster ?? video.poster;

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Fade direction="up" className="mx-auto mt-16 max-w-5xl">
          {isPlaying ? (
            <div className={cn("relative w-full overflow-hidden rounded-2xl", aspectRatio)}>
              {video.type === "youtube" && getYouTubeId(video.src) && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(video.src)}?autoplay=1`}
                  title={video.title ?? "Video player"}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {video.type === "vimeo" && getVimeoId(video.src) && (
                <iframe
                  src={`https://player.vimeo.com/video/${getVimeoId(video.src)}?autoplay=1`}
                  title={video.title ?? "Video player"}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
              {video.type === "local" && (
                <video
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full"
                  poster={thumbnail}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className={cn(
                "group relative w-full overflow-hidden rounded-2xl",
                aspectRatio,
              )}
              aria-label="Play video"
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={video.title ?? "Video thumbnail"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary">
                  <span className="text-text-tertiary">No thumbnail</span>
                </div>
              )}
              {overlay && (
                <div className="absolute inset-0 bg-brand-900/30 transition-colors duration-300 group-hover:bg-brand-900/50" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                  <Play size={28} className="ml-1" />
                </span>
              </div>
              {video.title && (
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="text-heading-sm font-medium text-white">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-1 text-body-sm text-white/80">
                      {video.description}
                    </p>
                  )}
                </div>
              )}
            </button>
          )}
        </Fade>
      </div>
    </section>
  );
}
