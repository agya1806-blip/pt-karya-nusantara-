import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionVariant = "default" | "muted" | "dark" | "accent";
type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  container?: boolean;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-surface",
  muted: "bg-surface-secondary",
  dark: "bg-surface-dark text-text-inverse",
  accent: "bg-brand-800 text-text-inverse",
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-16",
  md: "py-20 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
  none: "py-0",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", spacing = "lg", container = false, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(variantClasses[variant], spacingClasses[spacing], className)} {...props}>
        {container ? <Container>{children}</Container> : children}
      </section>
    );
  },
);
Section.displayName = "Section";

export { Section };
