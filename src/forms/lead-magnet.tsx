"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { leadMagnetSchema, type LeadMagnetFormData } from "./form-schemas";

interface LeadMagnetProps {
  onSubmit: (data: LeadMagnetFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  title: string;
  description: string;
  cta?: string;
  resourceName?: string;
  image?: React.ReactNode;
}

export function LeadMagnet({ onSubmit, isSubmitting = false, isSuccess = false, title, description, cta = "Get Free Guide", resourceName = "resource", image }: LeadMagnetProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    mode: "onChange",
  });

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-luxury">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <FileText className="h-6 w-6 text-green-600" />
        </div>
        <Heading as="h3" size="md" weight="light">Check Your Email</Heading>
        <Text size="sm" color="secondary" className="mt-3">We have sent &ldquo;{resourceName}&rdquo; to your email address.</Text>
        <Button variant="ghost" size="sm" className="mt-6" onClick={() => reset()}>Get Another Resource</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-luxury">
      <div className="flex items-start gap-5">
        {image && <div className="hidden shrink-0 md:block">{image}</div>}
        <div className="flex-1">
          <Heading as="h3" size="lg" weight="light">{title}</Heading>
          <Text size="sm" color="secondary" className="mt-3">{description}</Text>
          <form onSubmit={handleSubmit(async (data) => { await onSubmit(data); reset(); })} className="mt-6 space-y-3" noValidate>
            <Input {...register("name")} placeholder="Your name" error={errors.name?.message} />
            <Input {...register("email")} type="email" placeholder="Your email" error={errors.email?.message} />
            <Input {...register("phone")} type="tel" placeholder="Phone (optional)" error={errors.phone?.message} />
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : cta}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
