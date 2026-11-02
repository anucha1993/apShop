"use client";

import { X } from "lucide-react";
import { CATEGORIES, COLOR_FAMILIES, PRICE_RANGES } from "@/data/catalog-options";
import type { CatalogFilters } from "@/lib/catalog";

interface ActiveFiltersProps {
  filters: CatalogFilters;
  onChange: (next: Partial<CatalogFilters>) => void;
  onClear: () => void;
}

export function ActiveFilters({ filters, onChange, onClear }: ActiveFiltersProps) {
  const chips = [
    ...(filters.q ? [{ label: `“${filters.q}”`, remove: () => onChange({ q: "" }) }] : []),
    ...filters.categories.map((v) => ({
      label: CATEGORIES.find((c) => c.value === v)!.label,
      remove: () => onChange({ categories: filters.categories.filter((x) => x !== v) }),
    })),
    ...filters.sizes.map((v) => ({
      label: `ไซส์ ${v}`,
      remove: () => onChange({ sizes: filters.sizes.filter((x) => x !== v) }),
    })),
    ...filters.colors.map((v) => ({
      label: COLOR_FAMILIES.find((c) => c.value === v)!.label,
      remove: () => onChange({ colors: filters.colors.filter((x) => x !== v) }),
    })),
    ...(filters.price
      ? [
          {
            label: PRICE_RANGES.find((r) => r.value === filters.price)!.label,
            remove: () => onChange({ price: null }),
          },
        ]
      : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.remove}
          className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs hover:border-ink"
        >
          {chip.label} <X className="size-3" />
        </button>
      ))}
      <button onClick={onClear} className="px-2 text-xs underline underline-offset-4 hover:opacity-60">
        ล้างทั้งหมด
      </button>
    </div>
  );
}
