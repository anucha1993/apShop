"use client";

import { cn } from "@/lib/format";
import type { ProductColor } from "@/types/product";

interface ColorSwatchesProps {
  colors: ProductColor[];
  selected: string;
  onSelect: (name: string) => void;
  size?: "sm" | "md";
}

export function ColorSwatches({ colors, selected, onSelect, size = "md" }: ColorSwatchesProps) {
  return (
    <div role="radiogroup" aria-label="สี" className={cn("flex flex-wrap", size === "sm" ? "gap-1.5" : "gap-2.5")}>
      {colors.map((c) => {
        const active = c.name === selected;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            title={c.name}
            onClick={() => onSelect(c.name)}
            className={cn(
              "rounded-full p-0.5 ring-1 transition",
              active ? "ring-ink" : "ring-transparent hover:ring-line",
            )}
          >
            <span
              className={cn("block rounded-full border border-black/10", size === "sm" ? "size-3.5" : "size-6")}
              style={{ backgroundColor: c.hex }}
            />
          </button>
        );
      })}
    </div>
  );
}
