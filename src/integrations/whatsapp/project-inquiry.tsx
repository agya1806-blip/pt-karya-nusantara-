"use client";

import { MessageCircle } from "lucide-react";
import { openWhatsApp, generateWhatsAppMessage } from "./message-generator";

interface ProjectInquiryProps {
  phoneNumber: string;
  projectTitle: string;
  projectId?: string;
  label?: string;
  className?: string;
}

export function ProjectInquiry({ phoneNumber, projectTitle, label = "Inquiry via WhatsApp", className }: ProjectInquiryProps) {
  const handleClick = () => {
    const message = generateWhatsAppMessage("project-inquiry", { projectTitle });
    openWhatsApp(phoneNumber, message);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-body-sm text-text-secondary hover:text-text transition-colors ${className || ""}`}
      aria-label={label}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </button>
  );
}
