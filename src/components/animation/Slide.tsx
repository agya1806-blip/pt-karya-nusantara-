"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { slideUpVariants } from "@/lib/animation";
import { cn } from "@/lib/utils";

type SlideDirection = "up" | "down" | "left" | "right";

interface SlideProps {
  children: React.ReactNode;
  direction?: SlideDirection;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

const translateMap: Record<SlideDirection, string> = {
  up: "translateY(100%)",
  down: "translateY(-100%)",
  left: "translateX(100%)",
  right: "translateX(-100%)",
};

export function Slide({
  children,
  direction = "up",
  duration = 0.8,
  delay = 0,
  once = true,
  className,
}: SlideProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const translate = translateMap[direction];

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ [direction === "up" || direction === "down" ? "y" : "x"]: translate }}
        whileInView={{ y: 0, x: 0 }}
        viewport={{ once, margin: "-40px" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
