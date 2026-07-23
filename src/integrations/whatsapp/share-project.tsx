"use client";

import { Share2 } from "lucide-react";
import { openWhatsApp, generateWhatsAppMessage } from "./message-generator";

interface ShareProjectProps {
  phoneNumber: string;
  projectTitle: string;
  projectUrl: string;
  label?: string;
  className?: string;
}

export function ShareProject({ phoneNumber, projectTitle, projectUrl, label = "Share via WhatsApp", className }: ShareProjectProps) {
  const handleClick = () => {
    const message = generateWhatsAppMessage("share", { projectTitle, projectUrl });
    openWhatsApp(phoneNumber, message);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-body-sm text-text-secondary hover:text-text transition-colors ${className || ""}`}
      aria-label={label}
    >
      <Share2 className="h-4 w-4" />
      {label}
    </button>
  );
}
