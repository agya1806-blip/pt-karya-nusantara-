import { forwardRef, createElement } from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel, HeadingSize, FontWeight, Tracking } from "./types";

interface HeadingProps {
  level?: HeadingLevel;
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: FontWeight;
  tracking?: Tracking;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: "text-body-sm",
  sm: "text-body",
  md: "text-heading-sm",
  lg: "text-heading",
  xl: "text-heading-lg",
  "2xl": "text-heading-xl",
  "3xl": "text-display-sm",
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
  ({ as: level = "h2", size = "lg", weight = "medium", tracking = "tight", className, children, ...rest }, ref) => {
    return createElement(
      level,
      { ref, className: cn("text-text-primary leading-snug", sizeStyles[size], weightStyles[weight], trackingStyles[tracking], className), ...rest },
      children,
    );
  },
);
Heading.displayName = "Heading";