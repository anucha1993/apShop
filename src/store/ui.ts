import { create } from "zustand";

interface UIState {
  quickViewSlug: string | null;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

export const useUI = create<UIState>()((set) => ({
  quickViewSlug: null,
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
