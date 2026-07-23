"use client";

import { Upload, Image, FolderOpen, Search, Grid, List } from "lucide-react";
import { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface MediaItem { id: string; url: string; original_name: string; mime_type: string; file_size: number; width?: number; height?: number; folder_id?: string }

interface MediaLibraryPageProps {
  items?: MediaItem[];
  folders?: { id: string; name: string; slug: string }[];
  onUpload?: () => void;
  onSelect?: (item: MediaItem) => void;
}

export function MediaLibraryPage({ items = [], folders = [], onUpload, onSelect }: MediaLibraryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Heading as="h1" size="2xl" weight="light">Media Library</Heading>
          <Text color="secondary" className="mt-1">Manage your images, videos, and documents</Text>
        </div>
        <button onClick={onUpload} className="flex items-center gap-2 rounded-lg bg-text px-5 py-2.5 text-body-sm font-medium text-text-inverse hover:opacity-90 transition-opacity">
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input placeholder="Search media..." className="pl-10" />
        </div>
        <div className="flex items-center rounded-lg border border-border">
          <button onClick={() => setViewMode("grid")} className={cn("p-2.5", viewMode === "grid" ? "bg-surface-muted text-text" : "text-text-muted hover:text-text")}><Grid className="h-4 w-4" /></button>
          <button onClick={() => setViewMode("list")} className={cn("p-2.5", viewMode === "list" ? "bg-surface-muted text-text" : "text-text-muted hover:text-text")}><List className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="rounded-full bg-text px-5 py-1.5 text-body-xs font-medium text-text-inverse">All</button>
        {folders.map((f) => <button key={f.id} className="rounded-full border border-border px-5 py-1.5 text-body-xs text-text-secondary hover:border-text-muted hover:text-text transition-colors">{f.name}</button>)}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted py-20">
          <Image className="h-12 w-12 text-text-muted mb-4" />
          <Heading as="h3" size="md" weight="light">No media yet</Heading>
          <Text size="sm" color="secondary" className="mt-2">Upload images, videos, or documents.</Text>
          <button onClick={onUpload} className="mt-6 rounded-lg bg-text px-5 py-2.5 text-body-sm font-medium text-text-inverse hover:opacity-90 transition-opacity">Upload Files</button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <button key={item.id} onClick={() => onSelect?.(item)} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-muted hover:border-text-muted transition-colors">
              {item.mime_type.startsWith("image/") ? (
                <img src={item.url} alt={item.original_name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Image className="h-8 w-8 text-text-muted" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Text size="xs" className="text-white truncate">{item.original_name}</Text>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Name</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Type</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Size</th>
                <th className="px-6 py-4 text-left text-body-xs font-medium uppercase tracking-wider text-text-muted">Dimensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-muted transition-colors cursor-pointer" onClick={() => onSelect?.(item)}>
                  <td className="px-6 py-4 flex items-center gap-3"><span className="text-body-sm text-text">{item.original_name}</span></td>
                  <td className="px-6 py-4"><Text size="sm" color="muted">{item.mime_type}</Text></td>
                  <td className="px-6 py-4"><Text size="sm" color="muted">{(item.file_size / 1024).toFixed(0)} KB</Text></td>
                  <td className="px-6 py-4"><Text size="sm" color="muted">{item.width && item.height ? `${item.width}×${item.height}` : "—"}</Text></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
