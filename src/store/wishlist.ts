import { usePathname, useRouter } from "next/navigation";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuth } from "./auth";

interface WishlistState {
  /** Liked product ids per user id. */
  byUser: Record<string, string[]>;
  /** Product a guest tried to like; saved once they log in. */
  pending: string | null;
  toggle: (userId: string, productId: string) => void;
  setPending: (productId: string | null) => void;
  /** Called after login/registration to save the guest's pending like. */
  flushPending: (userId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      byUser: {},
      pending: null,

      toggle: (userId, productId) =>
        set((state) => {
          const ids = state.byUser[userId] ?? [];
          const next = ids.includes(productId)
            ? ids.filter((id) => id !== productId)
            : [productId, ...ids];
          return { byUser: { ...state.byUser, [userId]: next } };
        }),

      setPending: (productId) => set({ pending: productId }),

      flushPending: (userId) => {
        const { pending, byUser } = get();
        if (!pending) return;
        const ids = byUser[userId] ?? [];
        set({
          pending: null,
          byUser: ids.includes(pending) ? byUser : { ...byUser, [userId]: [pending, ...ids] },
        });
      },
    }),
    {
      name: "apshop-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ byUser: state.byUser, pending: state.pending }),
      skipHydration: true,
    },
  ),
);

const EMPTY: string[] = [];

/** Current user's liked product ids (empty for guests). */
export function useWishlistIds() {
  const userId = useAuth((s) => s.user?.id);
  return useWishlistStore((s) => (userId ? (s.byUser[userId] ?? EMPTY) : EMPTY));
}

/** Like/unlike for the current user; guests are sent to login and the like is kept for after. */
export function useLike(productId: string) {
  const router = useRouter();
  const pathname = usePathname();
  const userId = useAuth((s) => s.user?.id);
  const liked = useWishlistIds().includes(productId);
  const toggle = useWishlistStore((s) => s.toggle);
  const setPending = useWishlistStore((s) => s.setPending);

  const toggleLike = () => {
    if (userId) {
      toggle(userId, productId);
      return;
    }
    setPending(productId);
    router.push(`/login?reason=wishlist&next=${encodeURIComponent(pathname)}`);
  };

  return { liked, toggleLike };
}
