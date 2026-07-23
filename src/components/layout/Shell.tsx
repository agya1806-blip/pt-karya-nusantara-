import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  sidebarWidth?: string;
  sidebarPosition?: "left" | "right";
}

const Shell = forwardRef<HTMLDivElement, ShellProps>(
  ({ className, sidebar, sidebarWidth = "w-64", sidebarPosition = "left", children, ...props }, ref) => {
    const sidebarContent = sidebar && <aside className={cn("flex-shrink-0", sidebarWidth)}>{sidebar}</aside>;

    return (
      <div ref={ref} className={cn("flex", className)} {...props}>
        {sidebarPosition === "left" && sidebarContent}
        <div className="flex-1 min-w-0">{children}</div>
        {sidebarPosition === "right" && sidebarContent}
      </div>
    );
  },
);
Shell.displayName = "Shell";

export { Shell };
