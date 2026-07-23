import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type SpacerAxis = "vertical" | "horizontal";

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize;
  axis?: SpacerAxis;
}

const sizeClasses: Record<SpacerSize, Record<SpacerAxis, string>> = {
  xs: { vertical: "h-2", horizontal: "w-2" },
  sm: { vertical: "h-4", horizontal: "w-4" },
  md: { vertical: "h-8", horizontal: "w-8" },
  lg: { vertical: "h-12", horizontal: "w-12" },
  xl: { vertical: "h-16", horizontal: "w-16" },
  "2xl": { vertical: "h-20", horizontal: "w-20" },
  "3xl": { vertical: "h-24", horizontal: "w-24" },
  "4xl": { vertical: "h-28", horizontal: "w-28" },
};

const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", axis = "vertical", ...props }, ref) => {
    return <div ref={ref} aria-hidden="true" className={cn(sizeClasses[size][axis], className)} {...props} />;
  },
);
Spacer.displayName = "Spacer";

export { Spacer };
