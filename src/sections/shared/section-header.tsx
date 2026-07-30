import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  accent?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
  accent = true,
}: SectionHeaderProps) {
  return (
    <Fade direction="up" className={cn(className)}>
      {label && (
        <span className="mb-5 block text-overline tracking-widest text-text-tertiary">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-display font-light leading-tight tracking-tight text-text-primary",
          align === "center" && "mx-auto max-w-3xl text-center",
          align === "right" && "ml-auto text-right",
        )}
      >
        {title}
      </h2>
      {accent && (
        <span
          className={cn(
            "mt-4 block accent-line",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
          )}
        />
      )}
      {description && (
        <p
          className={cn(
            "mt-6 text-body-lg text-text-secondary leading-relaxed",
            align === "center" && "mx-auto max-w-2xl text-center",
            align === "right" && "ml-auto text-right",
          )}
        >
          {description}
        </p>
      )}
    </Fade>
  );
}
