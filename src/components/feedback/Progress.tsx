"use client";

import { cn } from "@/lib/utils";

type ProgressVariant = "default" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const barSize: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const barVariant: Record<ProgressVariant, string> = {
  default: "bg-text-primary",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  label,
  showValue,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-body-sm leading-relaxed text-text-secondary">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-body-sm font-medium text-text-primary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full bg-surface-secondary"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "rounded-full transition-all duration-300 ease-architectural",
            barSize[size],
            barVariant[variant],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
