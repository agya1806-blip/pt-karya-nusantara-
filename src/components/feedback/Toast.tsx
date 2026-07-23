"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";

type ToastVariant = "info" | "success" | "warning" | "error";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastProps {
  variant?: ToastVariant;
  message: string;
  duration?: number;
  onClose: () => void;
  position?: ToastPosition;
  className?: string;
}

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function Toast({
  variant = "info",
  message,
  duration = 5000,
  onClose,
  position = "top-right",
  className,
}: ToastProps) {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(onClose, 300);
    return () => clearTimeout(timer);
  }, [exiting, onClose]);

  const Icon = variantIcons[variant];
  const visible = entered && !exiting;

  return (
    <div
      className={cn(
        "fixed z-toast flex items-center gap-3 rounded-lg border border-border-default bg-surface p-4 shadow-elevation-4 transition-all duration-300 ease-architectural",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
        positionClasses[position],
        className,
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0 text-text-primary" aria-hidden="true" />
      <p className="flex-1 text-sm leading-relaxed text-text-primary">
        {message}
      </p>
      <button
        onClick={() => setExiting(true)}
        className="shrink-0 rounded p-1 text-text-secondary opacity-70 transition-opacity hover:opacity-100"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
