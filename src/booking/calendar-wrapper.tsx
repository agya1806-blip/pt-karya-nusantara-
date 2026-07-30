"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarDay } from "./booking-types";

interface CalendarWrapperProps {
  currentMonth: Date;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  minDate?: Date;
  maxDate?: Date;
  availableDays?: number[];
  disabledDates?: string[];
  monthLabels?: string[];
  dayLabels?: string[];
}

export function CalendarWrapper({
  currentMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  minDate = new Date(),
  maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  availableDays = [1, 2, 3, 4, 5],
  disabledDates = [],
  monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
}: CalendarWrapperProps) {
  const toDateStr = (d: Date) => d.toISOString().split("T")[0] ?? "";

  const days = useMemo<CalendarDay[]>(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const result: CalendarDay[] = [];

    for (let i = 0; i < startPad; i++) {
      const d = new Date(year, month, -startPad + i + 1);
      result.push({ date: toDateStr(d), day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), isCurrentMonth: false, isToday: false, isSelected: false, isDisabled: true, slots: [] });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dateStr = toDateStr(d);
      const isDayDisabled = !availableDays.includes(d.getDay()) || d < new Date(toDateStr(minDate)) || d > maxDate || disabledDates.includes(dateStr);
      result.push({ date: dateStr, day: i, month, year, isCurrentMonth: true, isToday: d.toDateString() === new Date().toDateString(), isSelected: selectedDate === dateStr, isDisabled: isDayDisabled, slots: [] });
    }

    const remaining = 42 - result.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      result.push({ date: toDateStr(d), day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), isCurrentMonth: false, isToday: false, isSelected: false, isDisabled: true, slots: [] });
    }

    return result;
  }, [currentMonth, selectedDate, minDate, maxDate, availableDays, disabledDates]);

  const monthYear = `${monthLabels[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  const canGoPrev = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) > new Date(toDateStr(minDate));
  const canGoNext = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0) < maxDate;

  return (
    <div role="grid" aria-label="Date picker">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPrevMonth}
          disabled={!canGoPrev}
          className="p-2 text-text-secondary hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-body-sm font-medium text-text">{monthYear}</span>
        <button
          onClick={onNextMonth}
          disabled={!canGoNext}
          className="p-2 text-text-secondary hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((label) => (
          <div key={label} className="flex items-center justify-center py-2 text-body-xs font-medium text-text-muted">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={day.date}
            onClick={() => !day.isDisabled && onSelectDate(day.date)}
            disabled={day.isDisabled}
            className={cn(
              "flex items-center justify-center rounded-lg py-2.5 text-body-sm transition-colors",
              day.isSelected
                ? "bg-text text-text-inverse"
                : day.isDisabled
                  ? "text-text-muted/30 cursor-not-allowed"
                  : day.isToday
                    ? "border border-border text-text hover:bg-surface-muted"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text",
              !day.isCurrentMonth && "opacity-30"
            )}
            aria-label={`${day.day} ${monthLabels[day.month]} ${day.year}${day.isSelected ? ", selected" : ""}${day.isDisabled ? ", unavailable" : ""}`}
            aria-selected={day.isSelected}
            tabIndex={day.isDisabled ? -1 : 0}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
}
