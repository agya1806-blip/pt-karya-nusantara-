import type { Transition, Variants } from "framer-motion";

export const easings = {
  easeInOut: [0.76, 0, 0.24, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeIn: [0.7, 0, 0.84, 0] as const,
} as const;

export const springs = {
  snappy: { type: "spring", stiffness: 350, damping: 28, mass: 0.6 } as const satisfies Transition,
  gentle: { type: "spring", stiffness: 180, damping: 22, mass: 1 } as const satisfies Transition,
  smooth: { type: "spring", stiffness: 120, damping: 18, mass: 1.1 } as const satisfies Transition,
  subtle: { type: "spring", stiffness: 80, damping: 22, mass: 1 } as const satisfies Transition,
} as const;

export const durations = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  slower: 1.0,
  slowest: 1.4,
} as const;

export const viewportMargin = "-48px";

export function createTransition(duration: number = durations.slow, ease: readonly number[] = easings.easeOut): Transition {
  return { duration, ease: [...ease] as [number, number, number, number] };
}

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.normal, ease: easings.easeInOut } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.easeOut } },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.slow, ease: easings.easeOut } },
};

export const slideUpVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { duration: durations.slower, ease: easings.easeOut } },
};

export const clipRevealVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: durations.slower, ease: easings.easeOut } },
};

export const imageRevealVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
  visible: { clipPath: "inset(0 0% 0 0)", scale: 1, transition: { duration: durations.slower, ease: easings.easeOut } },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: durations.slow, ease: easings.easeInOut } },
  exit: { opacity: 0, y: -16, scale: 0.99, transition: { duration: durations.normal, ease: easings.easeIn } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easings.easeOut },
  },
};

export const textRevealWordVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { duration: durations.slow, ease: easings.easeOut } },
};

export const cardHoverTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 24,
  mass: 0.8,
};

export const buttonHoverTransition: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 18,
  mass: 0.6,
};

export const reducedMotionTransition: Transition = {
  duration: 0,
};
