"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { formatPrice } from "@/lib/format";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  selectItemCount,
  selectSubtotal,
  useCart,
} from "@/store/cart";
import { CartLine } from "./CartLine";

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCart();
  const count = useCart(selectItemCount);
  const subtotal = useCart(selectSubtotal);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = items.length === 0 || remaining === 0 ? 0 : SHIPPING_FEE;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={`ตะกร้าสินค้า (${count})`}
      footer={
        items.length > 0 && (
          <div className="space-y-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">ยอดรวมสินค้า</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">ค่าจัดส่ง</dt>
                <dd>{shipping === 0 ? "ฟรี" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
                <dt>ยอดชำระทั้งหมด</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
              ดำเนินการชำระเงิน
            </Link>
            <button onClick={closeCart} className="w-full text-xs uppercase tracking-wide underline-offset-4 hover:underline">
              เลือกซื้อสินค้าต่อ
            </button>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <ShoppingBag className="size-10 text-muted" strokeWidth={1} />
          <p className="text-sm text-muted">ยังไม่มีสินค้าในตะกร้า</p>
          <Link href="/shop" onClick={closeCart} className="btn-primary">
            เริ่มช้อปเลย
          </Link>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-5 py-4 text-xs">
            <p>
              {remaining > 0
                ? `ซื้อเพิ่มอีก ${formatPrice(remaining)} เพื่อรับสิทธิ์จัดส่งฟรี`
                : "คุณได้รับสิทธิ์จัดส่งฟรี"}
            </p>
            <div className="mt-2 h-0.5 bg-line">
              <div className="h-full bg-ink transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <ul className="divide-y divide-line px-5">
            {items.map((item) => (
              <CartLine key={item.key} item={item} />
            ))}
          </ul>
        </>
      )}
    </Drawer>
  );
}
