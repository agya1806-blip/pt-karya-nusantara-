"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface DatePickerWrapperProps {
  id?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export const DatePickerWrapper = forwardRef<HTMLInputElement, DatePickerWrapperProps>(
  ({ id, className, label, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-text">{label}</label>}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
          <input
            ref={ref}
            id={inputId}
            type="date"
            className={cn(
              "w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-3 text-text outline-none transition-colors duration-300 ease-luxury focus:border-neutral-900 [color-scheme:light]",
              className,
            )}
            {...rest}
          />
        </div>
      </div>
    );
  },
);
DatePickerWrapper.displayName = "DatePickerWrapper";