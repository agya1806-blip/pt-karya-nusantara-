"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { ContactInfo as ContactInfoType } from "@/sections/types";

interface ContactInfoSectionProps {
  label?: string;
  title: string;
  description?: string;
  contact: ContactInfoType;
  hours?: string;
  className?: string;
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoCard({ icon, label, value, href }: InfoCardProps) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-border-light bg-surface p-6 transition-all duration-300 hover:shadow-elevation-1">
      <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
        {icon}
      </span>
      <div>
        <p className="text-caption font-medium tracking-widest text-text-tertiary uppercase">
          {label}
        </p>
        <p className="mt-1 text-body text-text-primary">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}

export function ContactInfoSection({
  label,
  title,
  description,
  contact,
  hours,
  className,
}: ContactInfoSectionProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Fade direction="up" className="mx-auto mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contact.phone && (
            <InfoCard
              icon={<Phone size={18} />}
              label="Phone"
              value={contact.phone}
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
            />
          )}
          {contact.email && (
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
          )}
          {contact.address && (
            <InfoCard
              icon={<MapPin size={18} />}
              label="Address"
              value={contact.address}
            />
          )}
          {hours && (
            <InfoCard
              icon={<Clock size={18} />}
              label="Hours"
              value={hours}
            />
          )}
          {contact.social && contact.social.length > 0 && (
            <div className="flex items-start gap-4 rounded-xl border border-border-light bg-surface p-6 md:col-span-2 lg:col-span-2">
              <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </span>
              <div>
                <p className="text-caption font-medium tracking-widest text-text-tertiary uppercase">
                  Social
                </p>
                <div className="mt-2 flex gap-4">
                  {contact.social.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      className="text-body-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label ?? link.platform}
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!contact.social?.length && !hours && (
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-body-sm text-text-tertiary text-center">
                Additional contact details coming soon.
              </p>
            </div>
          )}
        </Fade>
      </div>
    </section>
  );
}
