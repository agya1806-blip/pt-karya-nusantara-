"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  initials?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

const textClasses: Record<AvatarSize, string> = {
  sm: "text-body-sm",
  md: "text-body",
  lg: "text-heading-sm",
  xl: "text-heading",
};

export function Avatar({
  src,
  initials,
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full",
          sizeClasses[size],
          className,
        )}
      >
        <Image
          src={src}
          alt={initials ?? "Avatar"}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  if (initials) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-surface-secondary font-light text-text-secondary",
          sizeClasses[size],
          textClasses[size],
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-surface-secondary text-text-secondary",
        sizeClasses[size],
        className,
      )}
    >
      {fallback ?? <User className="h-1/2 w-1/2" />}
    </div>
  );
}
