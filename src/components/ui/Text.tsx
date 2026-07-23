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
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-text",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = "p", size = "md", color = "default", className, children, ...rest }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn(sizeStyles[size], colorStyles[color], className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
Text.displayName = "Text";