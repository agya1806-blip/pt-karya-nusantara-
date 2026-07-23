"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  label?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, id, className, checked, ...rest }, ref) => {
    return (
      <label className={cn("inline-flex items-center gap-2.5 cursor-pointer group", className)}>
        <span className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ease-luxury">
          <input ref={ref} type="checkbox" id={id} role="switch" checked={checked} className="peer sr-only" {...rest} />
          <span className={cn(
            "absolute inset-0 rounded-full transition-colors duration-300 ease-luxury",
            checked ? "bg-neutral-900" : "bg-neutral-300",
          )} aria-hidden="true" />
          <span className={cn(
            "relative z-10 inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-luxury",
            checked && "translate-x-4",
          )} aria-hidden="true" />
        </span>
        {label && <span className="text-sm text-text">{label}</span>}
      </label>
    );
  },
);
Switch.displayName = "Switch";