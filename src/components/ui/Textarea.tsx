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
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={inputId} size="sm">{label}</Label>}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            "w-full resize-y border-b-2 bg-transparent pb-2.5 pt-1 text-text placeholder:text-text-tertiary outline-none transition-all duration-300 ease-architectural",
            error ? "border-red-400 focus:border-red-500" : "border-border-light focus:border-text-primary",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {error && <p id={`${inputId}-error`} className="text-caption text-red-500 mt-1" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-caption text-text-tertiary mt-1">{hint}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";