"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useOverlay } from "@/hooks/useOverlay";
import { cn } from "@/lib/format";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function Drawer({ open, onClose, side = "right", title, children, footer }: DrawerProps) {
  useOverlay(open, onClose);

  return (
    <div
      className={cn("fixed inset-0 z-50 overflow-hidden", !open && "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-out",
          side === "right" ? "right-0" : "left-0",
          open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="text-sm font-medium uppercase tracking-wide">{title}</div>
          <button onClick={onClose} aria-label="ปิด" className="-mr-2 p-2 hover:opacity-60">
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <footer className="border-t border-line p-5">{footer}</footer>}
      </aside>
    </div>
  );
}
