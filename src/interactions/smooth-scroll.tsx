"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  enabled?: boolean;
  lerp?: number;
  duration?: number;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal" | "both";
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  children?: React.ReactNode;
}

export function SmoothScroll({
  enabled = true,
  lerp = 0.08,
  duration = 1.2,
  orientation = "vertical",
  gestureOrientation = "vertical",
  smoothWheel = true,
  wheelMultiplier = 1,
  touchMultiplier = 1.5,
}: SmoothScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp,
      duration,
      orientation,
      gestureOrientation,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [enabled, lerp, duration, orientation, gestureOrientation, smoothWheel, wheelMultiplier, touchMultiplier]);

  return null;
}
