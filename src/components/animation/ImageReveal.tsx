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
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill,
  duration = 1,
  delay = 0,
  once = true,
  className,
}: ImageRevealProps) {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {fill ? (
          <Image src={src} alt={alt} fill className="object-cover" />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !loaded && "bg-surface-muted",
        className,
      )}
    >
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.1 }}
        whileInView={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
        viewport={{ once, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="h-full w-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            onLoad={() => setLoaded(true)}
            className="object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setLoaded(true)}
            className="object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}
