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
  links: NavbarLink[];
  transparent?: boolean;
  className?: string;
}

export function Navbar({
  logo,
  links,
  transparent = false,
  className,
}: NavbarProps) {
  const { isScrolled } = useScroll(NAV_HEIGHT * 0.5);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-navbar transition-all duration-300 ease-luxury",
        !transparent || isScrolled
          ? "bg-surface shadow-elevation-2"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <div className="flex-shrink-0">{logo}</div>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-body-sm font-medium tracking-tight transition-colors duration-300",
                link.active
                  ? "text-text"
                  : "text-text-secondary hover:text-text",
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
          className="flex items-center justify-center p-2 text-text-secondary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border-muted bg-surface md:hidden"
          >
            <div className="container-site space-y-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-2 text-body-lg font-light tracking-tight transition-colors duration-300",
                    link.active ? "text-text" : "text-text-secondary",
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
