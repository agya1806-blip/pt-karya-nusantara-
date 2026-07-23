"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownItem {
  label: string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}

type DropdownAlign = "start" | "end";

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: DropdownAlign;
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  align = "start",
  className,
}: DropdownProps) {
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
        className="inline-flex items-center gap-1"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "absolute z-dropdown mt-1 min-w-[10rem] rounded-lg border border-border-default bg-surface py-1 shadow-elevation-4",
              align === "start" ? "left-0" : "right-0",
              className,
            )}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            {items.map((item) => (
              <button
                key={item.value ?? item.label}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                disabled={item.disabled}
                className={cn(
                  "flex w-full items-center px-4 py-2 text-left text-body-sm leading-relaxed transition-colors duration-150",
                  item.disabled
                    ? "cursor-not-allowed text-text-muted"
                    : "text-text-primary hover:bg-surface-secondary",
                )}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
