"use client";

import { useState } from "react";
import {
  LayoutDashboard, FolderOpen, FileText, Image, MessageSquare,
  CalendarCheck, Users, Settings, Bell, BarChart3, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CMSLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  userName?: string;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/cms/dashboard" },
  { icon: FolderOpen, label: "Projects", href: "/cms/projects" },
  { icon: FileText, label: "Blog", href: "/cms/blog" },
  { icon: Image, label: "Media", href: "/cms/media" },
  { icon: MessageSquare, label: "Forms & Leads", href: "/cms/forms" },
  { icon: CalendarCheck, label: "Bookings", href: "/cms/forms/bookings" },
  { icon: Users, label: "Team", href: "/cms/team" },
  { separator: true },
  { icon: Settings, label: "Settings", href: "/cms/settings" },
  { icon: BarChart3, label: "Analytics", href: "/cms/analytics" },
  { icon: Bell, label: "Notifications", href: "/cms/notifications" },
  { separator: true },
  { icon: LogOut, label: "Sign Out", href: "/api/auth/logout" },
];

export function CMSLayout({ children, currentPath = "/cms/dashboard", userName }: CMSLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-surface-muted">
      <aside className={cn(
        "flex flex-col border-r border-border bg-surface transition-all",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="h-8 w-8 rounded-lg bg-text" />
          {sidebarOpen && <span className="text-body-sm font-medium text-text truncate">KNR CMS</span>}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item, i) => {
            if ("separator" in item) return <div key={i} className="my-2 border-t border-border" />;
            const Icon = item.icon!;
            const isActive = currentPath?.startsWith(item.href!);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm transition-colors",
                  isActive ? "bg-surface-muted text-text font-medium" : "text-text-secondary hover:bg-surface-muted hover:text-text"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {sidebarOpen && userName && (
          <div className="border-t border-border p-4">
            <span className="text-body-xs text-text-muted">{userName}</span>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="border-t border-border p-4 text-body-xs text-text-muted hover:text-text transition-colors"
        >
          {sidebarOpen ? "Collapse" : "Expand"}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
