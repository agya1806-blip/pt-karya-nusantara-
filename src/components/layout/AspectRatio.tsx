import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative w-full", className)} style={{ aspectRatio: ratio }} {...props}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  },
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
