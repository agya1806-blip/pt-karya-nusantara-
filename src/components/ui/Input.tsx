"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Label } from "./Label";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  isLoading?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, isLoading, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label htmlFor={inputId} size="sm">{label}</Label>}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-body text-text placeholder:text-input-placeholder outline-none transition-all duration-300 ease-architectural",
              error
                ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-input-border bg-surface focus:border-input-border-hover focus:ring-1 focus:ring-input-ring",
              isLoading && "pr-10",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...rest}
          />
          {isLoading && <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-text-tertiary" />}
        </div>
        {error && <p id={`${inputId}-error`} className="text-caption text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-caption text-text-tertiary">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";