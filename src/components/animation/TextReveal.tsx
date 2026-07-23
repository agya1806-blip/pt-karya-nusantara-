"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function TextReveal({
  text,
  duration = 0.6,
  delay = 0,
  once = true,
  className,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  const words = text.split(" ");

  if (reduced) {
    return <span className={cn(className)}>{text}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <span key={index} className="relative overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-50px" }}
            transition={{
              duration,
              delay: delay + index * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
}
