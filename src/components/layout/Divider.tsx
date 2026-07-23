import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "default" | "muted" | "light";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
}

const variantClasses: Record<DividerVariant, string> = {
  default: "border-border",
  muted: "border-border-muted",
  light: "border-border/30",
};

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "default", label, ...props }, ref) => {
    if (label) {
      return (
        <div className={cn("flex items-center", className)} role="separator" aria-orientation={orientation}>
          <div className={cn("flex-1 border-t", variantClasses[variant])} />
          <span className="mx-4 text-text-muted text-sm whitespace-nowrap">{label}</span>
          <div className={cn("flex-1 border-t", variantClasses[variant])} />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn(
          orientation === "horizontal" ? "w-full border-t" : "h-full border-l self-stretch",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

export { Divider };
