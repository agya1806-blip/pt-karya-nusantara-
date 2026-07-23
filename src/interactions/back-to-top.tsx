"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  threshold?: number;
  position?: "right" | "left";
  className?: string;
}

export function BackToTop({ threshold = 400, position = "right", className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface shadow-luxury hover:shadow-luxury-lg hover:bg-surface-muted transition-all",
            position === "right" ? "right-6" : "left-6",
            className
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-text-secondary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
