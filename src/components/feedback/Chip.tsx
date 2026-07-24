"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ChipVariant = "default" | "muted" | "dark" | "success" | "warning" | "error";

interface ChipProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  default: "border border-border-default bg-surface text-text-primary",
  muted: "bg-surface-secondary text-text-secondary",
  dark: "bg-brand-800 text-text-inverse",
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
  error: "bg-red-50 text-red-700",
};

export function Chip({
  variant = "default",
  children,
  onRemove,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-body-sm leading-relaxed",
        variantStyles[variant],
        className,
      )}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 inline-flex rounded-full p-0.5 opacity-70 transition-opacity duration-300 ease-architectural hover:opacity-100"
          aria-label="Remove"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
