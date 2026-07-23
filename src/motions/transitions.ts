import type { Transition } from "framer-motion";

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fastTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

export const slowTransition: Transition = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  mass: 1,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 1,
};

export const springSnap: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.5,
};

export const staggerTransition = {
  staggerChildren: 0.1,
  delayChildren: 0.2,
};
