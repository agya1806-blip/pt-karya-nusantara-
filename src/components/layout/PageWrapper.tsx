import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  offsetNav?: boolean;
}

const PageWrapper = forwardRef<HTMLElement, PageWrapperProps>(
  ({ className, offsetNav = true, children, ...props }, ref) => {
    return (
      <main ref={ref} className={cn("flex-1", offsetNav && "pt-20 md:pt-24", className)} {...props}>
        {children}
      </main>
    );
  },
);
PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
