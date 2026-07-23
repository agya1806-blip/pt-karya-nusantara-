"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { TextReveal } from "@/components/animation/TextReveal";
import { Button } from "@/components/ui/Button";
import type { ButtonAction, MediaItem } from "@/sections/types";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  background: MediaItem;
  actions?: ButtonAction[];
  overlay?: "none" | "gradient" | "solid";
  height?: "sm" | "md" | "lg" | "full";
  align?: "left" | "center" | "right";
  className?: string;
}

const heightClasses = {
  sm: "min-h-[50vh]",
  md: "min-h-[70vh]",
  lg: "min-h-[85vh]",
  full: "min-h-screen",
};

const alignClasses = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function HeroSection({
  title,
  subtitle,
  description,
  background,
  actions,
  overlay = "gradient",
  height = "lg",
  align = "center",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex",
        heightClasses[height],
        alignClasses[align],
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background.src})` }}
        role="img"
        aria-label={background.alt}
      />
      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/30 to-neutral-950/70" />
      )}
      {overlay === "solid" && (
        <div className="absolute inset-0 bg-neutral-950/50" />
      )}
      <div className="container-site relative z-10 flex flex-col justify-center py-24">
        {subtitle && (
          <Fade direction="up" delay={0.1}>
            <span className="mb-6 inline-block text-caption tracking-widest text-neutral-400 uppercase">
              {subtitle}
            </span>
          </Fade>
        )}
        <TextReveal
          text={title}
          className="text-display-xl font-light leading-tight tracking-tight text-white"
          delay={0.2}
        />
        {description && (
          <Fade direction="up" delay={0.4}>
            <p
              className={cn(
                "mt-8 max-w-2xl text-body-lg text-neutral-400 leading-relaxed",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          </Fade>
        )}
        {actions && actions.length > 0 && (
          <Fade direction="up" delay={0.6}>
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-5",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
              )}
            >
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant ?? "primary"}
                  onClick={action.onClick}
                  className={action.variant === "primary" ? "bg-white text-neutral-900 hover:bg-neutral-100" : "border-white/30 text-white hover:bg-white/10"}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
}
