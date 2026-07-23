import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ListStyle } from "./types";

interface ListProps {
  as?: "ul" | "ol";
  listStyle?: ListStyle;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
}

const listStyleStyles: Record<ListStyle, string> = {
  disc: "list-disc list-inside",
  decimal: "list-decimal list-inside",
  none: "list-none",
};

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ as: Tag = "ul", listStyle = "none", gap = "gap-2", className, children, ...rest }, ref) => {
    return (
      <Tag ref={ref as any} className={cn("flex flex-col", listStyleStyles[listStyle], gap, className)} {...rest}>
        {children}
      </Tag>
    );
  },
);
List.displayName = "List";

interface ListItemProps {
  className?: string;
  children?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <li ref={ref} className={cn("text-text", className)} {...rest}>
        {children}
      </li>
    );
  },
);
ListItem.displayName = "ListItem";