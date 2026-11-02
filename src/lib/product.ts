import { products } from "@/data/products";
import type { Product, ProductColor, Size } from "@/types/product";

/** A product is "new" if it was added within 30 days of the newest item in the catalog. */
const NEW_WINDOW_DAYS = 30;
const NEWEST_DATE = Math.max(...products.map((p) => new Date(p.createdAt).getTime()));

export const stockOf = (color: ProductColor, size: Size) => color.stock[size] ?? 0;

export const totalStock = (product: Product) =>
  product.colors.reduce(
    (sum, c) => sum + Object.values(c.stock).reduce((a, n) => a + (n ?? 0), 0),
    0,
  );

export const isSoldOut = (product: Product) => totalStock(product) === 0;

export const isNew = (product: Product) =>
  (NEWEST_DATE - new Date(product.createdAt).getTime()) / 86_400_000 <= NEW_WINDOW_DAYS;

export const discountPercent = (product: Product) =>
  product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

export const findColor = (product: Product, name?: string | null) =>
  product.colors.find((c) => c.name === name) ?? product.colors[0];
