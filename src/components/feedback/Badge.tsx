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
    "border border-brand-500/20 bg-brand-500/10 text-brand-400",
  muted: "bg-surface-secondary text-text-secondary",
  dark: "bg-neutral-900 text-text-inverse",
  success: "border border-green-500/30 bg-green-500/10 text-green-400",
  warning: "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  error: "border border-red-500/30 bg-red-500/10 text-red-400",
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
