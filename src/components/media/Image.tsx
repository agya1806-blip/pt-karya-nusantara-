"use client";

import { useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ImageProps extends Omit<NextImageProps, "loading" | "className"> {
  loading?: "lazy" | "eager";
  fit?: "cover" | "contain";
  overlay?: boolean;
  overlayGradient?: string;
  reveal?: boolean;
  className?: string;
}

export function Image({
  loading = "lazy",
  fit = "cover",
  overlay,
  overlayGradient,
  reveal,
  className,
  alt,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reveal ? { opacity: 0, scale: 1.05 } : undefined}
      animate={reveal && loaded ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <NextImage
        {...props}
        alt={alt}
        loading={loading}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          fit === "cover" ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              overlayGradient ??
              "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          }}
        />
      )}
    </motion.div>
  );
}
