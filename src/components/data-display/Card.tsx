import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

type CardVariant = "default" | "muted" | "elevated" | "bordered";
type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
}

function getVariantStyles(variant: CardVariant): string {
  switch (variant) {
    case "muted":
      return "bg-surface-muted";
    case "elevated":
      return "bg-surface shadow-elevation-2 hover:shadow-elevation-4";
    case "bordered":
      return "bg-surface border border-border-light hover:border-border-default";
    default:
      return "bg-surface";
  }
}

function getPaddingStyles(padding: CardPadding): string {
  switch (padding) {
    case "none":
      return "p-0";
    case "sm":
      return "p-4";
    case "md":
      return "p-6";
    case "lg":
      return "p-8";
    case "xl":
      return "p-12";
  }
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          getVariantStyles(variant),
          getPaddingStyles(padding),
          hover && "cursor-pointer transition-all duration-500 ease-architectural hover:-translate-y-0.5",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "wide";
}

function getAspectRatioStyles(aspectRatio: "video" | "square" | "wide"): string {
  switch (aspectRatio) {
    case "video":
      return "aspect-video";
    case "square":
      return "aspect-square";
    case "wide":
      return "aspect-[21/9]";
  }
}

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt, aspectRatio = "video", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden", getAspectRatioStyles(aspectRatio), className)}
        {...props}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  },
);
CardMedia.displayName = "CardMedia";

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(className)} {...props} />;
  },
);
CardBody.displayName = "CardBody";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mt-auto", className)} {...props} />;
  },
);
CardFooter.displayName = "CardFooter";

export { Card, CardMedia, CardBody, CardFooter };
