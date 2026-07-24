"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks";
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
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
      <motion.div
        initial={reduced ? {} : { clipPath: "inset(0 100% 0 0)", scale: 1.05 }}
        animate={
          reduced || !loaded
            ? {}
            : { clipPath: "inset(0 0% 0 0)", scale: 1 }
        }
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-full w-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0",
              imgClassName,
            )}
            onLoad={() => setLoaded(true)}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 600}
            className={cn(
              "object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0",
              imgClassName,
            )}
            onLoad={() => setLoaded(true)}
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  );
}
