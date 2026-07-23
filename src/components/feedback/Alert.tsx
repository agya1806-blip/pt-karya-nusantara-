"use client";

import { cn } from "@/lib/utils";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
  icon?: LucideIcon;
}

const variantIcons: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className,
  icon: Icon,
}: AlertProps) {
  const IconComponent = Icon ?? variantIcons[variant];
  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 rounded-lg border border-border-default bg-surface p-4",
        className,
      )}
    >
      <IconComponent
        className="mt-0.5 h-5 w-5 shrink-0 text-text-primary"
        aria-hidden="true"
      />
      <div className="flex-1">
        {title && (
          <p className="text-sm font-medium text-text-primary">{title}</p>
        )}
        <div className="text-sm leading-relaxed text-text-secondary">
          {children}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 rounded p-1 text-text-secondary opacity-70 transition-opacity duration-300 ease-architectural hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
