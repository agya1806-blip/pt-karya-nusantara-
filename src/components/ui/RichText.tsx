import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  className?: string;
  children?: React.ReactNode;
}

export const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-neutral max-w-none",
          "prose-headings:text-text prose-headings:font-medium",
          "prose-p:text-text-secondary prose-p:leading-relaxed",
          "prose-a:text-brand-900 prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-text",
          "prose-code:text-text-secondary",
          "prose-blockquote:border-l-gold-500 prose-blockquote:text-text-secondary",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
RichText.displayName = "RichText";