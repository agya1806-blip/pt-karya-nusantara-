import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PricingCardProps {
  name: string;
  price: string | number;
  period: string;
  features: string[];
  highlighted?: boolean;
  href?: string;
  ctaText?: string;
  className?: string;
}

function PricingCard({
  name,
  price,
  period,
  features,
  highlighted,
  href,
  ctaText = "Get Started",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-8 transition-all duration-500 ease-architectural",
        highlighted
          ? "bg-brand-500 text-text-inverse shadow-elevation-5"
          : "bg-surface text-text border border-border-light hover:border-border-default",
        className,
      )}
    >
      <h3 className="text-heading-sm leading-snug">{name}</h3>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-display font-light tracking-tight">{price}</span>
        <span
          className={cn(
            "text-body",
            highlighted ? "text-text-inverse/70" : "text-text-tertiary",
          )}
        >
          /{period}
        </span>
      </div>
      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-body-sm">
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                highlighted ? "text-text-inverse" : "text-brand-500",
              )}
            />
            <span className={cn(highlighted ? "text-text-inverse/90" : "text-text-secondary")}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {href ? (
          <Button asChild>
            <a href={href}>{ctaText}</a>
          </Button>
        ) : (
          <Button>{ctaText}</Button>
        )}
      </div>
    </div>
  );
}

export { PricingCard };
