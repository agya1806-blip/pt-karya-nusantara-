"use client";

import { useState, useMemo } from "react";
import { CalendarWrapper } from "./calendar-wrapper";
import { TimeSlotSelector } from "./time-slot-selector";
import { generateTimeSlots } from "./booking-validation";
import type { TimeSlot, BookingConfig } from "./booking-types";

interface MeetingSchedulerProps {
  selectedDate: string | null;
  selectedSlotId: string | null;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: TimeSlot) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentMonth: Date;
  bookedSlots?: TimeSlot[];
  config: BookingConfig;
}

export function MeetingScheduler({
  selectedDate,
  selectedSlotId,
  onSelectDate,
  onSelectSlot,
  onPrevMonth,
  onNextMonth,
  currentMonth,
  bookedSlots = [],
  config,
}: MeetingSchedulerProps) {
  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(selectedDate, config.workingHours, config.timeSlotDuration, config.bufferBetweenSlots, bookedSlots);
  }, [selectedDate, config, bookedSlots]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <CalendarWrapper
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          availableDays={config.availableDays}
          minDate={new Date(Date.now() + config.minNoticeDays * 24 * 60 * 60 * 1000)}
          maxDate={new Date(Date.now() + config.maxAdvanceDays * 24 * 60 * 60 * 1000)}
        />
      </div>
      <div>
        {selectedDate ? (
          <TimeSlotSelector
            slots={slots}
            selectedSlotId={selectedSlotId}
            onSelect={onSelectSlot}
          />
        ) : (
          <div className="flex h-full items-center justify-center py-12">
            <p className="text-body-sm text-text-muted">Select a date to see available times</p>
          </div>
        )}
      </div>
    </div>
  );
}
