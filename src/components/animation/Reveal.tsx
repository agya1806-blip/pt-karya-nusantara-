"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type RevealDirection = "left" | "right" | "top" | "bottom";

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

const clipPaths: Record<RevealDirection, { hidden: string; visible: string }> =
  {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0)",
    },
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0 0)",
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0 0 0 0)",
    },
  };

export function Reveal({
  children,
  direction = "left",
  duration = 1,
  delay = 0,
  once = true,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const clip = clipPaths[direction];

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: clip.hidden }}
      whileInView={{ clipPath: clip.visible }}
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
