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
              "w-full border-b bg-transparent pb-2 pt-1 text-text placeholder:text-text-muted outline-none transition-colors duration-300 ease-luxury",
              error ? "border-red-500 focus:border-red-600" : "border-border focus:border-neutral-900",
              isLoading && "pr-8",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...rest}
          />
          {isLoading && <Loader2 className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-text-muted" />}
        </div>
        {error && <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";