"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { CATEGORIES, COLOR_FAMILIES, PRICE_RANGES, SIZES } from "@/data/catalog-options";
import type { CatalogFilters } from "@/lib/catalog";
import { cn } from "@/lib/format";

interface FilterPanelProps {
  filters: CatalogFilters;
  onChange: (next: Partial<CatalogFilters>) => void;
}

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  return (
    <div className="divide-y divide-line">
      <FilterGroup title="หมวดหมู่">
        <div className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <CheckRow
              key={c.value}
              label={c.label}
              checked={filters.categories.includes(c.value)}
              onToggle={() => onChange({ categories: toggle(filters.categories, c.value) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="ไซส์">
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                aria-pressed={active}
                onClick={() => onChange({ sizes: toggle(filters.sizes, s) })}
                className={cn(
                  "h-10 border text-sm transition-colors",
                  active ? "border-ink bg-ink text-white" : "border-line hover:border-ink",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="สี">
        <div className="grid grid-cols-5 gap-y-4">
          {COLOR_FAMILIES.map((c) => {
            const active = filters.colors.includes(c.value);
            return (
              <button
                key={c.value}
                aria-pressed={active}
                onClick={() => onChange({ colors: toggle(filters.colors, c.value) })}
                className="flex flex-col items-center gap-1.5 text-[11px]"
              >
                <span
                  className={cn(
                    "rounded-full p-0.5 ring-1 transition",
                    active ? "ring-ink" : "ring-transparent hover:ring-line",
                  )}
                >
                  <span
                    className="block size-6 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                </span>
                <span className={cn(active ? "text-ink" : "text-muted")}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="ช่วงราคา">
        <div className="space-y-2.5">
          {PRICE_RANGES.map((r) => (
            <CheckRow
              key={r.value}
              radio
              label={r.label}
              checked={filters.price === r.value}
              onToggle={() => onChange({ price: filters.price === r.value ? null : r.value })}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-6 first:pt-0">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-wide">{title}</h3>
      {children}
    </section>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
  radio,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  radio?: boolean;
}) {
  return (
    <button
      role={radio ? "radio" : "checkbox"}
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-center gap-3 text-left text-sm hover:opacity-70"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border transition-colors",
          radio && "rounded-full",
          checked ? "border-ink bg-ink text-white" : "border-stone-300",
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}
