"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: () => void;
}

export function useIntersectionObserver({ threshold = 0.1, rootMargin = "0px", triggerOnce = false, onIntersect }: UseIntersectionObserverProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) {
          if (!triggerOnce) setIsIntersecting(false);
          return;
        }
        setIsIntersecting(true);
        onIntersect?.();
        if (triggerOnce) observer.unobserve(el);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, onIntersect]);

  return { ref, isIntersecting };
}
