"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "./types";

interface IconButtonProps {
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gold-500 text-white hover:bg-gold-600",
  secondary: "bg-brand-800 text-text-inverse hover:bg-brand-700",
  ghost: "text-text-secondary hover:text-text hover:bg-surface-muted",
  outline: "border border-border-default text-text-secondary hover:text-text hover:bg-surface-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ "aria-label": ariaLabel, variant = "ghost", size = "md", disabled = false, className, children, type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-all duration-300 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";