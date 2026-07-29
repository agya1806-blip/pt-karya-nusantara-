"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHoverTransition } from "@/lib/animation";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered" | "glass";
  hover?: "none" | "lift" | "glow" | "tilt";
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "section";
  onClick?: () => void;
}

const variantStyles = {
  default: "bg-surface border border-gold-500/5",
  elevated: "bg-surface shadow-elevation-2 hover:shadow-elevation-4",
  bordered: "bg-surface border-2 border-gold-500/10",
  glass: "bg-surface-glass backdrop-blur-md border border-white/10",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-4 md:p-6",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

const hoverStyles = {
  none: "",
  lift: "hover:-translate-y-1",
  glow: "hover:shadow-luxury hover:shadow-gold-500/10",
  tilt: "",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      hover = "none",
      padding = "md",
      as: Component = "div",
      onClick,
    },
    ref,
  ) => {
    const isTilt = hover === "tilt";

    const content = (
      <Component
        ref={ref as any}
        onClick={onClick}
        className={cn(
          "group relative rounded-2xl transition-all duration-500 ease-luxury",
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles[hover],
          onClick && "cursor-pointer",
          className,
        )}
      >
        {children}
      </Component>
    );

    if (isTilt) {
      return (
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={cardHoverTransition}
          className="perspective-1000"
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2 }}
            transition={cardHoverTransition}
            style={{ transformStyle: "preserve-3d" }}
          >
            {content}
          </motion.div>
        </motion.div>
      );
    }

    return content;
  },
);

Card.displayName = "Card";

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 space-y-1", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex items-center gap-4 pt-4 border-t border-gold-500/5", className)}>
      {children}
    </div>
  );
}
