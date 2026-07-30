import { forwardRef, createElement } from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel, HeadingSize, FontWeight, Tracking } from "./types";

interface HeadingProps {
  level?: HeadingLevel;
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: FontWeight;
  tracking?: Tracking;
  gold?: boolean;
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

const headingStyles: Partial<Record<HeadingLevel, string>> = {
  h1: "text-display-lg font-serif font-light tracking-tight text-text-primary",
  h2: "text-display font-serif font-light text-text-primary",
  h3: "text-heading-xl font-serif text-text-primary",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: level = "h2", size = "lg", weight = "medium", tracking = "tight", gold, className, children, ...rest }, ref) => {
    return createElement(
      level,
      {
        ref,
        className: cn(
          headingStyles[level],
          !headingStyles[level] && cn("text-text", sizeStyles[size], weightStyles[weight], trackingStyles[tracking]),
          gold && "text-brand-400",
          className,
        ),
        ...rest,
      },
      children,
    );
  },
);
Heading.displayName = "Heading";