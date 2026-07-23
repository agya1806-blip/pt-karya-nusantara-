"use client";

import { useEffect, useState } from "react";
import { NAV_SCROLL_THRESHOLD } from "@/constants";

interface ScrollState {
  y: number;
  direction: "up" | "down";
  isScrolled: boolean;
  isTop: boolean;
}

export function useScroll(threshold = NAV_SCROLL_THRESHOLD): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    direction: "down",
    isScrolled: false,
    isTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? "down" : "up";

      setState({
        y: currentY,
        direction,
        isScrolled: currentY > threshold,
        isTop: currentY === 0,
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
