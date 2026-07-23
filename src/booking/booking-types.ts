export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  label?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  notes?: string;
  consultationType: "virtual" | "in-person" | "site-visit";
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  conflicts?: { slotId: string; message: string }[];
}

export interface BookingSummary {
  consultationType: string;
  date: string;
  time: string;
  duration: string;
  location?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}

export interface CalendarDay {
  date: string;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  slots: TimeSlot[];
}

export interface BookingConfig {
  minNoticeDays: number;
  maxAdvanceDays: number;
  availableDays: number[];
  timeSlotDuration: number;
  bufferBetweenSlots: number;
  workingHours: { start: string; end: string };
  consultationTypes: { value: string; label: string; description: string }[];
  durations: { value: string; label: string }[];
}
