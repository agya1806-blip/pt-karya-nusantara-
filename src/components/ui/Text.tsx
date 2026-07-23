import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { TextElement, TextSize, TextColor } from "./types";

interface TextProps {
  as?: TextElement;
  size?: TextSize;
  color?: TextColor;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<TextSize, string> = {
  xs: "text-caption",
  sm: "text-body-sm",
  md: "text-body",
  lg: "text-body-lg",
  xl: "text-body-xl",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-tertiary",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = "p", size = "md", color = "default", className, children, ...rest }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn("leading-relaxed", sizeStyles[size], colorStyles[color], className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
Text.displayName = "Text";