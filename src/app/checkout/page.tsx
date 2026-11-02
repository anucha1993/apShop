"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, selectSubtotal, useCart } from "@/store/cart";

/** Phase 1 placeholder: shows the order summary. Payment gateway arrives in Phase 2. */
export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : SHIPPING_FEE;

  return (
    <div className="container-page max-w-3xl pt-12">
      <h1 className="section-title">ชำระเงิน</h1>
      <p className="mt-3 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ระบบชำระเงิน (Payment Gateway) จะเปิดใช้งานใน Phase 2 — ด้านล่างคือสรุปคำสั่งซื้อของคุณ
      </p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted">ตะกร้าของคุณว่างอยู่</p>
          <Link href="/shop" className="btn-primary mt-6">เลือกซื้อสินค้า</Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-4 py-4">
                <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-stone-100">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.color} · {item.size} · x{item.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="ml-auto mt-6 max-w-xs space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">ยอดรวมสินค้า</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">ค่าจัดส่ง</dt><dd>{shipping ? formatPrice(shipping) : "ฟรี"}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-medium"><dt>ยอดชำระทั้งหมด</dt><dd>{formatPrice(subtotal + shipping)}</dd></div>
          </dl>
          <button disabled className="btn-primary mt-8 w-full">ชำระเงิน (เร็ว ๆ นี้)</button>
        </>
      )}
    </div>
  );
}
