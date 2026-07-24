import type { Transition, Variants } from "framer-motion";

export const easings = {
  easeInOut: [0.76, 0, 0.24, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeIn: [0.7, 0, 0.84, 0] as const,
} as const;

export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.5 } as const satisfies Transition,
  gentle: { type: "spring", stiffness: 200, damping: 20, mass: 1 } as const satisfies Transition,
  smooth: { type: "spring", stiffness: 150, damping: 15, mass: 1 } as const satisfies Transition,
  subtle: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 } as const satisfies Transition,
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.2,
} as const;

export function createTransition(duration: number = durations.slow, ease: readonly number[] = easings.easeOut): Transition {
  return { duration, ease: [...ease] as [number, number, number, number] };
}

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.normal, ease: easings.easeInOut } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
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
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: durations.slow, ease: easings.easeInOut } },
  exit: { opacity: 0, y: -12, scale: 0.99, transition: { duration: durations.normal, ease: easings.easeIn } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
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
  stiffness: 250,
  damping: 20,
  mass: 0.8,
};

export const buttonHoverTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 15,
  mass: 0.6,
};
