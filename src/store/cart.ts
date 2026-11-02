import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Size } from "@/types/product";

export interface CartItem {
  /** productId + colour + size; one line per variant. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: Size;
  quantity: number;
  /** Stock available for this variant at the time it was added. */
  maxQuantity: number;
}

export type NewCartItem = Omit<CartItem, "key" | "quantity">;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: NewCartItem, quantity: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const variantKey = (productId: string, color: string, size: Size) =>
  `${productId}:${color}:${size}`;

const clamp = (n: number, max: number) => Math.max(1, Math.min(n, max));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity) =>
        set((state) => {
          const key = variantKey(item.productId, item.color, item.size);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: clamp(i.quantity + quantity, item.maxQuantity) }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, key, quantity: clamp(quantity, item.maxQuantity) }],
          };
        }),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clamp(quantity, i.maxQuantity) } : i,
          ),
        })),

      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "apshop-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      // Rehydrated on the client by <CartHydrator /> to avoid SSR mismatches.
      skipHydration: true,
    },
  ),
);

export const selectItemCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const FREE_SHIPPING_THRESHOLD = 1500;
export const SHIPPING_FEE = 50;
