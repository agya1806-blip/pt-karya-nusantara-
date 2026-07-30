import { cn } from "@/lib/utils";

export function focusRing(className?: string) {
  return cn(
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-surface",
    className,
  );
}

export function srOnly(className?: string) {
  return cn("sr-only", className);
}

export function transition(className?: string) {
  return cn("transition-all duration-300 ease-luxury", className);
}

export function visuallyDisabled(className?: string) {
  return cn("opacity-50 pointer-events-none cursor-not-allowed", className);
}

export function truncate(className?: string) {
  return cn("truncate", className);
}

export function safeArea(className?: string) {
  return cn("px-6 py-24", className);
}