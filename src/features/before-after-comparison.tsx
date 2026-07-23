"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/sections/types";

interface BeforeAfterComparisonProps {
  before: MediaImage;
  after: MediaImage;
  defaultPosition?: number;
  orientation?: "horizontal" | "vertical";
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
}

export function BeforeAfterComparison({
  before,
  after,
  defaultPosition = 50,
  orientation = "horizontal",
  labelBefore = "Before",
  labelAfter = "After",
  className,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState(defaultPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = orientation === "horizontal"
      ? ((clientX - rect.left) / rect.width) * 100
      : ((clientY - rect.top) / rect.height) * 100;
    setPosition(Math.max(0, Math.min(100, pos)));
  }, [orientation]);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e.clientX, e.clientY); };
  const handleTouchMove = (e: React.TouchEvent) => { if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY); };

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none overflow-hidden rounded-xl", className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={position}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight" || e.key === "ArrowUp") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image src={after.src} alt={after.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ [isHorizontal ? "width" : "height"]: `${position}%` }}
      >
        <Image src={before.src} alt={before.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" style={{ [isHorizontal ? "width" : "height"]: `${100 / (position / 100)}%` }} />
      </div>

      <div
        className={cn(
          "absolute bg-white/90 shadow-luxury flex items-center justify-center",
          isHorizontal
            ? "top-0 h-full w-1 cursor-col-resize"
            : "left-0 h-1 w-full cursor-row-resize",
        )}
        style={{ [isHorizontal ? "left" : "top"]: `${position}%`, transform: isHorizontal ? "translateX(-50%)" : "translateY(-50%)" }}
      >
        <div className={cn(
          "flex items-center justify-center rounded-full bg-white shadow-luxury",
          isHorizontal ? "h-10 w-10" : "h-10 w-10 rotate-90"
        )}>
          <ChevronLeft className="h-4 w-4 text-text" />
          <ChevronRight className="h-4 w-4 text-text" />
        </div>
      </div>

      <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-body-xs text-white backdrop-blur-sm">
        {labelBefore}
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-body-xs text-white backdrop-blur-sm">
        {labelAfter}
      </span>
    </div>
  );
}
