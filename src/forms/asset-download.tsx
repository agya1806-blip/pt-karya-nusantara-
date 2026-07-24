"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2, FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

const downloadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
});

type DownloadFormData = z.infer<typeof downloadSchema>;

interface AssetDownloadProps {
  type: "portfolio" | "brochure";
  onDownload: (data: DownloadFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  assetUrl?: string;
}

const assetConfig = {
  portfolio: {
    icon: FileText,
    title: "Download Portfolio PDF",
    description: "Get our complete portfolio showcasing our finest projects and capabilities.",
    buttonLabel: "Download Portfolio",
    fileName: "Karya-Nusantara-Portfolio.pdf",
  },
  brochure: {
    icon: BookOpen,
    title: "Download Brochure",
    description: "Get an overview of our services, process, and approach to design.",
    buttonLabel: "Download Brochure",
    fileName: "Karya-Nusantara-Brochure.pdf",
  },
};

export function AssetDownload({ type, onDownload, isSubmitting = false, assetUrl }: AssetDownloadProps) {
  const config = assetConfig[type];
  const Icon = config.icon;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full rounded-2xl border border-border-light bg-surface p-8 transition-all duration-300 hover:shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-heading-sm font-medium text-text-primary">{config.title}</h3>
          <p className="text-body-sm text-text-secondary">{config.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(async (data) => { await onDownload(data); reset(); })} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Name *</label>
          <Input {...register("name")} placeholder="Your full name" error={errors.name?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Email *</label>
          <Input {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Company (optional)</label>
          <Input {...register("company")} placeholder="Company name" />
        </div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing...</>
          ) : (
            <><Download className="mr-2 h-4 w-4" /> {config.buttonLabel}</>
          )}
        </Button>
      </form>

      {assetUrl && (
        <p className="mt-4 text-body-xs text-text-muted text-center">
          <a href={assetUrl} className="underline hover:text-text" download={config.fileName}>Download directly</a>
        </p>
      )}
    </div>
  );
}