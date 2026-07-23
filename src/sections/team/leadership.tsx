"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { TeamGrid } from "./team-grid";
import type { TeamMember } from "@/sections/types";

interface LeadershipProps {
  title: string;
  description?: string;
  members: TeamMember[];
  className?: string;
}

export function Leadership({ title, description, members, className }: LeadershipProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <div className="mt-16">
          <TeamGrid members={members} columns={4} variant="default" />
        </div>
      </div>
    </section>
  );
}
