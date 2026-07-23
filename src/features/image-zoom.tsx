"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ZoomState } from "./feature-types";

interface ImageZoomProps {
  src: string;
  alt: string;
  maxZoom?: number;
  className?: string;
}

export function ImageZoom({ src, alt, maxZoom = 3, className }: ImageZoomProps) {
  const [zoom, setZoom] = useState<ZoomState>({ scale: 1, position: { x: 0, y: 0 }, isZoomed: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    const newScale = Math.max(1, Math.min(maxZoom, zoom.scale + delta));
    setZoom((prev) => ({ ...prev, scale: newScale, isZoomed: newScale > 1 }));
  }, [zoom.scale, maxZoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!zoom.isZoomed || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setZoom((prev) => ({ ...prev, position: { x, y } }));
  }, [zoom.isZoomed]);

  const resetZoom = () => setZoom({ scale: 1, position: { x: 0.5, y: 0.5 }, isZoomed: false });

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden cursor-crosshair", className)}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetZoom}
      onClick={zoom.isZoomed ? resetZoom : undefined}
      role="img"
      aria-label={`Zoomable image: ${alt}`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          scale: zoom.scale,
          transformOrigin: `${zoom.position.x * 100}% ${zoom.position.y * 100}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </motion.div>
    </div>
  );
}
