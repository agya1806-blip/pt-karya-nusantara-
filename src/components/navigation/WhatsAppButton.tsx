"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phone,
  message = "Halo PT Karya Nusantara Realty, saya tertarik untuk berkonsultasi mengenai proyek arsitektur.",
  className,
}: WhatsAppButtonProps) {
  const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bg-[#25D366] text-white hover:bg-[#20BD5A]",
        className,
      )}
      aria-label="Hubungi via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
