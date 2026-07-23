"use client";

import { Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialSharingProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

const platforms = [
  { id: "linkedin", icon: Linkedin, label: "LinkedIn", getUrl: (u: string, t: string) => `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { id: "twitter", icon: Twitter, label: "X (Twitter)", getUrl: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { id: "facebook", icon: Facebook, label: "Facebook", getUrl: (u: string) => `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: "email", icon: Mail, label: "Email", getUrl: (u: string, t: string, d?: string) => `mailto:?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(d || t)}%0A%0A${encodeURIComponent(u)}` },
];

export function SocialSharing({ url, title = "Check this out", description, className, compact = false }: SocialSharingProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className={cn("flex items-center gap-2", className)} role="group" aria-label="Share on social media">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const href = platform.id === "email"
          ? platform.getUrl(shareUrl, title, description)
          : platform.getUrl(shareUrl, title);

        return (
          <a
            key={platform.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center transition-colors",
              compact
                ? "h-9 w-9 rounded-full border border-border text-text-muted hover:border-text-muted hover:text-text"
                : "gap-2 rounded-lg border border-border px-4 py-2 text-body-sm text-text-secondary hover:border-text-muted hover:text-text"
            )}
            aria-label={platform.label}
          >
            <Icon className="h-4 w-4" />
            {!compact && <span className="hidden sm:inline">{platform.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
