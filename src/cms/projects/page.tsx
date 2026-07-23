"use client";

import { Plus, Search } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Input } from "@/components/ui/Input";

interface ProjectsPageProps {
  projects?: { id: string; title: string; status: string; category?: string; updated_at: string }[];
  onCreateNew?: () => void;
}

export function ProjectsPage({ projects = [], onCreateNew }: ProjectsPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Heading as="h1" size="2xl" weight="light">Projects</Heading>
          <Text color="secondary" className="mt-1">Manage your portfolio projects</Text>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 rounded-lg bg-text px-5 py-2.5 text-body-sm font-medium text-text-inverse hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <select className="rounded-lg border border-border bg-surface px-4 py-2.5 text-body-sm text-text-secondary">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted py-20">
          <FolderOpen className="h-12 w-12 text-text-muted mb-4" />
          <Heading as="h3" size="md" weight="light">No projects yet</Heading>
          <Text size="sm" color="secondary" className="mt-2">Create your first project to showcase your work.</Text>
          <button onClick={onCreateNew} className="mt-6 rounded-lg bg-text px-5 py-2.5 text-body-sm font-medium text-text-inverse hover:opacity-90 transition-opacity">
            Create Project
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Title</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Updated</th>
                <th className="px-6 py-4 text-right text-body-xs font-medium uppercase tracking-wider text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-6 py-4"><Text size="sm" className="font-medium text-text">{p.title}</Text></td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-body-xs font-medium ${p.status === "published" ? "bg-emerald-50 text-emerald-700" : p.status === "draft" ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-600"}`}>{p.status}</span></td>
                  <td className="px-6 py-4"><Text size="sm" color="secondary">{p.category || "—"}</Text></td>
                  <td className="px-6 py-4"><Text size="sm" color="muted">{new Date(p.updated_at).toLocaleDateString()}</Text></td>
                  <td className="px-6 py-4 text-right">
                    <a href={`/cms/projects/${p.id}/edit`} className="text-body-sm text-text-secondary hover:text-text transition-colors">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
