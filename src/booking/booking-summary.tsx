"use client";

import { Calendar, Clock, MapPin, Video, Phone, User, Mail, FileText, Pencil } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { BookingSummary as BookingSummaryType } from "./booking-types";

interface BookingSummaryProps {
  summary: BookingSummaryType;
  onEdit?: () => void;
}

export function BookingSummaryView({ summary, onEdit }: BookingSummaryProps) {
  const consultationIcon = summary.consultationType === "virtual" ? Video : summary.consultationType === "in-person" ? MapPin : Phone;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading as="h3" size="md" weight="light">Booking Summary</Heading>
        {onEdit && (
          <button onClick={onEdit} className="flex items-center gap-2 text-body-sm text-text-muted hover:text-text transition-colors">
            <Pencil className="h-4 w-4" /> Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-muted p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
            <Calendar className="h-5 w-5 text-text-secondary" />
          </div>
          <div>
            <Text size="sm" color="secondary" className="font-medium">Date & Time</Text>
            <Text size="sm" color="muted">{summary.date} at {summary.time}</Text>
            <Text size="xs" color="muted">{summary.duration}</Text>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-muted p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
            {React.createElement(consultationIcon, { className: "h-5 w-5 text-text-secondary" })}
          </div>
          <div>
            <Text size="sm" color="secondary" className="font-medium">Consultation Type</Text>
            <Text size="sm" color="muted" className="capitalize">{summary.consultationType.replace("-", " ")}</Text>
            {summary.location && <Text size="xs" color="muted">{summary.location}</Text>}
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-muted p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
            <User className="h-5 w-5 text-text-secondary" />
          </div>
          <div>
            <Text size="sm" color="secondary" className="font-medium">Contact Information</Text>
            <Text size="sm" color="muted">{summary.contactName}</Text>
            <div className="mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1 text-body-xs text-text-muted"><Mail className="h-3 w-3" />{summary.contactEmail}</span>
              <span className="flex items-center gap-1 text-body-xs text-text-muted"><Phone className="h-3 w-3" />{summary.contactPhone}</span>
            </div>
          </div>
        </div>

        {summary.notes && (
          <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-muted p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
              <FileText className="h-5 w-5 text-text-secondary" />
            </div>
            <div>
              <Text size="sm" color="secondary" className="font-medium">Notes</Text>
              <Text size="sm" color="muted">{summary.notes}</Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
