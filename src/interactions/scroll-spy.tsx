"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollSpyProps {
  sectionIds: string[];
  offset?: number;
  onChange?: (activeId: string) => void;
  children?: (activeId: string) => React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function ScrollSpy({ sectionIds, offset = 100, onChange, children }: ScrollSpyProps) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + offset;
    let current = sectionIds[0] || "";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        current = id;
      }
    }

    if (current !== activeId) {
      setActiveId(current);
      onChange?.(current);
    }
  }, [sectionIds, offset, activeId, onChange]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return children?.(activeId) ?? null;
}
