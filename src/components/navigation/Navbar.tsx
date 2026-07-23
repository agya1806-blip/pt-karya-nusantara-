"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks";
import { NAV_HEIGHT } from "@/constants";

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

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-navbar transition-all duration-500 ease-architectural",
        !isTransparent || isScrolled
          ? "bg-surface/95 backdrop-blur-md shadow-elevation-1"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <div className="flex-shrink-0">{logo}</div>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-4 py-2 text-body-sm font-medium tracking-tight transition-all duration-300",
                link.active
                  ? "text-text"
                  : "text-text-secondary hover:text-text hover:bg-surface-muted/50",
              )}
            >
              {link.label}
              {link.active && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-x-4 -bottom-0.5 h-px bg-text"
                />
              )}
            </Link>
          ))}
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
            <div className="container-site space-y-1 pb-6 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-body-lg font-light tracking-tight transition-colors duration-300",
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
  );
}
