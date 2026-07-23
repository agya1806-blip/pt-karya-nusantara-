"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { ContactInfoEntry } from "@/sections/types";

interface ContactInformationProps {
  title: string;
  description?: string;
  contacts: ContactInfoEntry[];
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "map-pin": <MapPin size={18} />,
  phone: <Phone size={18} />,
  mail: <Mail size={18} />,
  clock: <Clock size={18} />,
};

export function ContactInformation({
  title,
  description,
  contacts,
  className,
}: ContactInformationProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {contacts.map((item) => {
            const content = (
              <div className="flex items-start gap-4 rounded-xl border border-border-light bg-surface-secondary p-6 transition-all duration-300 hover:shadow-elevation-1">
                {item.icon && iconMap[item.icon] ? (
                  <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                    {iconMap[item.icon]}
                  </span>
                ) : null}
                <div>
                  <p className="text-caption font-medium tracking-widest text-text-tertiary uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-body text-text-primary">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href}>
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </Fade>
      </div>
    </section>
  );
}
