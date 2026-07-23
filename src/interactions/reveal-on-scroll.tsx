"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "slide";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const variants = {
  "fade": { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  "fade-up": { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  "fade-down": { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  "fade-left": { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  "scale": { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  "slide": { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
};

export function RevealOnScroll({ children, className, animation = "fade-up", delay = 0, duration = 0.6, threshold = 0.15, once = true }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const variant = variants[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
