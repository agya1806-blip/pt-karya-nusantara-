"use client";

import { cn } from "@/lib/utils";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NotificationVariant = "info" | "success" | "warning" | "error";

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface NotificationProps {
  variant?: NotificationVariant;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  onDismiss?: () => void;
  action?: NotificationAction;
  className?: string;
}

const variantIcons: Record<NotificationVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
};

export function Notification({
  variant = "info",
  title,
  message,
  time,
  unread,
  onDismiss,
  action,
  className,
}: NotificationProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border p-4 transition-colors duration-300 ease-architectural",
        unread
          ? "border-border-default bg-surface"
          : "border-transparent bg-surface-secondary",
        className,
      )}
      role="status"
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0 text-text-primary"
        aria-hidden="true"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-sm",
              unread ? "font-medium text-text-primary" : "text-text-secondary",
            )}
          >
            {title}
          </p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 rounded p-0.5 text-text-muted opacity-70 transition-opacity hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">
          {message}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-caption text-text-muted">{time}</span>
          {action && (
            <button
              onClick={action.onClick}
              className="text-caption font-medium text-text-primary underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
