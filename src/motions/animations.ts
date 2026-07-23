import type { TargetAndTransition, Transition, Variants } from "framer-motion";

export const transitionDefaults: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

export const reducedMotionTransition: Transition = {
  duration: 0.01,
};

export function createAnimation(
  hidden: TargetAndTransition,
  visible: TargetAndTransition,
  transition?: Transition,
): Variants {
  return {
    hidden: { ...hidden },
    visible: {
      ...visible,
      transition: {
        ...transitionDefaults,
        ...transition,
      },
    },
  };
}

export const hoverScale = {
  scale: 1.02,
  transition: transitionDefaults,
};

export const hoverLift = {
  y: -4,
  transition: transitionDefaults,
};

export const tapScale = {
  scale: 0.98,
};

export const imageZoom: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const reveal: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
