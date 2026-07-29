"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-white shadow-luxury shadow-gold-500/20 transition-all duration-300 hover:bg-gold-600 hover:shadow-luxury-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
