import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ParagraphSize, TextColor } from "./types";

interface ParagraphProps {
  size?: ParagraphSize;
  color?: TextColor;
  narrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<ParagraphSize, string> = {
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-text",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
};

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ size = "md", color = "default", narrow = false, className, children, ...rest }, ref) => {
    return (
      <p ref={ref} className={cn("leading-relaxed", sizeStyles[size], colorStyles[color], narrow && "max-w-prose", className)} {...rest}>
        {children}
      </p>
    );
  },
);
Paragraph.displayName = "Paragraph";