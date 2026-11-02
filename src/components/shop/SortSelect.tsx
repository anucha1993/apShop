"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortOption } from "@/data/catalog-options";

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <label className="relative flex items-center gap-2 text-sm">
      <span className="hidden text-muted sm:inline">เรียงตาม</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="cursor-pointer appearance-none bg-transparent py-2 pl-1 pr-6 outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 size-4" />
    </label>
  );
}
