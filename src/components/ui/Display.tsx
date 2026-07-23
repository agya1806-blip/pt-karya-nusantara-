import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { DisplaySize } from "./types";

interface DisplayProps {
  size?: DisplaySize;
  serif?: boolean;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<DisplaySize, string> = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-7xl",
  "2xl": "text-7xl md:text-8xl",
};

export const Display = forwardRef<HTMLElement, DisplayProps>(
  ({ size = "lg", serif = false, as: Tag = "h2", className, children, ...rest }, ref) => {
    return (
      <Tag ref={ref as any} className={cn("text-text font-light tracking-tight", serif && "font-serif", sizeStyles[size], className)} {...rest}>
        {children}
      </Tag>
    );
  },
);
Display.displayName = "Display";