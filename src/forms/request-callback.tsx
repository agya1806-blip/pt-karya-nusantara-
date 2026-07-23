"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { callbackSchema, type CallbackFormData } from "./form-schemas";

interface RequestCallbackProps {
  onSubmit: (data: CallbackFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
}

export function RequestCallback({ onSubmit, isSubmitting = false, isSuccess = false }: RequestCallbackProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
    mode: "onChange",
  });

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <Phone className="h-6 w-6 text-green-600" />
        </div>
        <Heading as="h3" size="md" weight="light">Callback Scheduled</Heading>
        <Text size="sm" color="secondary" className="mt-3">We will call you back at your preferred time.</Text>
        <Button variant="ghost" size="sm" className="mt-6" onClick={() => reset()}>Request Another</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Heading as="h3" size="md" weight="light" className="mb-1">Request a Callback</Heading>
      <Text size="sm" color="secondary" className="mb-6">Leave your details and we will call you back.</Text>

      <form onSubmit={handleSubmit((data) => { onSubmit(data); reset(); })} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Name *</label>
          <Input {...register("name")} placeholder="Your name" error={errors.name?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Phone *</label>
          <Input {...register("phone")} type="tel" placeholder="+62 812 3456 7890" error={errors.phone?.message} />
        </div>
        <div>
          <label className="mb-1.5 block text-body-sm font-medium text-text">Preferred Time</label>
          <select {...register("preferredTime")} className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body-sm text-text focus:outline-none focus:ring-2 focus:ring-text/20">
            <option value="morning">Morning (9AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 5PM)</option>
            <option value="evening">Evening (5PM - 8PM)</option>
          </select>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register("urgent")} className="h-4 w-4 rounded border-border text-text focus:ring-text" />
          <Text size="xs" color="muted">This is urgent</Text>
        </label>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Requesting...</> : "Request Callback"}
        </Button>
      </form>
    </div>
  );
}
