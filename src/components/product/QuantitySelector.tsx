"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";

interface QuantitySelectorProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
  disabled?: boolean;
}

export function QuantitySelector({ value, max, onChange, size = "md", disabled }: QuantitySelectorProps) {
  const btn = cn(
    "flex items-center justify-center transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
    size === "sm" ? "size-8" : "size-11",
  );

  return (
    <div className="inline-flex items-center border border-line">
      <button
        type="button"
        aria-label="ลดจำนวน"
        className={btn}
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className={cn("text-center text-sm tabular-nums", size === "sm" ? "w-8" : "w-12")}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="เพิ่มจำนวน"
        className={btn}
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
