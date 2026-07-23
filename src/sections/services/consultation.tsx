"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ConsultationProps {
  title: string;
  description: string;
  className?: string;
}

export function Consultation({
  title,
  description,
  className,
}: ConsultationProps) {
  return (
    <section className={cn("bg-brand-500 py-24", className)}>
      <div className="container-site">
        <Fade direction="up" className="mx-auto max-w-2xl text-center">
          <h2 className="text-display font-light tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-body-lg text-neutral-200 leading-relaxed">
            {description}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-body-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-100"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </Fade>
      </div>
    </section>
  );
}
