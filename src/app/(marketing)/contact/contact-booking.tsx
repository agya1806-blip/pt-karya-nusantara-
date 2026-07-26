"use client";

import { useState } from "react";
import { ConsultationBooking } from "@/booking";
import { Fade } from "@/components/animation/Fade";

export function ContactBookingSection() {
  const [bookingComplete, setBookingComplete] = useState(false);

  return (
    <section className="bg-surface py-24" id="consultation-booking">
      <div className="container-site">
        <Fade direction="up">
          {bookingComplete ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-12">
                <h2 className="text-heading font-light text-text-primary">Terima Kasih</h2>
                <p className="mt-4 text-body-lg text-text-secondary">
                  Konsultasi Anda telah dijadwalkan. Kami akan mengirimkan konfirmasi melalui surel dalam 24 jam.
                </p>
              </div>
            </div>
          ) : (
            <ConsultationBooking
              onComplete={() => setBookingComplete(true)}
              consultantName="Ardi Wicaksono"
              consultantRole="Principal Architect"
            />
          )}
        </Fade>
      </div>
    </section>
  );
}