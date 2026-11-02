export type Category = "men" | "women" | "unisex";

export type Size = "S" | "M" | "L" | "XL";

/** Colour family used by the catalog filter (one product colour maps to one family). */
export type ColorFamily =
  | "black"
  | "white"
  | "beige"
  | "grey"
  | "blue"
  | "navy"
  | "brown"
  | "green"
  | "pink"
  | "orange";

export interface ProductColor {
  name: string;
  hex: string;
  family: ColorFamily;
  images: string[];
  /** Units in stock per size. A missing size or 0 means sold out. */
  stock: Partial<Record<Size, number>>;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  description: string;
  material: string;
  care: string[];
  sizes: Size[];
  colors: ProductColor[];
  /** ISO date, used for "newest" sorting. */
  createdAt: string;
}
