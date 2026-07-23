import type { Variants, Transition, TargetAndTransition } from "framer-motion";

export type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideIn" | "stagger";

export interface MotionOptions {
  variant?: AnimationVariant;
  transition?: Transition;
  delay?: number;
  duration?: number;
  ease?: "easeOut" | "easeInOut" | "easeIn" | "linear" | [number, number, number, number];
}

export interface StaggerOptions {
  staggerChildren?: number;
  delayChildren?: number;
}

export interface ScrollAnimationOptions {
  once?: boolean;
  amount?: "some" | "all" | number;
}

export interface MotionVariants {
  fadeIn: Variants;
  fadeInUp: Variants;
  fadeInDown: Variants;
  fadeInLeft: Variants;
  fadeInRight: Variants;
  scaleIn: Variants;
  slideIn: Variants;
  stagger: Variants;
}

export type AnimationControls = TargetAndTransition;
