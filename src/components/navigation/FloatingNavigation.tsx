"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingNavigationProps {
  threshold?: number;
  className?: string;
}

export function FloatingNavigation({
  threshold = 300,
  className,
}: FloatingNavigationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 flex flex-col gap-3 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-text text-text-inverse shadow-elevation-4 transition-all duration-300 hover:scale-105"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
