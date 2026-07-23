"use client";

import { forwardRef, Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonVariant, ButtonSize } from "./types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-text-primary text-text-inverse hover:bg-neutral-800 active:bg-neutral-700",
  secondary: "bg-surface-muted text-text hover:bg-neutral-200 active:bg-neutral-300",
  ghost: "text-text hover:bg-surface-muted active:bg-neutral-200",
  outline: "border border-border-light text-text hover:bg-surface-muted active:bg-neutral-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-caption",
  md: "px-5 py-2.5 text-body-sm",
  lg: "px-6 py-3 text-body-sm",
  xl: "px-8 py-3.5 text-body",
};

function getButtonClasses(variant: ButtonVariant, size: ButtonSize, disabled: boolean, loading: boolean, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight transition-all duration-300 ease-architectural focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={getButtonClasses(variant, size, disabled ?? false, loading, className)}
        {...rest}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";