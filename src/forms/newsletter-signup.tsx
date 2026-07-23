"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { newsletterSchema, type NewsletterFormData } from "./form-schemas";

interface NewsletterSignupProps {
  onSubmit: (data: NewsletterFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  variant?: "default" | "inline" | "compact";
  title?: string;
  description?: string;
}

export function NewsletterSignup({ onSubmit, isSubmitting = false, isSuccess = false, variant = "default", title = "Stay Inspired", description = "Receive our latest projects and architectural insights." }: NewsletterSignupProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: "onChange",
  });

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-green-50 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <Text size="sm" className="font-medium text-green-800">Subscribed!</Text>
          <Text size="xs" className="text-green-600">Thank you for joining our newsletter.</Text>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit(async (data) => { await onSubmit(data); reset(); })} className="flex gap-3" noValidate>
        <div className="flex-1">
          <Input {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} className="w-full" />
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-5 w-5 text-text-secondary" />
        <Text size="sm" className="font-medium text-text">{title}</Text>
      </div>
      {description && <Text size="xs" color="muted" className="mb-4">{description}</Text>}

      <form onSubmit={handleSubmit(async (data) => { await onSubmit(data); reset(); })} className="space-y-3" noValidate>
        <Input {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} />
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register("agreeToPrivacy")} className="mt-0.5 h-4 w-4 rounded border-border text-text focus:ring-text" />
          <Text size="xs" color="muted">I agree to receive communications and accept the privacy policy</Text>
        </label>
        {errors.agreeToPrivacy && <Text size="xs" className="text-red-500">{errors.agreeToPrivacy.message}</Text>}
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...</> : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
