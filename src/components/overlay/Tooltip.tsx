"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45",
  bottom: "-top-1 left-1/2 -translate-x-1/2 rotate-45",
  left: "-right-1 top-1/2 -translate-y-1/2 rotate-45",
  right: "-left-1 top-1/2 -translate-y-1/2 rotate-45",
};

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 300,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number>(0);

  function handleMouseEnter() {
    timerRef.current = window.setTimeout(() => setVisible(true), delay);
  }

  function handleMouseLeave() {
    window.clearTimeout(timerRef.current);
    setVisible(false);
  }

  function handleFocus() {
    setVisible(true);
  }

  function handleBlur() {
    setVisible(false);
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={cn(
              "pointer-events-none absolute z-tooltip whitespace-nowrap rounded-md bg-brand-800 px-2.5 py-1.5 text-body-sm text-text-inverse shadow-elevation-3",
              placementClasses[placement],
              className,
            )}
            initial={{ opacity: 0, y: placement === "top" || placement === "bottom" ? 4 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "top" || placement === "bottom" ? 4 : 0 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
          >
            {content}
            <span
              className={cn(
                "absolute h-2 w-2 bg-brand-800",
                arrowClasses[placement],
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
