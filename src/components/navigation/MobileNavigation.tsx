"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks";

interface MobileNavigationLink {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: MobileNavigationLink[];
  logo?: React.ReactNode;
  className?: string;
}

export function MobileNavigation({
  isOpen,
  onClose,
  links,
  logo,
  className,
}: MobileNavigationProps) {
  useLockBody(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-overlay bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "fixed inset-y-0 right-0 z-modal flex w-full max-w-sm flex-col bg-surface shadow-elevation-5",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-border-muted px-6 py-4">
              <div>{logo}</div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center p-2 text-text-secondary transition-colors duration-300 hover:text-text"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block py-3 text-heading-sm font-light tracking-tight transition-colors duration-300",
                        link.active
                          ? "text-text"
                          : "text-text-secondary hover:text-text",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
