import { useState, useCallback } from "react";
import type { TimeSlot, BookingFormData, BookingSummary, BookingConfig } from "@/booking/booking-types";
import { validateBookingForm } from "@/booking/booking-validation";

interface UseBookingOptions {
  config?: Partial<BookingConfig>;
  onComplete?: (data: { form: BookingFormData; summary: BookingSummary }) => void;
}

export function useBooking({ config: configPartial, onComplete }: UseBookingOptions = {}) {
  const [step, setStep] = useState<"schedule" | "details" | "confirm">("schedule");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const goToDetails = useCallback(() => {
    if (selectedDate && selectedSlot) setStep("details");
  }, [selectedDate, selectedSlot]);

  const goToConfirm = useCallback((data: BookingFormData) => {
    const validation = validateBookingForm(data);
    if (!validation.valid) return;
    setBookingData(data);
    setStep("confirm");
  }, []);

  const confirmBooking = useCallback(() => {
    if (!bookingData || !selectedSlot) return;
    const summary: BookingSummary = {
      consultationType: bookingData.consultationType,
      date: selectedDate!,
      time: selectedSlot.startTime,
      duration: bookingData.duration,
      contactName: bookingData.name,
      contactEmail: bookingData.email,
      contactPhone: bookingData.phone,
      notes: bookingData.notes,
    };
    onComplete?.({ form: bookingData, summary });
  }, [bookingData, selectedSlot, selectedDate, onComplete]);

  const reset = useCallback(() => {
    setStep("schedule");
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingData(null);
  }, []);

  return {
    step, setStep, selectedDate, setSelectedDate, selectedSlot, setSelectedSlot,
    bookingData, goToDetails, goToConfirm, confirmBooking, reset,
  };
}
