"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Share2, Download } from "lucide-react";
import { useLockBody, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { ImageZoom } from "./image-zoom";
import type { LightboxImage, LightboxConfig } from "./feature-types";

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  config?: LightboxConfig;
}

export function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate, config = {} }: ImageLightboxProps) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { loop = true, zoomEnabled = true, shareEnabled = true, downloadEnabled = false, showCaption = true, thumbnailPosition = "bottom" } = config;

  useLockBody(isOpen);

  const current = images[currentIndex];

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

  const handleShare = async () => {
    if (typeof navigator.share === "function" && current) {
      await navigator.share({ title: current.caption || "Project Image", url: current.src }).catch(() => {});
    }
  };

  const handleDownload = () => {
    if (!current) return;
    const link = document.createElement("a");
    link.href = current.src;
    link.download = current.caption || "image";
    link.click();
  };

  if (!current) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="flex items-center justify-between px-6 py-4 z-10">
            <div className="flex items-center gap-4">
              <span className="text-body-sm text-white/70">
                {currentIndex + 1} / {images.length}
              </span>
              {showCaption && current.caption && (
                <span className="text-body-sm text-white/50 hidden md:block">{current.caption}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {zoomEnabled && (
                <button onClick={() => setZoomOpen(!zoomOpen)} className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Toggle zoom">
                  <ZoomIn className="h-5 w-5" />
                </button>
              )}
              {shareEnabled && typeof navigator.share === "function" && (
                <button onClick={handleShare} className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Share image">
                  <Share2 className="h-5 w-5" />
                </button>
              )}
              {downloadEnabled && (
                <button onClick={handleDownload} className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Download image">
                  <Download className="h-5 w-5" />
                </button>
              )}
              <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Close lightbox">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4">
            {images.length > 1 && (
              <button onClick={() => navigate("prev")} className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Previous image">
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="relative h-full w-full max-w-5xl max-h-[80vh]"
              >
                {zoomOpen ? (
                  <ImageZoom src={current.src} alt={current.alt} />
                ) : (
                  <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" priority />
                )}
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <button onClick={() => navigate("next")} className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Next image">
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {thumbnailPosition !== "none" && images.length > 1 && (
            <div className="flex justify-center gap-2 px-6 py-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => onNavigate?.(idx)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    idx === currentIndex ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-75"
                  )}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
