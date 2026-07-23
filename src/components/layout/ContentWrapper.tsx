import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  prose?: boolean;
}

const ContentWrapper = forwardRef<HTMLDivElement, ContentWrapperProps>(
  ({ className, prose = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-3xl", prose && "prose prose-lg", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ContentWrapper.displayName = "ContentWrapper";

export { ContentWrapper };
