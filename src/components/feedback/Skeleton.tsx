"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SkeletonVariant = "text" | "circular" | "rectangular";
type SkeletonAnimation = "pulse" | "shimmer" | "none";

interface SkeletonProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  className?: string;
}

const shapeClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-md",
  circular: "h-10 w-10 rounded-full",
  rectangular: "h-32 w-full rounded-lg",
};

export function Skeleton({
  variant = "text",
  animation = "pulse",
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative bg-surface-secondary",
        shapeClasses[variant],
        animation === "pulse" && "animate-pulse",
        animation === "shimmer" && "overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {animation === "shimmer" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

interface SkeletonTextProps {
  lines?: number;
  animation?: SkeletonAnimation;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  animation,
  className,
}: SkeletonTextProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          animation={animation}
          className={i === lines - 1 ? "w-3/4" : undefined}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  animation?: SkeletonAnimation;
  className?: string;
}

export function SkeletonCard({ animation, className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-default bg-surface p-4",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton
        variant="rectangular"
        animation={animation}
        className="mb-4 h-48"
      />
      <SkeletonText lines={3} animation={animation} />
    </div>
  );
}
