"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  label?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, ...rest }, ref) => {
    return (
      <label className={cn("inline-flex items-center gap-2.5 cursor-pointer group", className)}>
        <span className="relative flex h-5 w-5 items-center justify-center">
          <input ref={ref} type="checkbox" id={id} className="peer sr-only" {...rest} />
          <span className="absolute inset-0 rounded border border-border transition-colors duration-300 ease-luxury peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900 peer-focus-visible:ring-offset-2" aria-hidden="true" />
          <Check className="relative h-3.5 w-3.5 text-text-inverse opacity-0 transition-opacity duration-300 ease-luxury peer-checked:opacity-100" aria-hidden="true" />
        </span>
        {label && <span className="text-sm text-text">{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";