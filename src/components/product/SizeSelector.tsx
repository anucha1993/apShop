"use client";

import { cn } from "@/lib/format";
import { stockOf } from "@/lib/product";
import type { ProductColor, Size } from "@/types/product";

const LOW_STOCK = 3;

interface SizeSelectorProps {
  sizes: Size[];
  color: ProductColor;
  selected: Size | null;
  onSelect: (size: Size) => void;
  error?: boolean;
}

export function SizeSelector({ sizes, color, selected, onSelect, error }: SizeSelectorProps) {
  const selectedStock = selected ? stockOf(color, selected) : 0;

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => {
          const stock = stockOf(color, size);
          const soldOut = stock === 0;
          const active = size === selected;
          return (
            <button
              key={size}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(size)}
              aria-pressed={active}
              aria-label={soldOut ? `${size} (สินค้าหมด)` : size}
              className={cn(
                "relative h-11 border text-sm transition-colors",
                active
                  ? "border-ink bg-ink text-white"
                  : error
                    ? "border-red-400 hover:border-ink"
                    : "border-line hover:border-ink",
                soldOut &&
                  "cursor-not-allowed border-line bg-stone-50 text-stone-400 hover:border-line",
              )}
            >
              {size}
              {soldOut && (
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),#d6d3d1_50%,transparent_calc(50%+0.5px))]"
                />
              )}
            </button>
          );
        })}
      </div>
      <p className={cn("mt-2 min-h-5 text-xs", error ? "text-red-600" : "text-muted")}>
        {error
          ? "กรุณาเลือกไซส์"
          : selected && selectedStock <= LOW_STOCK
            ? `เหลือเพียง ${selectedStock} ชิ้น`
            : sizes.every((s) => stockOf(color, s) === 0)
              ? "สีนี้สินค้าหมดทุกไซส์"
              : sizes.some((s) => stockOf(color, s) === 0)
                ? "ไซส์ที่มีขีดฆ่าคือสินค้าหมด"
                : ""}
      </p>
    </div>
  );
}
