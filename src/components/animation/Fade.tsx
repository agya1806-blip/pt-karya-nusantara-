"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { fadeUpVariants, fadeVariants } from "@/lib/animation";
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

  const variants = direction === "none" ? fadeVariants : fadeUpVariants;

  const offsets: Record<FadeDirection, Record<string, number>> = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration: duration ?? (direction === "none" ? 0.4 : 0.6),
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
