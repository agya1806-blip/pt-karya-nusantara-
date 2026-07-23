"use client";

import { cn } from "@/lib/utils";
import type { TimeSlot } from "./booking-types";

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelect: (slot: TimeSlot) => void;
  label?: string;
}

export function TimeSlotSelector({ slots, selectedSlotId, onSelect, label = "Available Times" }: TimeSlotSelectorProps) {
  const available = slots.filter((s) => s.available);
  const grouped = available.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    const period = parseInt(slot.startTime.split(":")[0]) < 12 ? "Morning" : parseInt(slot.startTime.split(":")[0]) < 17 ? "Afternoon" : "Evening";
    (acc[period] = acc[period] || []).push(slot);
    return acc;
  }, {});

  if (available.length === 0) {
    return (
      <div role="group" aria-label={label}>
        <h3 className="mb-4 text-body-xs font-medium uppercase tracking-wider text-text-muted">{label}</h3>
        <p className="text-body-sm text-text-muted py-8 text-center">No available times for this date. Please select another date.</p>
      </div>
    );
  }

  return (
    <div role="group" aria-label={label}>
      <h3 className="mb-4 text-body-xs font-medium uppercase tracking-wider text-text-muted">{label}</h3>
      <div className="space-y-4">
        {Object.entries(grouped).map(([period, periodSlots]) => (
          <div key={period}>
            <h4 className="mb-2 text-body-xs text-text-muted">{period}</h4>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {periodSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => onSelect(slot)}
                  disabled={!slot.available}
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-body-sm transition-colors text-center",
                    selectedSlotId === slot.id
                      ? "border-text bg-text text-text-inverse"
                      : slot.available
                        ? "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text"
                        : "border-border bg-surface-muted text-text-muted/50 cursor-not-allowed"
                  )}
                  aria-pressed={selectedSlotId === slot.id}
                  aria-label={`${slot.startTime} to ${slot.endTime}`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
