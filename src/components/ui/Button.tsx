"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonVariant, ButtonSize } from "./types";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-text-inverse hover:bg-brand-600 active:bg-brand-700",
  secondary: "bg-surface-tertiary text-text-primary hover:bg-neutral-800 active:bg-neutral-700",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-tertiary",
  outline: "border border-border-default text-text-primary hover:bg-surface-tertiary active:bg-neutral-800",
  gold: "bg-gradient-to-r from-brand-400 to-brand-500 text-text-inverse hover:from-brand-500 hover:to-brand-600 active:from-brand-600 active:to-brand-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
  xl: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || loading) && "opacity-50 pointer-events-none cursor-not-allowed",
          className,
        )}
        {...rest}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";