"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { cn, formatPrice } from "@/lib/format";
import { discountPercent, findColor, isNew, isSoldOut } from "@/lib/product";
import { useUI } from "@/store/ui";
import type { Product } from "@/types/product";
import { ColorSwatches } from "./ColorSwatches";
import { LikeButton } from "./LikeButton";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const openQuickView = useUI((s) => s.openQuickView);
  const [colorName, setColorName] = useState(product.colors[0].name);
  const color = findColor(product, colorName);
  const [primary, secondary] = color.images;
  const href = `/product/${product.slug}?color=${encodeURIComponent(color.name)}`;
  const soldOut = isSoldOut(product);
  const discount = discountPercent(product);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={primary}
            alt={`${product.name} สี ${color.name}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={cn(
              "object-cover transition duration-700 ease-out",
              secondary ? "group-hover:opacity-0" : "group-hover:scale-105",
            )}
          />
          {secondary && (
            <Image
              src={secondary}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition duration-700 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col gap-1">
          {soldOut ? (
            <Badge>สินค้าหมด</Badge>
          ) : (
            <>
              {isNew(product) && <Badge>ใหม่</Badge>}
              {discount > 0 && <Badge tone="sale">-{discount}%</Badge>}
            </>
          )}
        </div>

        <LikeButton productId={product.id} productName={product.name} className="absolute right-2 top-2" />

        <button
          onClick={() => openQuickView(product.slug)}
          className="absolute inset-x-2 bottom-2 hidden items-center justify-center gap-2 bg-white/90 py-2.5 text-xs uppercase tracking-wide backdrop-blur transition duration-300 hover:bg-white md:flex md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Eye className="size-3.5" /> ดูด่วน
        </button>
        <button
          onClick={() => openQuickView(product.slug)}
          aria-label={`ดูด่วน ${product.name}`}
          className="absolute bottom-2 right-2 rounded-full bg-white/90 p-2 md:hidden"
        >
          <Eye className="size-4" />
        </button>
      </div>

      <div className="mt-3 space-y-1.5">
        <Link href={href} className="block text-sm leading-snug hover:underline">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 text-sm">
          <span className={cn(discount > 0 && "text-red-700")}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        {product.colors.length > 1 ? (
          <ColorSwatches size="sm" colors={product.colors} selected={color.name} onSelect={setColorName} />
        ) : (
          <p className="text-xs text-muted">{color.name}</p>
        )}
      </div>
    </article>
  );
}

function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "sale" }) {
  return (
    <span
      className={cn(
        "px-2 py-1 text-[10px] font-medium uppercase tracking-wide",
        tone === "sale" ? "bg-red-700 text-white" : "bg-white text-ink",
      )}
    >
      {children}
    </span>
  );
}
