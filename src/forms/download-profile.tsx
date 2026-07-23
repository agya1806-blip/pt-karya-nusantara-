"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { downloadSchema, type DownloadFormData } from "./form-schemas";

interface DownloadProfileProps {
  onDownload: (data: DownloadFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  profileUrl?: string;
}

export function DownloadProfile({ onDownload, isSubmitting = false, profileUrl }: DownloadProfileProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-border bg-surface p-8 shadow-luxury">
      <div className="flex items-center gap-3 mb-6">
        <Download className="h-5 w-5 text-text-secondary" />
        <Heading as="h3" size="md" weight="light">Download Company Profile</Heading>
      </div>
      <Text size="sm" color="secondary" className="mb-6">
        Get our complete portfolio and capabilities brochure.
      </Text>

      <form onSubmit={handleSubmit(async (data) => { await onDownload(data); reset(); })} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Name *</label>
          <Input {...register("name")} placeholder="Your full name" error={errors.name?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Email *</label>
          <Input {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-body-sm font-medium text-text">Company</label>
            <Input {...register("company")} placeholder="Company name" />
          </div>
          <div>
            <label className="mb-1.5 block text-body-sm font-medium text-text">Role</label>
            <Input {...register("role")} placeholder="Your role" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Area of Interest</label>
          <select {...register("interest")} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body-sm text-text focus:outline-none focus:ring-2 focus:ring-text/20">
            <option value="">Select interest</option>
            <option value="residential">Residential Architecture</option>
            <option value="commercial">Commercial Architecture</option>
            <option value="hospitality">Hospitality Design</option>
            <option value="interior">Interior Design</option>
            <option value="landscape">Landscape Architecture</option>
            <option value="master-planning">Master Planning</option>
          </select>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register("agreeToContact")} className="mt-1 h-4 w-4 rounded border-border text-text focus:ring-text" />
          <Text size="xs" color="muted">I agree to be contacted about relevant projects and services</Text>
        </label>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing...</> : "Download Profile"}
        </Button>
      </form>

      {profileUrl && (
        <p className="mt-4 text-body-xs text-text-muted text-center">
          Already submitted? <a href={profileUrl} className="underline hover:text-text" download>Download directly</a>
        </p>
      )}
    </div>
  );
}
