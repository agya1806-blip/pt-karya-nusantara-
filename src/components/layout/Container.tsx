import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: "div" | "section" | "main" | "article" | "header" | "footer" | "nav" | "aside";
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", as: Tag = "div", children, ...props }, ref) => {
    return (
      <Tag ref={ref} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)} {...props}>
        {children}
      </Tag>
    );
  },
);
Container.displayName = "Container";

export { Container };
