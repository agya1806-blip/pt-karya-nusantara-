"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLockBody, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/sections/types";

interface FullscreenViewerProps {
  images: MediaImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  loop?: boolean;
  showThumbnails?: boolean;
}

export function FullscreenViewer({ images, currentIndex, isOpen, onClose, onNavigate, loop = true, showThumbnails = true }: FullscreenViewerProps) {
  const reducedMotion = useReducedMotion();
  useLockBody(isOpen);

  const navigate = useCallback((direction: "prev" | "next") => {
    const next = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (next < 0) { if (loop) onNavigate?.(images.length - 1); return; }
    if (next >= images.length) { if (loop) onNavigate?.(0); return; }
    onNavigate?.(next);
  }, [currentIndex, images.length, loop, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, navigate]);

  if (!images[currentIndex]) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen viewer"
        >
          <button onClick={onClose} className="absolute right-6 top-6 z-20 p-2 text-white/70 hover:text-white transition-colors" aria-label="Close viewer">
            <X className="h-6 w-6" />
          </button>

          <div className="relative flex h-full items-center justify-center">
            {images.length > 1 && (
              <button onClick={() => navigate("prev")} className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Previous">
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={reducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? {} : { opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="relative h-full w-full"
              >
                <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fill className="object-contain" sizes="100vw" priority />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <button onClick={() => navigate("next")} className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Next">
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {showThumbnails && images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 overflow-x-auto px-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate?.(idx)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    idx === currentIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-75"
                  )}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}

          <div className="absolute bottom-6 left-6 z-10">
            <span className="rounded-full bg-white/10 px-3 py-1 text-body-xs text-white/70">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
