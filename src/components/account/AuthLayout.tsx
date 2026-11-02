import type { ReactNode } from "react";

/** Centered single-column shell shared by the login and register pages. */
export function AuthLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="container-page flex justify-center pt-12 sm:pt-20">
      <div className="w-full max-w-sm">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
        <h1 className="mt-3 text-center font-display text-3xl font-medium">{title}</h1>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
