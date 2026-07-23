"use client";

import { FolderOpen, FileText, MessageSquare, CalendarCheck, Users, TrendingUp } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface StatCardProps { icon: React.ElementType; label: string; value: string; trend?: string; color?: string }
function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-all hover:shadow-luxury">
      <div className="flex items-start justify-between">
        <div>
          <Text size="xs" color="muted" className="font-medium uppercase tracking-wider">{label}</Text>
          <Heading as="p" size="2xl" weight="light" className="mt-2">{value}</Heading>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color || "bg-surface-muted"}`}>
          <Icon className="h-5 w-5 text-text-secondary" />
        </div>
      </div>
      {trend && <div className="mt-4 flex items-center gap-1"><TrendingUp className="h-3 w-3 text-green-600" /><Text size="xs" className="text-green-600">{trend}</Text></div>}
    </div>
  );
}

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <Heading as="h1" size="2xl" weight="light">Dashboard</Heading>
        <Text color="secondary" className="mt-2">Welcome to PT Karya Nusantara Realty CMS</Text>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard icon={FolderOpen} label="Total Projects" value="0" color="bg-blue-50" />
        <StatCard icon={FileText} label="Blog Posts" value="0" color="bg-emerald-50" />
        <StatCard icon={MessageSquare} label="New Leads" value="0" trend="+0 this week" color="bg-amber-50" />
        <StatCard icon={CalendarCheck} label="Upcoming Bookings" value="0" color="bg-violet-50" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <Heading as="h3" size="md" weight="light">Recent Activity</Heading>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-surface-muted p-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <Text size="sm" color="secondary">No recent activity</Text>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <Heading as="h3" size="md" weight="light">Quick Actions</Heading>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { label: "New Project", href: "/cms/projects/create" },
              { label: "New Blog Post", href: "/cms/blog/create" },
              { label: "Upload Media", href: "/cms/media" },
              { label: "View Leads", href: "/cms/forms" },
            ].map((action) => (
              <a key={action.href} href={action.href}
                className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-body-sm text-text-secondary text-center hover:border-text-muted hover:text-text transition-colors"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
