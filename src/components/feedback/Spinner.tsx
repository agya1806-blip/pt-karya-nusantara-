"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function Spinner({
  size = "md",
  label = "Loading...",
  className,
}: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} role="status">
      <Loader2
        className={cn("animate-spin text-text-primary", sizeClasses[size])}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
