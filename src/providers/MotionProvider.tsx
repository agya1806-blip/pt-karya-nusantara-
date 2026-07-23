"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Lenis as LenisReact } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useRef } from "react";

interface MotionContextValue {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue | null>(null);

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-reduced-motion",
      String(reducedMotion),
    );
  }, [reducedMotion]);

  const value = useMemo<MotionContextValue>(
    () => ({ reducedMotion }),
    [reducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>
      <LenisReact
        ref={lenisRef}
        root
        options={{
          duration: reducedMotion ? 0 : 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: !reducedMotion,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        }}
      >
        {children}
      </LenisReact>
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
