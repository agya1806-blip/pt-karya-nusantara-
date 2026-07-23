"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface BudgetRangeFilterProps {
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  formatLabel?: (value: number) => string;
}

export function BudgetRangeFilter({
  value,
  onChange,
  min = 0,
  max = 100000000,
  step = 500000,
  label = "Budget Range",
  formatLabel = (v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`,
}: BudgetRangeFilterProps) {
  const [localMin, setLocalMin] = useState(value.min);
  const [localMax, setLocalMax] = useState(value.max);

  const commitMin = useCallback((v: number) => {
    const val = Math.min(v, localMax - step);
    setLocalMin(val);
    onChange({ min: val, max: localMax });
  }, [localMax, step, onChange]);

  const commitMax = useCallback((v: number) => {
    const val = Math.max(v, localMin + step);
    setLocalMax(val);
    onChange({ min: localMin, max: val });
  }, [localMin, step, onChange]);

  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  return (
    <div role="group" aria-label={label}>
      <h3 className="mb-4 text-body-xs font-medium uppercase tracking-wider text-text-muted">{label}</h3>
      <div className="flex items-center justify-between mb-3">
        <span className="text-body-sm text-text-secondary">{formatLabel(localMin)}</span>
        <span className="text-body-xs text-text-muted">&mdash;</span>
        <span className="text-body-sm text-text-secondary">{formatLabel(localMax)}</span>
      </div>
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-surface-muted" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-text"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          onMouseUp={() => commitMin(localMin)}
          onTouchEnd={() => commitMin(localMin)}
          className="absolute top-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-text [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-luxury"
          aria-label="Minimum budget"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          onMouseUp={() => commitMax(localMax)}
          onTouchEnd={() => commitMax(localMax)}
          className="absolute top-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-text [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-luxury"
          aria-label="Maximum budget"
        />
      </div>
    </div>
  );
}
