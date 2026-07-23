"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ThemeMode, ThemeContextValue } from "@/types";
import { THEME_STORAGE_KEY, THEME_ATTRIBUTE, THEME_TRANSITION_DURATION } from "@/constants";

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  attribute?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultMode = "light",
  attribute = THEME_ATTRIBUTE,
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setModeState(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute(attribute, mode);
    localStorage.setItem(storageKey, mode);

    const transitionMs = THEME_TRANSITION_DURATION;
    root.style.transition = `background-color ${transitionMs}ms ease, color ${transitionMs}ms ease`;
    const timer = setTimeout(() => {
      root.style.transition = "";
    }, transitionMs);
    return () => clearTimeout(timer);
  }, [mode, mounted, attribute, storageKey]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggle,
      isDark: mode === "dark",
      isLight: mode === "light",
    }),
    [mode, setMode, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
