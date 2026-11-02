"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { useWishlistIds } from "@/store/wishlist";
import { RequireAuth } from "./RequireAuth";

export function WishlistView() {
  return (
    <RequireAuth>
      {() => <Wishlist />}
    </RequireAuth>
  );
}

function Wishlist() {
  const ids = useWishlistIds();
  // Keep the order in which items were liked (newest first).
  const liked = ids.flatMap((id) => products.find((p) => p.id === id) ?? []);

  return (
    <div className="container-page pt-12 sm:pt-16">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Wishlist</p>
      <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">สินค้าที่ถูกใจ</h1>
      <p className="mt-2 text-sm text-muted">{liked.length} รายการ</p>

      {liked.length > 0 ? (
        <div className="mt-10">
          <ProductGrid products={liked} />
        </div>
      ) : (
        <div className="flex flex-col items-center py-24 text-center">
          <Heart className="size-10 text-muted" strokeWidth={1} />
          <p className="mt-4 font-display text-xl">ยังไม่มีสินค้าที่ถูกใจ</p>
          <p className="mt-2 text-sm text-muted">กดรูปหัวใจบนสินค้าเพื่อบันทึกไว้ดูภายหลัง</p>
          <Link href="/shop" className="btn-primary mt-6">
            เลือกชมสินค้า
          </Link>
        </div>
      )}
    </div>
  );
}
