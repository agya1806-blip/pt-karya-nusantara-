"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { inquirySchema, type InquiryFormData } from "./form-schemas";

interface InquiryFormProps {
  onSubmit: (data: InquiryFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  title?: string;
  description?: string;
}

export function InquiryForm({ onSubmit, isSubmitting = false, isSuccess = false, title = "Send Us an Inquiry", description }: InquiryFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onChange",
  });

  const handleFormSubmit = async (data: InquiryFormData) => {
    await onSubmit(data);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <Send className="h-7 w-7 text-green-600" />
        </div>
        <Heading as="h3" size="lg" weight="light">Thank You</Heading>
        <Text color="secondary" className="mt-4 max-w-md mx-auto">
          Your inquiry has been received. Our team will review your request and contact you within 24 hours.
        </Text>
        <Button variant="outline" className="mt-8" onClick={() => reset()}>Send Another Inquiry</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {title && <Heading as="h2" size="2xl" weight="light" className="mb-2">{title}</Heading>}
      {description && <Text color="secondary" className="mb-8">{description}</Text>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="inquiry-name" className="mb-1.5 block text-body-sm font-medium text-text">Full Name *</label>
            <Input id="inquiry-name" {...register("name")} placeholder="Your full name" error={errors.name?.message} />
          </div>
          <div>
            <label htmlFor="inquiry-email" className="mb-1.5 block text-body-sm font-medium text-text">Email *</label>
            <Input id="inquiry-email" {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} />
          </div>
          <div>
            <label htmlFor="inquiry-phone" className="mb-1.5 block text-body-sm font-medium text-text">Phone</label>
            <Input id="inquiry-phone" {...register("phone")} type="tel" placeholder="+62 812 3456 7890" error={errors.phone?.message} />
          </div>
          <div>
            <label htmlFor="inquiry-project" className="mb-1.5 block text-body-sm font-medium text-text">Project Type *</label>
            <Select id="inquiry-project" {...register("projectType")} error={errors.projectType?.message} placeholder="Select project type" options={[
              { value: "residential", label: "Residential" },
              { value: "commercial", label: "Commercial" },
              { value: "hospitality", label: "Hospitality" },
              { value: "cultural", label: "Cultural / Public" },
              { value: "educational", label: "Educational" },
              { value: "mixed-use", label: "Mixed-Use" },
              { value: "interior", label: "Interior Design" },
              { value: "landscape", label: "Landscape Architecture" },
            ]} />
          </div>
          <div>
            <label htmlFor="inquiry-area" className="mb-1.5 block text-body-sm font-medium text-text">Estimated Area</label>
            <Input id="inquiry-area" {...register("areaSize")} placeholder="e.g. 500 m²" />
          </div>
          <div>
            <label htmlFor="inquiry-budget" className="mb-1.5 block text-body-sm font-medium text-text">Budget Range</label>
            <Select id="inquiry-budget" {...register("budget")} placeholder="Select budget range" options={[
              { value: "under-500k", label: "Under $500K" },
              { value: "500k-1m", label: "$500K \u2013 $1M" },
              { value: "1m-5m", label: "$1M \u2013 $5M" },
              { value: "5m-10m", label: "$5M \u2013 $10M" },
              { value: "10m-50m", label: "$10M \u2013 $50M" },
              { value: "over-50m", label: "Over $50M" },
            ]} />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-message" className="mb-1.5 block text-body-sm font-medium text-text">Message *</label>
          <Textarea id="inquiry-message" {...register("message")} placeholder="Tell us about your project..." rows={5} error={errors.message?.message} />
        </div>

        <div className="flex items-start gap-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...register("agreeToTerms")} className="mt-1 h-4 w-4 rounded border-border text-text focus:ring-text" />
            <Text size="xs" color="muted">I agree to be contacted regarding my inquiry and accept the privacy policy *</Text>
          </label>
        </div>
        {errors.agreeToTerms && <Text size="xs" color="muted" className="text-red-500">{errors.agreeToTerms.message}</Text>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Inquiry"}
        </Button>
      </form>
    </div>
  );
}
