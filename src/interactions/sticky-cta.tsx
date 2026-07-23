"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyCTAProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export function StickyCTA({ children, threshold = 600, className }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn("fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md px-6 py-4", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
