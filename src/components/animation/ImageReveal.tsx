"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks";
import { durations, easings } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill,
  className,
  imgClassName,
  priority,
}: ImageRevealProps) {
  const [loaded, setLoaded] = useState(false);
  const [fallback, setFallback] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setFallback(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const ready = loaded || fallback || reduced;

  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
      <motion.div
        initial={
          reduced ? {} : { clipPath: "inset(0 100% 0 0)", scale: 1.05 }
        }
        animate={
          ready
            ? { clipPath: "inset(0 0% 0 0)", scale: 1 }
            : {}
        }
        transition={{
          duration: durations.slower,
          ease: easings.easeOut,
        }}
        className="relative h-full w-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              "object-cover",
              imgClassName,
            )}
            onLoad={() => setLoaded(true)}
            priority={priority ?? true}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 600}
            className={cn(
              "object-cover",
              imgClassName,
            )}
            onLoad={() => setLoaded(true)}
            priority={priority ?? true}
          />
        )}
      </motion.div>
    </div>
  );
}
