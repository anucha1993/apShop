"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { formatPrice } from "@/lib/format";
import { useCart, type CartItem } from "@/store/cart";

export function CartLine({ item }: { item: CartItem }) {
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const closeCart = useCart((s) => s.closeCart);

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${item.slug}?color=${encodeURIComponent(item.color)}`}
        onClick={closeCart}
        className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-stone-100"
      >
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <p className="text-sm font-medium leading-snug">{item.name}</p>
          <p className="shrink-0 text-sm">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="mt-1 text-xs text-muted">
          สี: {item.color} · ไซส์: {item.size}
        </p>
        {item.quantity > 1 && (
          <p className="mt-0.5 text-xs text-muted">{formatPrice(item.price)} / ชิ้น</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            max={item.maxQuantity}
            onChange={(q) => updateQuantity(item.key, q)}
          />
          <button
            onClick={() => removeItem(item.key)}
            className="text-xs text-muted underline underline-offset-4 hover:text-ink"
          >
            ลบ
          </button>
        </div>
      </div>
    </li>
  );
}
