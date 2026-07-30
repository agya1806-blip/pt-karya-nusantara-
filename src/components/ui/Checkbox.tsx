"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  label?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, ...rest }, ref) => {
    return (
      <label className={cn("inline-flex items-center gap-3 cursor-pointer group", className)}>
        <span className="relative flex h-5 w-5 items-center justify-center">
          <input ref={ref} type="checkbox" id={id} className="peer sr-only" {...rest} />
          <span className="absolute inset-0 rounded border border-border-light transition-all duration-300 ease-architectural peer-checked:border-text-primary peer-checked:bg-text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 group-hover:border-border-strong" aria-hidden="true" />
          <Check className="relative h-3.5 w-3.5 text-text-inverse opacity-0 transition-opacity duration-300 ease-architectural peer-checked:opacity-100" aria-hidden="true" />
        </span>
        {label && <span className="text-body-sm text-text">{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";