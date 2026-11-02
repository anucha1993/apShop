"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useOverlay } from "@/hooks/useOverlay";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}

export function Modal({ open, onClose, label, children }: ModalProps) {
  useOverlay(open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div onClick={onClose} className="animate-fade-in absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="animate-slide-up relative max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white sm:max-h-[85vh]"
      >
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-3 top-3 z-10 bg-white/80 p-2 backdrop-blur hover:opacity-60"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>
  );
}
