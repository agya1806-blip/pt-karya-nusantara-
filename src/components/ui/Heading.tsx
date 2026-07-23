import { forwardRef, createElement } from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel, HeadingSize, FontWeight, Tracking } from "./types";

interface HeadingProps {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: FontWeight;
  tracking?: Tracking;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

const weightStyles: Record<FontWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const trackingStyles: Record<Tracking, string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  widest: "tracking-widest",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = "h2", size = "lg", weight = "medium", tracking = "tight", className, children, ...rest }, ref) => {
    return createElement(
      level,
      { ref, className: cn("text-text", sizeStyles[size], weightStyles[weight], trackingStyles[tracking], className), ...rest },
      children,
    );
  },
);
Heading.displayName = "Heading";