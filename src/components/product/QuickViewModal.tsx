"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { getProductBySlug } from "@/data/products";
import { useUI } from "@/store/ui";
import { ProductDetail } from "./ProductDetail";

export function QuickViewModal() {
  const pathname = usePathname();
  const slug = useUI((s) => s.quickViewSlug);
  const close = useUI((s) => s.closeQuickView);
  const product = slug ? getProductBySlug(slug) : undefined;

  // Close when navigating away (e.g. a guest liking a product is sent to /login).
  useEffect(() => close(), [pathname, close]);

  return (
    <Modal open={!!product} onClose={close} label={product ? `ดูด่วน ${product.name}` : "ดูด่วน"}>
      {product && <ProductDetail key={product.id} product={product} variant="modal" onNavigate={close} />}
    </Modal>
  );
}
