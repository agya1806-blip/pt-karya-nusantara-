"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { floatingConsultationSchema, type FloatingConsultationFormData } from "./form-schemas";

interface FloatingConsultationProps {
  onSubmit: (data: FloatingConsultationFormData) => Promise<void> | void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  phoneNumber?: string;
}

export function FloatingConsultation({ onSubmit, isSubmitting = false, isSuccess = false, phoneNumber }: FloatingConsultationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FloatingConsultationFormData>({
    resolver: zodResolver(floatingConsultationSchema),
    mode: "onChange",
  });

  const handleFormSubmit = async (data: FloatingConsultationFormData) => {
    await onSubmit(data);
    reset();
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const message = `Hi, I would like a consultation. My name is ${data.name}.`;
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-40 w-80 rounded-2xl border border-border bg-surface shadow-luxury-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Text size="sm" className="font-medium text-text">Free Consultation</Text>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              {isSuccess ? (
                <div className="text-center py-4">
                  <Text size="sm" color="secondary">Thank you! We will contact you shortly.</Text>
                  <Button variant="ghost" size="sm" className="mt-4" onClick={() => { setIsOpen(false); reset(); }}>Close</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3" noValidate>
                  <Input {...register("name")} placeholder="Your name" error={errors.name?.message} className="py-2 text-body-sm" />
                  <Input {...register("phone")} type="tel" placeholder="Phone number" error={errors.phone?.message} className="py-2 text-body-sm" />
                  <Input {...register("email")} type="email" placeholder="Email (optional)" error={errors.email?.message} className="py-2 text-body-sm" />
                  <Button type="submit" variant="primary" className="w-full" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
                    Request Consultation
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-text text-text-inverse shadow-luxury-lg hover:shadow-luxury-xl transition-shadow"
        aria-label={isOpen ? "Close consultation form" : "Open consultation form"}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </>
  );
}
