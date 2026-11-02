"use client";

import { Heart, User } from "lucide-react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { CATEGORIES } from "@/data/catalog-options";
import { NAV_LINKS } from "@/data/navigation";
import { useAuth } from "@/store/auth";
import { useWishlistIds } from "@/store/wishlist";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const user = useAuth((s) => s.user);
  const likedCount = useWishlistIds().length;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      title="เมนู"
      footer={
        <div className="space-y-4 text-sm">
          <Link href={user ? "/account" : "/login"} onClick={onClose} className="flex items-center gap-3">
            <User className="size-5" strokeWidth={1.5} />
            {user ? `บัญชีของฉัน (${user.name})` : "เข้าสู่ระบบ / สมัครสมาชิก"}
          </Link>
          <Link href="/wishlist" onClick={onClose} className="flex items-center gap-3">
            <Heart className="size-5" strokeWidth={1.5} />
            สินค้าที่ถูกใจ{likedCount > 0 && ` (${likedCount})`}
          </Link>
        </div>
      }
    >
      <nav className="flex flex-col px-5 py-6">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose} className="py-3 text-lg">
            {l.label}
          </Link>
        ))}
        <p className="mt-8 text-xs uppercase tracking-wide text-muted">หมวดหมู่</p>
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/shop?category=${c.value}`}
            onClick={onClose}
            className="py-3 text-lg"
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </Drawer>
  );
}
