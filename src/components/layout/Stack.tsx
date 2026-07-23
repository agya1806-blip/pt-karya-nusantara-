import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type StackDirection = "row" | "col" | "reverse";
type StackAlign = "start" | "end" | "center" | "stretch" | "baseline";
type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type StackWrap = "wrap" | "nowrap" | "reverse";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: StackWrap;
}

const directionClasses: Record<StackDirection, string> = {
  row: "flex-row",
  col: "flex-col",
  reverse: "flex-col-reverse",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
  "3xl": "gap-16",
  "4xl": "gap-20",
};

const wrapClasses: Record<StackWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  reverse: "flex-wrap-reverse",
};

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = "col", align, justify, gap = "md", wrap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          gapClasses[gap],
          wrap && wrapClasses[wrap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Stack.displayName = "Stack";

export { Stack };
