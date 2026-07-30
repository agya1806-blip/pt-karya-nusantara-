"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { TextReveal } from "@/components/animation/TextReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useReducedMotion } from "@/hooks";
import type { ButtonAction } from "@/sections/types";

interface HeroVideoProps {
  title: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  posterSrc?: string;
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

export function HeroVideo({
  title,
  subtitle,
  description,
  videoSrc,
  posterSrc,
  actions,
  overlay = "gradient",
  height = "lg",
  align = "center",
  className,
}: HeroVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex overflow-hidden",
        heightClasses[height],
        alignClasses[align],
        className,
      )}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>
      {overlay === "gradient" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/30 to-brand-800/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-transparent" />
        </>
      )}
      {overlay === "solid" && (
        <div className="absolute inset-0 bg-brand-900/60" />
      )}
      <div className="container-site relative z-10 flex flex-col justify-center py-36">
        {subtitle && (
          <Fade direction="up" delay={0.1}>
            <span className="mb-8 inline-block text-overline tracking-[0.2em] text-gold-300/90">
              {subtitle}
            </span>
          </Fade>
        )}
        <TextReveal
          className="font-serif text-display-xl font-light leading-[0.95] -tracking-[0.03em] text-white"
          delay={0.2}
        >
          {title}
        </TextReveal>
        {description && (
          <Fade direction="up" delay={0.4}>
            <p
              className={cn(
                "mt-8 max-w-xl text-body-lg font-light text-brand-200/80 leading-relaxed tracking-[0.02em]",
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
              {actions.map((action) => {
                const button = (
                  <Button
                    key={action.label}
                    variant={action.variant ?? "primary"}
                    onClick={action.href ? undefined : action.onClick}
                    className={action.variant === "primary" ? "bg-gold-500 text-white hover:bg-gold-600 shadow-luxury-lg shadow-gold-500/15" : "border-gold-500/30 text-gold-300/90 hover:text-gold-300 hover:border-gold-500/60 hover:bg-gold-500/5"}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                );
                if (action.href && !action.onClick) {
                  return <Link key={action.label} href={action.href}>{button}</Link>;
                }
                return button;
              })}
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
}
