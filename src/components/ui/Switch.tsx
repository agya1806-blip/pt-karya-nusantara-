"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  label?: string;
  id?: string;
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, id, className, checked, ...rest }, ref) => {
    return (
      <label className={cn("inline-flex items-center gap-3 cursor-pointer group", className)}>
        <span className="relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ease-architectural">
          <input ref={ref} type="checkbox" id={id} role="switch" checked={checked} className="peer sr-only" {...rest} />
          <span className={cn(
            "absolute inset-0 rounded-full transition-colors duration-300 ease-architectural",
            checked ? "bg-text-primary" : "bg-neutral-300 group-hover:bg-neutral-400",
          )} aria-hidden="true" />
          <span className={cn(
            "relative z-10 inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-architectural",
            checked && "translate-x-4",
          )} aria-hidden="true" />
        </span>
        {label && <span className="text-body-sm text-text">{label}</span>}
      </label>
    );
  },
);
Switch.displayName = "Switch";