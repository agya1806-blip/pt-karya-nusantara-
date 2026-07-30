"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { durations, easings, viewportMargin } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  once = true,
  className,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration: durations.slow,
        ease: easings.easeOut,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
