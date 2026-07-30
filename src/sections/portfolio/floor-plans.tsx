"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { X, Maximize2 } from "lucide-react";

interface FloorPlan {
  id: string;
  label: string;
  src: string;
  alt: string;
  details?: string[];
  area?: string;
}

interface FloorPlansProps {
  label?: string;
  title: string;
  description?: string;
  plans: FloorPlan[];
  className?: string;
}

export function FloorPlans({
  label,
  title,
  description,
  plans,
  className,
}: FloorPlansProps) {
  const [active, setActive] = useState<string>(plans[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);
  const activePlan = plans.find((p) => p.id === active);

  return (
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="flex gap-3 lg:col-span-2 lg:flex-col">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setActive(plan.id)}
                className={cn(
                  "flex-1 rounded-xl border p-4 text-left transition-all duration-300 lg:flex-none",
                  active === plan.id
                    ? "border-gold-500 bg-gold-500/5 shadow-elevation-1"
                    : "border-gold-500/5 bg-surface hover:border-gold-500/20 hover:shadow-elevation-1",
                )}
              >
                <p className="text-body-sm font-medium text-text-primary">
                  {plan.label}
                </p>
                {plan.area && (
                  <p className="mt-1 text-caption text-text-secondary">
                    {plan.area}
                  </p>
                )}
              </button>
            ))}
          </div>
          <div className="relative lg:col-span-3">
            <AnimatePresence mode="wait">
              {activePlan && (
                <motion.div
                  key={activePlan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted"
                >
                  <ImageReveal
                    src={activePlan.src}
                    alt={activePlan.alt}
                    fill
                    zoomOnHover
                  />
                  <div className="absolute inset-0 bg-brand-900/0 transition-colors duration-300 hover:bg-brand-900/10" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-900 backdrop-blur transition-colors hover:bg-white"
              aria-label="Perbesar denah"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
        {activePlan?.details && activePlan.details.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activePlan.details.map((detail, i) => (
              <div
                key={i}
                className="rounded-xl border border-gold-500/5 bg-surface-secondary p-4 text-center"
              >
                <p className="text-body-sm text-text-secondary">{detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && activePlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setExpanded(false)}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={activePlan.src}
              alt={activePlan.alt}
              className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
