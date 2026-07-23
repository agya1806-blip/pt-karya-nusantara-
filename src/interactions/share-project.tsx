"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareProjectProps {
  title: string;
  text?: string;
  url?: string;
  label?: string;
  className?: string;
}

export function ShareProjectButton({ title, text, url, label = "Share", className }: ShareProjectProps) {
  const [shared, setShared] = useState(false);

  const handleShare = useCallback(async () => {
    const shareUrl = url || window.location.href;
    const shareData = { title, text: text || title, url: shareUrl };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  }, [title, text, url]);

  return (
    <button
      onClick={handleShare}
      className={cn("flex items-center gap-2 text-body-sm text-text-secondary hover:text-text transition-colors", className)}
      aria-label={shared ? "Link copied" : label}
    >
      {shared ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
      {shared ? "Copied!" : label}
    </button>
  );
}
