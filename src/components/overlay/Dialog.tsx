"use client";

import { cn } from "@/lib/utils";
import { Modal } from "./Modal";

type DialogVariant = "default" | "danger";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  className,
}: DialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={title}
      className={className}
    >
      <p className="text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-border-default bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-300 ease-architectural hover:bg-surface-secondary"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium text-text-inverse transition-colors duration-300 ease-architectural",
            variant === "danger"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gold-500 hover:bg-gold-600",
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
