"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/animation";
import { useScroll } from "@/hooks";
import { NAV_HEIGHT } from "@/constants";
import { GlobalSearch } from "@/search";
import type { SearchResult, SearchSuggestion } from "@/search";

interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  links?: NavbarLink[];
  items?: NavbarLink[];
  transparent?: boolean;
  variant?: "default" | "transparent";
  className?: string;
}

export function Navbar({
  logo,
  links,
  transparent = false,
  variant = "default",
  className,
}: NavbarProps) {
  const navLinks = links ?? [];
  const isTransparent = transparent || variant === "transparent";
  const { isScrolled } = useScroll(NAV_HEIGHT * 0.5);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSelectResult = useCallback((result: SearchResult) => {
    setSearchOpen(false);
    if (result.url) window.location.href = result.url;
  }, []);

  const handleSelectSuggestion = useCallback((suggestion: SearchSuggestion) => {
    setSearchOpen(false);
  }, []);

  const projects: SearchResult[] = [
    { id: "1", title: "The Sky Villa", description: "Luxury villa in Bali", category: "Residential", entity: "portfolio", url: "/portfolio/the-villa", matches: [] },
    { id: "2", title: "Sudirman Tower", description: "Commercial tower in Jakarta", category: "Commercial", entity: "portfolio", url: "/portfolio/sudirman-tower", matches: [] },
    { id: "3", title: "Nusantara Resort", description: "Beachfront resort in Lombok", category: "Hospitality", entity: "portfolio", url: "/portfolio/nusantara-resort", matches: [] },
    { id: "4", title: "Green Valley Estate", description: "Master planned community in Bandung", category: "Master Planning", entity: "portfolio", url: "/portfolio/green-valley", matches: [] },
  ];

  const suggestions: SearchSuggestion[] = [
    { text: "Residential Architecture", type: "trending" },
    { text: "View Our Portfolio", type: "trending" },
    { text: "Book a Consultation", type: "trending" },
  ];

  const filteredResults = searchQuery
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-navbar transition-all duration-500 ease-architectural",
          !isTransparent || isScrolled
            ? "bg-surface/95 backdrop-blur-md shadow-elevation-1 border-b border-gold-500/10"
            : "bg-transparent",
          className,
        )}
      >
        <div className="container-site flex h-20 items-center justify-between">
          <div className="flex-shrink-0">{logo}</div>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-5 py-2.5 text-caption tracking-widest font-medium uppercase transition-colors duration-300",
                  link.active
                    ? "text-text"
                    : "text-text-secondary hover:text-text",
                )}
              >
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.04 }}
                  transition={springs.subtle}
                >
                  {link.label}
                </motion.span>
                {link.active && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-text"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="ml-3 flex items-center gap-2 rounded-lg border border-border-light/60 px-4 py-2.5 text-caption text-text-secondary uppercase tracking-widest transition-all duration-300 hover:border-gold-500/30 hover:text-text"
              aria-label="Open search"
            >
              <Search size={14} />
              <span className="hidden lg:inline">Cari</span>
              <kbd className="hidden items-center gap-0.5 rounded border border-border-light px-1.5 py-0.5 text-body-xs text-text-tertiary md:flex">
                <Command size={11} />K
              </kbd>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex items-center justify-center rounded-lg p-2.5 text-text-secondary transition-colors duration-300 hover:bg-surface-muted/50 hover:text-text md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border-light bg-surface/95 backdrop-blur-md md:hidden"
            >
              <div className="container-site space-y-1 pb-8 pt-6">
                <button
                  type="button"
                  onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-body-lg font-light tracking-tight text-text-secondary transition-colors duration-300 hover:text-text hover:bg-surface-muted/50"
                >
                  <Search size={18} />
                  Cari
                </button>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3.5 text-body-lg font-light tracking-tight transition-colors duration-300",
                      link.active
                        ? "text-text bg-surface-muted"
                        : "text-text-secondary hover:text-text hover:bg-surface-muted/50",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <GlobalSearch
        results={filteredResults}
        suggestions={suggestions}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        onSelectResult={handleSelectResult}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </>
  );
}