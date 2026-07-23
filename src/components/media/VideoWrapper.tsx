"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface VideoWrapperProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  thumbnailOverlay?: boolean;
  className?: string;
}

export function VideoWrapper({
  src,
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  thumbnailOverlay,
  className,
}: VideoWrapperProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    videoRef.current?.play();
    setPlaying(true);
  }

  return (
    <div
      className={cn("group relative overflow-hidden rounded-lg", className)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className="h-full w-full object-cover"
        onEnded={() => setPlaying(false)}
      />
      {thumbnailOverlay && !playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ease-architectural hover:bg-black/40"
          aria-label="Play video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 ease-architectural hover:scale-105">
            <Play className="ml-0.5 h-8 w-8 text-neutral-900" />
          </span>
        </button>
      )}
    </div>
  );
}
