import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { CaptionElement, CaptionSize } from "./types";

interface CaptionProps {
  as?: CaptionElement;
  size?: CaptionSize;
  muted?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<CaptionSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
};

export const Caption = forwardRef<HTMLElement, CaptionProps>(
  ({ as: Tag = "span", size = "sm", muted = false, className, children, ...rest }, ref) => {
    return (
      <Tag ref={ref as any} className={cn("leading-relaxed", sizeStyles[size], muted ? "text-text-muted" : "text-text-secondary", className)} {...rest}>
        {children}
      </Tag>
    );
  },
);
Caption.displayName = "Caption";