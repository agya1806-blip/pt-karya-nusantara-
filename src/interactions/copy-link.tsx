"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyLinkProps {
  url?: string;
  label?: string;
  className?: string;
}

export function CopyLink({ url, label = "Copy Link", className }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [url]);

  return (
    <button
      onClick={handleCopy}
      className={cn("flex items-center gap-2 text-body-sm text-text-secondary hover:text-text transition-colors", className)}
      aria-label={copied ? "Link copied" : label}
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
