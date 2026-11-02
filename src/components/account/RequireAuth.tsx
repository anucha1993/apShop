"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { useAuth, useAuthReady } from "@/store/auth";
import type { User } from "@/types/user";

/** Renders children only for signed-in members; guests are redirected to /login and back. */
export function RequireAuth({ children }: { children: (user: User) => ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const ready = useAuthReady();
  const user = useAuth((s) => s.user);
  // After a logout on this page the caller handles navigation, so only redirect visitors who arrived signed out.
  const wasSignedIn = useRef(false);
  if (user) wasSignedIn.current = true;

  useEffect(() => {
    if (ready && !user && !wasSignedIn.current) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, pathname, router]);

  if (!ready || !user) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <span className="size-6 animate-spin rounded-full border-2 border-line border-t-ink" />
      </div>
    );
  }
  return <>{children(user)}</>;
}
