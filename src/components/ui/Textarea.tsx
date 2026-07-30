"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className, rows = 4, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label htmlFor={inputId} size="sm">{label}</Label>}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            "w-full resize-y rounded-lg border px-4 py-3 text-body text-text placeholder:text-input-placeholder outline-none transition-all duration-300 ease-architectural",
            error
              ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-input-border bg-surface focus:border-input-border-hover focus:ring-1 focus:ring-input-ring",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {error && <p id={`${inputId}-error`} className="text-caption text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-caption text-text-tertiary">{hint}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";