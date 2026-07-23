import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
type GridGap = "none" | "sm" | "md" | "lg" | "xl";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  gap?: GridGap;
}

const colsClasses: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  12: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12",
};

const gapClasses: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = "md", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("grid", colsClasses[cols], gapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  },
);
Grid.displayName = "Grid";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: GridCols;
}

const colSpanClasses: Record<GridCols, string> = {
  1: "col-span-1",
  2: "col-span-1 sm:col-span-2",
  3: "col-span-1 lg:col-span-3",
  4: "col-span-1 sm:col-span-2 lg:col-span-4",
  5: "col-span-1 lg:col-span-5",
  6: "col-span-1 sm:col-span-2 lg:col-span-6",
  12: "col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-12",
};

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(colSpan !== undefined && colSpanClasses[colSpan], className)} {...props}>
        {children}
      </div>
    );
  },
);
GridItem.displayName = "GridItem";

export { Grid, GridItem };
