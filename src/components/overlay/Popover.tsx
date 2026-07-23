"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type PopoverPlacement = "bottom" | "top" | "left" | "right";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}

const placementClasses: Record<PopoverPlacement, string> = {
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export function Popover({
  trigger,
  children,
  placement = "bottom",
  className,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="inline-flex"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "absolute z-dropdown rounded-lg border border-border-default bg-surface p-4 shadow-elevation-4",
              placementClasses[placement],
              className,
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
