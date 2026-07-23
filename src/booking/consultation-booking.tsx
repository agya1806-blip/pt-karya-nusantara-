"use client";

import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { MeetingScheduler } from "./meeting-scheduler";
import { BookingSummaryView } from "./booking-summary";
import { validateBookingForm } from "./booking-validation";
import type { BookingFormData, TimeSlot, BookingConfig, BookingSummary as BookingSummaryType } from "./booking-types";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().optional(),
  projectType: z.string().optional(),
  notes: z.string().optional(),
});

type Step = "schedule" | "details" | "confirm";
type ConsultationType = "virtual" | "in-person" | "site-visit";

interface ConsultationBookingProps {
  onComplete: (data: { form: BookingFormData; summary: BookingSummaryType }) => void;
  config?: Partial<BookingConfig>;
  consultantName?: string;
  consultantRole?: string;
}

const defaultConfig: BookingConfig = {
  minNoticeDays: 2, maxAdvanceDays: 90, availableDays: [1, 2, 3, 4, 5],
  timeSlotDuration: 60, bufferBetweenSlots: 15,
  workingHours: { start: "09:00", end: "17:00" },
  consultationTypes: [
    { value: "virtual", label: "Virtual Meeting", description: "Video call via Zoom or Google Meet" },
    { value: "in-person", label: "In-Person Meeting", description: "Meet at our studio" },
    { value: "site-visit", label: "Site Visit", description: "We visit your location" },
  ],
  durations: [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ],
};

export function ConsultationBooking({ onComplete, config: configPartial, consultantName, consultantRole }: ConsultationBookingProps) {
  const config = { ...defaultConfig, ...configPartial };
  const [step, setStep] = useState<Step>("schedule");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [consultationType, setConsultationType] = useState<ConsultationType>("virtual");
  const [duration, setDuration] = useState("60");
  const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "", company: "", projectType: "", notes: "" },
  });

  const formValues = watch();

  const handleContinue = useCallback(() => {
    if (selectedDate && selectedSlot) setStep("details");
  }, [selectedDate, selectedSlot]);

  const handleConfirm = useCallback((data: typeof formValues) => {
    const bookingData: BookingFormData = {
      name: data.name, email: data.email, phone: data.phone,
      company: data.company, projectType: data.projectType,
      preferredDate: selectedDate!, preferredTime: selectedSlot!.startTime,
      duration, consultationType, notes: data.notes,
    };
    const validation = validateBookingForm(bookingData);
    if (!validation.valid) return;

    const summary: BookingSummaryType = {
      consultationType, date: selectedDate!, time: selectedSlot!.startTime,
      duration: config.durations.find((d) => d.value === duration)?.label || `${duration} min`,
      contactName: data.name, contactEmail: data.email, contactPhone: data.phone, notes: data.notes,
    };
    onComplete({ form: bookingData, summary });
    setStep("confirm");
  }, [selectedDate, selectedSlot, duration, consultationType, config.durations, onComplete, formValues]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Heading as="h2" size="2xl" weight="light">Book a Consultation</Heading>
          {consultantName && <Text size="sm" color="muted" className="mt-1">with {consultantName}{consultantRole ? `, ${consultantRole}` : ""}</Text>}
        </div>
        <div className="flex items-center gap-3">
          {(["schedule", "details", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-body-xs font-medium ${step === s ? "bg-text text-text-inverse" : step === "confirm" && s === "confirm" ? "bg-text text-text-inverse" : "border border-border text-text-muted"}`}>
                {i + 1}
              </div>
              <span className={`hidden text-body-xs sm:block ${step === s ? "text-text" : "text-text-muted"}`}>
                {s === "schedule" ? "Schedule" : s === "details" ? "Details" : "Confirm"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {step === "schedule" && (
        <div className="space-y-10">
          <div className="flex flex-wrap gap-3">
            {config.consultationTypes.map((ct) => (
              <button
                key={ct.value}
                onClick={() => setConsultationType(ct.value as ConsultationType)}
                className={`flex-1 min-w-[180px] rounded-xl border p-5 text-left transition-colors ${
                  consultationType === ct.value ? "border-text bg-surface-muted" : "border-border hover:border-text-muted"
                }`}
                aria-pressed={consultationType === ct.value}
              >
                <span className="block text-body-sm font-medium text-text">{ct.label}</span>
                <span className="mt-1 block text-body-xs text-text-muted">{ct.description}</span>
              </button>
            ))}
          </div>

          <MeetingScheduler
            selectedDate={selectedDate}
            selectedSlotId={selectedSlot?.id ?? null}
            onSelectDate={setSelectedDate}
            onSelectSlot={setSelectedSlot}
            onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            currentMonth={currentMonth}
            bookedSlots={bookedSlots}
            config={config}
          />
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit(handleConfirm)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Full Name *</label>
              <Input {...register("name")} placeholder="Your full name" error={errors.name?.message} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Email *</label>
              <Input {...register("email")} type="email" placeholder="your@email.com" error={errors.email?.message} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Phone *</label>
              <Input {...register("phone")} type="tel" placeholder="+62 812 3456 7890" error={errors.phone?.message} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Company (optional)</label>
              <Input {...register("company")} placeholder="Your company name" />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Project Type (optional)</label>
              <Select {...register("projectType")}>
                <option value="">Select project type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="hospitality">Hospitality</option>
                <option value="cultural">Cultural</option>
                <option value="educational">Educational</option>
                <option value="mixed-use">Mixed-Use</option>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-text">Duration *</label>
              <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                {config.durations.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-body-sm font-medium text-text">Notes or Questions (optional)</label>
            <Textarea {...register("notes")} placeholder="Tell us about your project..." rows={4} />
          </div>

          <div className="flex justify-between border-t border-border pt-8">
            <Button variant="ghost" onClick={() => setStep("schedule")}>Back to Schedule</Button>
            <Button type="submit" variant="primary" disabled={!isValid}>Continue to Confirm</Button>
          </div>
        </form>
      )}

      {step === "confirm" && selectedSlot && (
        <div className="space-y-8">
          <BookingSummaryView
            summary={{
              consultationType, date: selectedDate!, time: selectedSlot.startTime,
              duration: config.durations.find((d) => d.value === duration)?.label || `${duration} min`,
              contactName: formValues.name, contactEmail: formValues.email,
              contactPhone: formValues.phone, notes: formValues.notes,
            }}
            onEdit={() => setStep("details")}
          />
        </div>
      )}
    </div>
  );
}
