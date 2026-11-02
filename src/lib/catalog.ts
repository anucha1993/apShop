import {
  CATEGORIES,
  COLOR_FAMILIES,
  PRICE_RANGES,
  SIZES,
  SORT_OPTIONS,
  type PriceRange,
  type SortOption,
} from "@/data/catalog-options";
import type { Category, ColorFamily, Product, Size } from "@/types/product";

export interface CatalogFilters {
  q: string;
  categories: Category[];
  sizes: Size[];
  colors: ColorFamily[];
  price: PriceRange | null;
  sort: SortOption;
}

type ParamsLike = { get(name: string): string | null };

const list = <T extends string>(raw: string | null, allowed: readonly T[]) =>
  (raw ?? "").split(",").filter((v): v is T => (allowed as readonly string[]).includes(v));

/** Reads filters from URL search params, ignoring unknown values. */
export function parseFilters(params: ParamsLike): CatalogFilters {
  const price = params.get("price");
  const sort = params.get("sort");
  return {
    q: params.get("q")?.trim() ?? "",
    categories: list(params.get("category"), CATEGORIES.map((c) => c.value)),
    sizes: list(params.get("size"), SIZES),
    colors: list(params.get("color"), COLOR_FAMILIES.map((c) => c.value)),
    price: PRICE_RANGES.find((r) => r.value === price)?.value ?? null,
    sort: SORT_OPTIONS.find((s) => s.value === sort)?.value ?? "newest",
  };
}

/** Serialises filters back to a query string, omitting defaults. */
export function toQueryString(f: CatalogFilters) {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.categories.length) params.set("category", f.categories.join(","));
  if (f.sizes.length) params.set("size", f.sizes.join(","));
  if (f.colors.length) params.set("color", f.colors.join(","));
  if (f.price) params.set("price", f.price);
  if (f.sort !== "newest") params.set("sort", f.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function countActiveFilters(f: CatalogFilters) {
  return f.categories.length + f.sizes.length + f.colors.length + (f.price ? 1 : 0);
}

export function applyFilters(products: Product[], f: CatalogFilters) {
  const q = f.q.toLowerCase();
  const range = PRICE_RANGES.find((r) => r.value === f.price);

  const result = products.filter((p) => {
    if (q && !`${p.name} ${p.type} ${p.description}`.toLowerCase().includes(q)) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (range && (p.price < range.min || p.price > range.max)) return false;
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c.family))) return false;
    // A size matches only if at least one colour still has it in stock.
    if (
      f.sizes.length &&
      !f.sizes.some((s) => p.colors.some((c) => (c.stock[s] ?? 0) > 0))
    )
      return false;
    return true;
  });

  return result.sort((a, b) => {
    if (f.sort === "price-asc") return a.price - b.price;
    if (f.sort === "price-desc") return b.price - a.price;
    return b.createdAt.localeCompare(a.createdAt);
  });
}
