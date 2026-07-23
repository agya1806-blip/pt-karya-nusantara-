"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  src?: string;
  text?: string;
  size?: LogoSize;
  href?: string;
  mono?: boolean;
  className?: string;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: "h-6",
  md: "h-8",
  lg: "h-10",
  xl: "h-14",
};

const textSizeClasses: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Logo({
  src,
  text,
  size = "md",
  href,
  mono,
  className,
}: LogoProps) {
  const content = src ? (
    <div className={cn("relative", sizeClasses[size])}>
      <Image
        src={src}
        alt={text ?? "Logo"}
        width={0}
        height={0}
        sizes="100vw"
        className={cn(
          "h-full w-auto object-contain",
          mono && "grayscale",
        )}
      />
    </div>
  ) : (
    <span
      className={cn(
        "font-serif font-light tracking-tight text-text-primary",
        textSizeClasses[size],
        mono && "font-mono",
      )}
    >
      {text}
    </span>
  );

  const wrapperClass = cn("inline-flex items-center", className);

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
