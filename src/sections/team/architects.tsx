"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { TeamGrid } from "./team-grid";
import type { TeamMember } from "@/sections/types";

interface ArchitectsProps {
  title: string;
  description?: string;
  members: TeamMember[];
  className?: string;
}

export function Architects({ title, description, members, className }: ArchitectsProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <div className="mt-16">
          <TeamGrid members={members} columns={4} variant="compact" />
        </div>
      </div>
    </section>
  );
}
