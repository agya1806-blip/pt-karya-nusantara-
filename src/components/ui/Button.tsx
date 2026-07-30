"use client";

import { forwardRef, Children, cloneElement, isValidElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHoverTransition } from "@/lib/animation";
import { Loader2 } from "lucide-react";
import type { ButtonVariant, ButtonSize } from "./types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-white shadow-sm hover:bg-gold-600 active:bg-gold-700",
  secondary:
    "bg-brand-800 text-white hover:bg-brand-700 active:bg-brand-900",
  ghost:
    "text-text-secondary hover:text-text hover:bg-surface-muted active:bg-surface-tertiary",
  outline:
    "border border-gold-500/30 text-gold-700 hover:bg-gold-50 hover:border-gold-500/60 active:bg-gold-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-caption gap-1.5 uppercase tracking-widest",
  md: "px-6 py-2.5 text-caption gap-2 uppercase tracking-widest",
  lg: "px-8 py-3 text-caption gap-2 uppercase tracking-widest",
  xl: "px-10 py-3.5 text-body-sm gap-2.5 uppercase tracking-widest",
};

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-architectural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && "opacity-50 pointer-events-none cursor-not-allowed",
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className, children, type = "button", asChild, ...rest }, ref) => {
    if (asChild) {
      const child = Children.only(children);
      if (isValidElement(child)) {
        return cloneElement(child, {
          ref,
          disabled: disabled || loading,
          className: cn(getButtonClasses(variant, size, disabled ?? false, loading, className), (child.props as Record<string, unknown>)?.className as string | undefined),
          ...rest,
        } as Record<string, unknown>);
      }
      return <>{children}</>;
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={getButtonClasses(variant, size, disabled ?? false, loading, className)}
        whileHover={disabled || loading ? {} : { scale: 1.02 }}
        whileTap={disabled || loading ? {} : { scale: 0.98 }}
        transition={buttonHoverTransition}
        {...(rest as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";