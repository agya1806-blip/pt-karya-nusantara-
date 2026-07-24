"use client";

import { useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface ImageProps extends Omit<NextImageProps, "loading" | "className"> {
  loading?: "lazy" | "eager";
  fit?: "cover" | "contain";
  overlay?: boolean;
  overlayGradient?: string;
  reveal?: boolean;
  priority?: boolean;
  className?: string;
  fallbackText?: string;
}

export function Image({
  loading = "lazy",
  fit = "cover",
  overlay,
  overlayGradient,
  reveal,
  priority,
  className,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fallbackText,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <motion.div
        className={cn("relative flex items-center justify-center overflow-hidden bg-surface-secondary", className)}
        initial={reveal ? { opacity: 0 } : undefined}
        animate={reveal ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-text-tertiary p-4">
          <ImageIcon size={24} />
          {fallbackText && <span className="text-body-xs text-center">{fallbackText}</span>}
          {!fallbackText && <span className="text-body-xs text-center">{alt}</span>}
        </div>
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
        loading={priority ? undefined : loading}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          fit === "cover" ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
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
