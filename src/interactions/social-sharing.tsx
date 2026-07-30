"use client";

import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialSharingProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const platforms = [
  { id: "linkedin", icon: LinkedinIcon, label: "LinkedIn", getUrl: (u: string, t: string) => `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { id: "twitter", icon: TwitterIcon, label: "X (Twitter)", getUrl: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { id: "facebook", icon: FacebookIcon, label: "Facebook", getUrl: (u: string) => `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
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
