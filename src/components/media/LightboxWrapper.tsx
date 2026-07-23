"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLockBody } from "@/hooks/useLockBody";

interface LightboxWrapperProps {
  open: boolean;
  onClose: () => void;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
  className?: string;
}

export function LightboxWrapper({
  open,
  onClose,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  children,
  className,
}: LightboxWrapperProps) {
  useLockBody(open);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-modal flex items-center justify-center bg-black/90",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${totalCount}`}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors duration-300 ease-architectural hover:bg-black/70"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-300 ease-architectural hover:bg-black/70"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <div className="flex max-h-[90vh] max-w-[90vw] items-center justify-center">
        {children}
      </div>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-300 ease-architectural hover:bg-black/70"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-body-sm text-white">
        {currentIndex + 1} / {totalCount}
      </div>
    </div>,
    document.body,
  );
}
