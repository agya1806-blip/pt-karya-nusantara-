"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { staggerItemVariants, viewportMargin } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
  className,
}: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
