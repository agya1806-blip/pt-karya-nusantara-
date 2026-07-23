"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface ScaleProps {
  children: React.ReactNode;
  initialScale?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function Scale({
  children,
  initialScale = 0.9,
  duration = 0.6,
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
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
