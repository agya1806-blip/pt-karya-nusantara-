"use client";

import { motion } from "framer-motion";

export default function RootLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface"
      role="status"
      aria-label="Memuat"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-gold-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <span className="text-body-sm font-medium tracking-[0.2em] text-text-muted uppercase">
            Memuat
          </span>
        </motion.div>
      </div>
    </div>
  );
}
