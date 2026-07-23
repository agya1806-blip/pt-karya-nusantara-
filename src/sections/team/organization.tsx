"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";

interface OrganizationProps {
  title: string;
  description: string;
  className?: string;
}

export function Organization({ title, description, className }: OrganizationProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-3xl">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {["Design", "Technical", "Project Mgmt", "Operations"].map((dept) => (
              <div key={dept} className="rounded-xl border border-border-light bg-surface p-6">
                <p className="text-body font-medium text-text-primary">{dept}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
