"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/useLockBody";

type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-screen",
  },
  right: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-screen",
  },
  top: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-screen",
  },
  bottom: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-screen",
  },
};

const slideVariants: Record<
  DrawerSide,
  { hidden: Record<string, string | number>; visible: Record<string, string | number> }
> = {
  left: { hidden: { x: "-100%" }, visible: { x: 0 } },
  right: { hidden: { x: "100%" }, visible: { x: 0 } },
  top: { hidden: { y: "-100%" }, visible: { y: 0 } },
  bottom: { hidden: { y: "100%" }, visible: { y: 0 } },
};

export function Drawer({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  children,
  className,
}: DrawerProps) {
  useLockBody(open);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const sideClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "left-0 top-0 w-full",
    bottom: "left-0 bottom-0 w-full",
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-brand-900/60" onClick={onClose} />
          <motion.div
            className={cn(
              "absolute bg-surface shadow-elevation-5",
              sideClasses[side],
              sizeClasses[side][size],
              className,
            )}
            variants={slideVariants[side]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-border-default px-6 py-4">
                <h2 className="text-lg font-medium text-text-primary">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded p-1 text-text-secondary transition-colors duration-300 ease-architectural hover:text-text-primary"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
