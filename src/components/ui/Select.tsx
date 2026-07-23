"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Label } from "./Label";

interface SelectProps {
  label?: string;
  error?: string;
  hint?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEvent<HTMLSelectElement>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, id, className, options, placeholder, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label htmlFor={inputId} size="sm">{label}</Label>}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              "w-full appearance-none border-b bg-transparent pb-2 pt-1 pr-8 text-text outline-none transition-colors duration-300 ease-luxury",
              error ? "border-red-500 focus:border-red-600" : "border-border focus:border-neutral-900",
              className,
            )}
            aria-invalid={error ? true : undefined}
            {...rest}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        </div>
        {error && <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";