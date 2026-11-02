import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { loginUser, registerUser, updateUser } from "@/lib/auth-service";
import type { ProfileUpdate, RegisterInput, User } from "@/types/user";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  updateProfile: (patch: ProfileUpdate) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email, password) => {
        const user = await loginUser(email, password);
        set({ user });
        return user;
      },

      register: async (input) => {
        const user = await registerUser(input);
        set({ user });
        return user;
      },

      updateProfile: async (patch) => {
        const current = get().user;
        if (!current) return;
        set({ user: await updateUser(current.email, patch) });
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "apshop-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      // Rehydrated on the client by <StoreHydrator /> to avoid SSR mismatches.
      skipHydration: true,
    },
  ),
);

/** True once the persisted session has been loaded, so guards don't redirect too early. */
export function useAuthReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const unsubscribe = useAuth.persist.onFinishHydration(() => setReady(true));
    setReady(useAuth.persist.hasHydrated());
    return unsubscribe;
  }, []);
  return ready;
}

/** Only allows same-site relative paths as post-login redirects. */
export const safeNext = (next: string | null) =>
  next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
