"use client";

import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "muted"
  | "dark"
  | "success"
  | "warning"
  | "error";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "border border-border-default bg-surface text-text-primary",
  muted: "bg-surface-secondary text-text-secondary",
  dark: "bg-neutral-900 text-text-inverse",
  success: "border border-green-500/30 bg-green-50 text-green-700",
  warning: "border border-yellow-500/30 bg-yellow-50 text-yellow-700",
  error: "border border-red-500/30 bg-red-50 text-red-700",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-caption tracking-wider",
  md: "px-2 py-0.5 text-body-sm",
  lg: "px-2.5 py-1 text-body-sm",
};

export function Badge({
  variant = "default",
  size = "md",
  dot,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium leading-relaxed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full bg-current")}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
