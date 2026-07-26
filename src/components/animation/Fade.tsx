"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { durations, easings, viewportMargin } from "@/lib/animation";
import { cn } from "@/lib/utils";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeProps {
  children: React.ReactNode;
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function Fade({
  children,
  direction = "up",
  duration,
  delay = 0,
  once = true,
  className,
}: FadeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const offsets: Record<FadeDirection, Record<string, number>> = {
    up: { y: 32 },
    down: { y: -32 },
    left: { x: 32 },
    right: { x: -32 },
    none: {},
  };

  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration: duration ?? (direction === "none" ? durations.normal : durations.slow),
        delay,
        ease: easings.easeOut,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
