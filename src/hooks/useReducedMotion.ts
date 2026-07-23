"use client";

import { useMotion } from "@/providers";

export function useReducedMotion(): boolean {
  return useMotion().reducedMotion;
}
