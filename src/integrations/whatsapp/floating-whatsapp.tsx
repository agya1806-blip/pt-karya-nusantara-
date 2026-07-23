"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { openWhatsApp, generateWhatsAppMessage } from "./message-generator";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
  position?: "right" | "left";
  tooltip?: string;
}

export function FloatingWhatsApp({ phoneNumber, message = "Hi, I would like to know more about your services.", position = "right", tooltip = "Chat with us" }: FloatingWhatsAppProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => openWhatsApp(phoneNumber, message);

  return (
    <div className={`fixed bottom-6 z-40 flex items-center gap-3 ${position === "right" ? "right-6" : "left-6"}`}>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: position === "right" ? 10 : -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: position === "right" ? 10 : -10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 shadow-luxury"
          >
            <span className="text-body-sm text-text whitespace-nowrap">{tooltip}</span>
            <ChevronRight className="h-3 w-3 text-text-muted" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxury-lg hover:shadow-luxury-xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>
    </div>
  );
}
