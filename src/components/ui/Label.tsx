import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LabelSize } from "./types";

interface LabelProps {
  size?: LabelSize;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

const sizeStyles: Record<LabelSize, string> = {
  sm: "text-body-sm",
  md: "text-body",
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = "sm", required = false, className, children, htmlFor, ...rest }, ref) => {
    return (
      <label ref={ref} htmlFor={htmlFor} className={cn("font-medium tracking-tight text-text", sizeStyles[size], className)} {...rest}>
        {children}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
    );
  },
);
Label.displayName = "Label";