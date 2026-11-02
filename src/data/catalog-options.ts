import type { Category, ColorFamily, Size } from "@/types/product";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "women", label: "ผู้หญิง" },
  { value: "men", label: "ผู้ชาย" },
  { value: "unisex", label: "ยูนิเซ็กส์" },
];

export const SIZES: Size[] = ["S", "M", "L", "XL"];

export const COLOR_FAMILIES: { value: ColorFamily; label: string; hex: string }[] = [
  { value: "black", label: "ดำ", hex: "#111111" },
  { value: "white", label: "ขาว", hex: "#f5f5f2" },
  { value: "beige", label: "เบจ", hex: "#d9c8a9" },
  { value: "grey", label: "เทา", hex: "#9a9a9a" },
  { value: "blue", label: "ฟ้า", hex: "#8fb3d9" },
  { value: "navy", label: "กรมท่า", hex: "#1f2a44" },
  { value: "brown", label: "น้ำตาล", hex: "#9a5b3c" },
  { value: "green", label: "เขียว", hex: "#5b6142" },
  { value: "pink", label: "ชมพู", hex: "#e3b7ad" },
  { value: "orange", label: "ส้ม", hex: "#e8782a" },
];

export const PRICE_RANGES = [
  { value: "0-990", label: "ต่ำกว่า ฿990", min: 0, max: 989 },
  { value: "990-1990", label: "฿990 – ฿1,990", min: 990, max: 1990 },
  { value: "1991-3990", label: "฿1,991 – ฿3,990", min: 1991, max: 3990 },
  { value: "3991-up", label: "มากกว่า ฿3,990", min: 3991, max: Infinity },
] as const;

export type PriceRange = (typeof PRICE_RANGES)[number]["value"];

export const SORT_OPTIONS = [
  { value: "newest", label: "มาใหม่ล่าสุด" },
  { value: "price-asc", label: "ราคา: น้อยไปมาก" },
  { value: "price-desc", label: "ราคา: มากไปน้อย" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
