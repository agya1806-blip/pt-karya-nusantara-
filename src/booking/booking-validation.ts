import type { BookingFormData, BookingValidationResult, TimeSlot } from "./booking-types";

export function validateBookingForm(data: BookingFormData): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address";
  if (!data.phone || !/^[+]?[0-9\s()-]{8,20}$/.test(data.phone)) errors.phone = "Please enter a valid phone number";
  if (!data.preferredDate) errors.preferredDate = "Please select a date";
  if (!data.preferredTime) errors.preferredTime = "Please select a time";
  if (!data.consultationType) errors.consultationType = "Please select a consultation type";
  if (!data.duration) errors.duration = "Please select a duration";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateTimeSlot(
  slot: TimeSlot,
  bookedSlots: TimeSlot[]
): { valid: boolean; conflict?: { slotId: string; message: string } } {
  if (!slot.available) return { valid: false, conflict: { slotId: slot.id, message: "This time slot is unavailable" } };

  const conflict = bookedSlots.find(
    (b) => b.date === slot.date && b.startTime === slot.startTime
  );
  if (conflict) return { valid: false, conflict: { slotId: slot.id, message: "This time slot is already booked" } };

  return { valid: true };
}

export function generateTimeSlots(
  date: string,
  workingHours: { start: string; end: string },
  durationMinutes: number,
  bufferMinutes: number,
  bookedSlots: TimeSlot[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [startH, startM] = workingHours.start.split(":").map(Number);
  const [endH, endM] = workingHours.end.split(":").map(Number);
  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes + durationMinutes <= endMinutes) {
    const startTime = `${String(Math.floor(currentMinutes / 60)).padStart(2, "0")}:${String(currentMinutes % 60).padStart(2, "0")}`;
    const endTime = `${String(Math.floor((currentMinutes + durationMinutes) / 60)).padStart(2, "0")}:${String((currentMinutes + durationMinutes) % 60).padStart(2, "0")}`;
    const isBooked = bookedSlots.some((b) => b.date === date && b.startTime === startTime);
    slots.push({ id: `${date}-${startTime}`, date, startTime, endTime, available: !isBooked });
    currentMinutes += durationMinutes + bufferMinutes;
  }

  return slots;
}
