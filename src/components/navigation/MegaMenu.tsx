"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MegaMenuGroup {
  label: string;
  items: MegaMenuItem[];
}

interface MegaMenuProps {
  trigger: React.ReactNode;
  groups: MegaMenuGroup[];
  className?: string;
}

export function MegaMenu({ trigger, groups, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1 text-body-sm font-medium tracking-tight text-text-secondary transition-colors duration-300 hover:text-text"
      >
        {trigger}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 w-[600px] rounded-lg border border-border-muted bg-surface p-6 shadow-elevation-4"
          >
            <div className="grid grid-cols-2 gap-8">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="mb-3 text-caption font-semibold tracking-widest uppercase text-text-muted">
                    {group.label}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group block rounded-md p-2 transition-colors duration-300 hover:bg-surface-muted"
                        >
                          <span className="text-body-sm font-medium text-text transition-colors duration-300 group-hover:text-text">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 block text-caption leading-relaxed text-text-muted">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
