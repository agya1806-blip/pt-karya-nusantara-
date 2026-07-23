"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Label } from "./Label";

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, id, className, options, placeholder, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={inputId} size="sm">{label}</Label>}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              "w-full appearance-none border-b-2 bg-transparent pb-2.5 pt-1 pr-8 text-text outline-none transition-all duration-300 ease-architectural",
              error ? "border-red-400 focus:border-red-500" : "border-border-light focus:border-text-primary",
              className,
            )}
            aria-invalid={error ? true : undefined}
            {...rest}
          >
            {placeholder && <option value="" disabled className="text-text-tertiary">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" aria-hidden="true" />
        </div>
        {error && <p id={`${inputId}-error`} className="text-caption text-red-500 mt-1" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-caption text-text-tertiary mt-1">{hint}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";