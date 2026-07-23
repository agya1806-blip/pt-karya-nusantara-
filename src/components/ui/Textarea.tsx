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
            "w-full resize-y border-b bg-transparent pb-2 pt-1 text-text placeholder:text-text-muted outline-none transition-colors duration-300 ease-luxury",
            error ? "border-red-500 focus:border-red-600" : "border-border focus:border-neutral-900",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {error && <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";