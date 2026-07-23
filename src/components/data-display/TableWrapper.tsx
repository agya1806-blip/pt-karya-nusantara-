import { cn } from "@/lib/utils";
import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

interface TableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  caption?: string;
}

const TableWrapper = forwardRef<HTMLDivElement, TableWrapperProps>(
  ({ className, caption, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full overflow-x-auto", className)} {...props}>
        <table className="w-full caption-bottom">
          {caption && (
            <caption className="text-caption text-text-muted mt-2 text-left">
              {caption}
            </caption>
          )}
          {children}
        </table>
      </div>
    );
  },
);
TableWrapper.displayName = "TableWrapper";

const TableHead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return <thead ref={ref} className={cn("bg-surface-muted", className)} {...props} />;
});
TableHead.displayName = "TableHead";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn("divide-y divide-border-muted", className)} {...props} />
  );
});
TableBody.displayName = "TableBody";

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors duration-300 hover:bg-surface-muted",
          className,
        )}
        {...props}
      />
    );
  },
);
TableRow.displayName = "TableRow";

const TableHeader = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "text-left text-caption tracking-widest text-text-muted font-medium px-4 py-3",
        className,
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("px-4 py-3 text-body-sm text-text-secondary", className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

export {
  TableWrapper,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
};
