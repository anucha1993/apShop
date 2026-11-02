"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { CATEGORIES } from "@/data/catalog-options";
import { products } from "@/data/products";
import {
  applyFilters,
  countActiveFilters,
  parseFilters,
  toQueryString,
  type CatalogFilters,
} from "@/lib/catalog";
import { ActiveFilters } from "./ActiveFilters";
import { FilterPanel } from "./FilterPanel";
import { SortSelect } from "./SortSelect";

/** Catalog page. The URL is the single source of truth for filters, so results are shareable. */
export function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const results = useMemo(() => applyFilters(products, filters), [filters]);
  const activeCount = countActiveFilters(filters);

  const update = (next: Partial<CatalogFilters>) =>
    router.replace(`${pathname}${toQueryString({ ...filters, ...next })}`, { scroll: false });
  const clearAll = () => update({ q: "", categories: [], sizes: [], colors: [], price: null });

  const title =
    filters.categories.length === 1
      ? `เสื้อผ้า${CATEGORIES.find((c) => c.value === filters.categories[0])!.label}`
      : filters.q
        ? `ผลการค้นหา “${filters.q}”`
        : "สินค้าทั้งหมด";

  return (
    <div className="container-page pt-8 sm:pt-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wide text-muted">ร้านค้า</p>
        <h1 className="mt-2 font-display text-3xl font-medium sm:text-4xl">{title}</h1>
      </div>

      <div className="sticky top-16 z-30 -mx-4 mb-6 flex items-center justify-between border-y border-line bg-white/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-x-0 lg:px-0">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 py-3 text-sm lg:hidden"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.5} />
          ตัวกรอง{activeCount > 0 && ` (${activeCount})`}
        </button>
        <p className="hidden py-3 text-sm text-muted lg:block">{results.length} รายการ</p>
        <SortSelect value={filters.sort} onChange={(sort) => update({ sort })} />
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={update} />
          </div>
        </aside>

        <div>
          <div className="mb-6 empty:hidden">
            <ActiveFilters filters={filters} onChange={update} onClear={clearAll} />
          </div>
          {results.length > 0 ? (
            <ProductGrid products={results} columns={3} />
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="font-display text-xl">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
              <p className="mt-2 text-sm text-muted">ลองปรับตัวกรองหรือค้นหาด้วยคำอื่น</p>
              <button onClick={clearAll} className="btn-secondary mt-6">
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        side="left"
        title="ตัวกรอง"
        footer={
          <div className="grid grid-cols-2 gap-3">
            <button onClick={clearAll} className="btn-secondary">
              ล้าง
            </button>
            <button onClick={() => setFiltersOpen(false)} className="btn-primary">
              ดู {results.length} รายการ
            </button>
          </div>
        }
      >
        <div className="p-5">
          <FilterPanel filters={filters} onChange={update} />
        </div>
      </Drawer>
    </div>
  );
}
