"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { durations, easings, viewportMargin } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  className?: string;
}

export function TextReveal({
  children,
  as: Tag = "h1",
  delay = 0,
  className,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const words = children.split(" ");

  return (
    <Tag className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: viewportMargin }}
            transition={{
              duration: durations.slow,
              delay: delay + index * 0.08,
              ease: easings.easeOut,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
