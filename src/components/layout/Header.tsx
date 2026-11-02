"use client";

import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CATEGORIES } from "@/data/catalog-options";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/format";
import { useAuth } from "@/store/auth";
import { selectItemCount, useCart } from "@/store/cart";
import { useWishlistIds } from "@/store/wishlist";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const count = useCart(selectItemCount);
  const user = useAuth((s) => s.user);
  const likedCount = useWishlistIds().length;
  const openCart = useCart((s) => s.openCart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  };

  const linkClass = (href: string) =>
    cn(
      "text-[13px] uppercase tracking-wide transition-opacity hover:opacity-60",
      (href === "/" ? pathname === "/" : pathname.startsWith(href)) && "underline underline-offset-8",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: mobile menu / desktop nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="เปิดเมนู"
            className="-ml-2 p-2 lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(0, 2).map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            <div className="group relative">
              <button className="flex items-center gap-1 text-[13px] uppercase tracking-wide hover:opacity-60">
                หมวดหมู่ <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="min-w-44 border border-line bg-white py-2 shadow-sm">
                  {CATEGORIES.map((c) => (
                    <li key={c.value}>
                      <Link
                        href={`/shop?category=${c.value}`}
                        className="block px-5 py-2.5 text-sm hover:bg-stone-50"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-line pt-1">
                    <Link href="/shop" className="block px-5 py-2.5 text-sm hover:bg-stone-50">
                      ดูทั้งหมด
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/about" className={linkClass("/about")}>
              เกี่ยวกับเรา
            </Link>
          </nav>
        </div>

        {/* Center: logo */}
        <Link href="/" className="font-display text-xl font-semibold tracking-[0.35em] sm:text-2xl">
          APSHOP
        </Link>

        {/* Right: search + account + wishlist + cart (account/wishlist live in the mobile menu on small screens) */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="ค้นหา"
            className="p-2 hover:opacity-60"
          >
            {searchOpen ? <X className="size-5" strokeWidth={1.5} /> : <Search className="size-5" strokeWidth={1.5} />}
          </button>
          <Link
            href={user ? "/account" : "/login"}
            aria-label={user ? `บัญชีของ ${user.name}` : "เข้าสู่ระบบ"}
            title={user ? user.name : "เข้าสู่ระบบ / สมัครสมาชิก"}
            className="hidden items-center gap-2 p-2 hover:opacity-60 sm:flex"
          >
            <User className="size-5" strokeWidth={1.5} />
            <span className="hidden max-w-28 truncate text-[13px] xl:inline">
              {user ? user.name.split(" ")[0] : "เข้าสู่ระบบ"}
            </span>
          </Link>
          <Link
            href="/wishlist"
            aria-label={`สินค้าที่ถูกใจ ${likedCount} รายการ`}
            className="relative hidden p-2 hover:opacity-60 sm:block"
          >
            <Heart className="size-5" strokeWidth={1.5} />
            {likedCount > 0 && <CountBadge value={likedCount} />}
          </Link>
          <button
            onClick={openCart}
            aria-label={`ตะกร้าสินค้า ${count} ชิ้น`}
            className="relative -mr-2 p-2 hover:opacity-60"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && <CountBadge value={count} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div
        className={cn(
          "overflow-hidden border-line transition-[max-height] duration-300",
          searchOpen ? "max-h-24 border-t" : "max-h-0",
        )}
      >
        <form onSubmit={submitSearch} className="container-page flex items-center gap-3 py-4">
          <Search className="size-4 shrink-0 text-muted" strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า เช่น เสื้อยืด, เดรส, แจ็กเก็ต"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <button type="submit" className="text-xs uppercase tracking-wide hover:opacity-60">
            ค้นหา
          </button>
        </form>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-white">
      {value > 99 ? "99" : value}
    </span>
  );
}
