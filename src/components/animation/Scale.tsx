"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { durations, easings, viewportMargin } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface ScaleProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function Scale({
  children,
  duration,
  delay = 0,
  once = true,
  className,
}: ScaleProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration: duration ?? durations.slow,
        delay,
        ease: easings.easeOut,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
