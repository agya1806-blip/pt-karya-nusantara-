"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  containerSelector?: string;
}

export function ReadingProgress({ color = "var(--color-text)", height = 3, position = "top" }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        [position]: 0,
        height,
        backgroundColor: color,
        scaleX,
        opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }).get() > 0.01 ? 1 : 0,
      }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
