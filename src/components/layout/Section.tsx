import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionVariant = "default" | "dark" | "muted";
type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  container?: boolean;
  accent?: boolean;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-surface",
  dark: "bg-surface-secondary",
  muted: "bg-surface-tertiary",
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-12",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-28 md:py-36",
  none: "py-0",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", spacing = "lg", container = false, accent = false, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(variantClasses[variant], spacingClasses[spacing], accent && "border-t border-brand-400/20", className)} {...props}>
        {container ? <Container>{children}</Container> : children}
      </section>
    );
  },
);
Section.displayName = "Section";

export { Section };
