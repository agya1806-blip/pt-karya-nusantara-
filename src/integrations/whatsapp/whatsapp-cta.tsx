"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openWhatsApp, generateWhatsAppMessage } from "./message-generator";

interface WhatsAppCTAProps {
  phoneNumber: string;
  message?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WhatsAppCTA({ phoneNumber, message, label = "Chat on WhatsApp", variant = "outline", size = "md", className }: WhatsAppCTAProps) {
  const handleClick = () => openWhatsApp(phoneNumber, message || generateWhatsAppMessage("consultation", { name: "", projectType: "" }));

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      <MessageCircle className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
