import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { TextElement } from "./types";

interface TextProps {
  as?: TextElement;
  className?: string;
  children?: React.ReactNode;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = "p", className, children, ...rest }, ref) => {
    return (
      <Tag ref={ref as any} className={cn("text-text", className)} {...rest}>
        {children}
      </Tag>
    );
  },
);
Text.displayName = "Text";