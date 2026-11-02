"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/data/catalog-options";
import { cn, formatPrice } from "@/lib/format";
import { discountPercent, findColor, stockOf } from "@/lib/product";
import { useCart } from "@/store/cart";
import type { Product, Size } from "@/types/product";
import { ColorSwatches } from "./ColorSwatches";
import { LikeButton } from "./LikeButton";
import { ProductAccordion } from "./ProductAccordion";
import { ProductGallery } from "./ProductGallery";
import { QuantitySelector } from "./QuantitySelector";
import { SizeSelector } from "./SizeSelector";

interface ProductDetailProps {
  product: Product;
  initialColor?: string;
  /** "modal" renders a compact layout for Quick View. */
  variant?: "page" | "modal";
  onNavigate?: () => void;
}

export function ProductDetail({ product, initialColor, variant = "page", onNavigate }: ProductDetailProps) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const [colorName, setColorName] = useState(findColor(product, initialColor).name);
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const color = findColor(product, colorName);
  const stock = size ? stockOf(color, size) : 0;
  const colorSoldOut = product.sizes.every((s) => stockOf(color, s) === 0);
  const discount = discountPercent(product);
  const categoryLabel = CATEGORIES.find((c) => c.value === product.category)?.label;

  const selectColor = (name: string) => {
    setColorName(name);
    const next = findColor(product, name);
    // Keep the chosen size only if it is still available in the new colour.
    if (size && stockOf(next, size) === 0) setSize(null);
    else if (size) setQuantity((q) => Math.min(q, stockOf(next, size)));
  };

  const selectSize = (s: Size) => {
    setSize(s);
    setSizeError(false);
    setQuantity((q) => Math.min(q, stockOf(color, s)));
  };

  const addToBag = () => {
    if (!size) {
      setSizeError(true);
      return false;
    }
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: color.images[0],
        color: color.name,
        size,
        maxQuantity: stock,
      },
      quantity,
    );
    return true;
  };

  const handleAdd = () => {
    if (!addToBag()) return;
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    onNavigate?.();
    openCart();
  };

  const handleBuyNow = () => {
    if (!addToBag()) return;
    onNavigate?.();
    router.push("/checkout");
  };

  const isModal = variant === "modal";

  return (
    <div className={cn("grid gap-8", isModal ? "md:grid-cols-2 md:gap-0" : "lg:grid-cols-[1.25fr_1fr] lg:gap-16")}>
      <div className={cn(isModal && "md:p-6")}>
        <ProductGallery key={color.name} images={color.images} alt={product.name} priority={!isModal} />
      </div>

      <div className={cn("flex flex-col", isModal ? "px-5 pb-8 md:py-10 md:pr-10" : "lg:sticky lg:top-24 lg:self-start")}>
        <p className="text-xs uppercase tracking-wide text-muted">
          {categoryLabel} · {product.type}
        </p>
        <h1 className={cn("mt-2 font-display font-medium", isModal ? "text-2xl" : "text-2xl sm:text-3xl")}>
          {product.name}
        </h1>
        <div className="mt-3 flex items-baseline gap-3">
          <span className={cn("text-lg", discount > 0 && "text-red-700")}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
              <span className="text-xs text-red-700">-{discount}%</span>
            </>
          )}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm">
            สี: <span className="text-muted">{color.name}</span>
          </p>
          <ColorSwatches colors={product.colors} selected={color.name} onSelect={selectColor} />
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>ไซส์{size && <span className="text-muted">: {size}</span>}</span>
            <button type="button" className="text-xs text-muted underline underline-offset-4 hover:text-ink">
              คู่มือเลือกไซส์
            </button>
          </div>
          <SizeSelector
            sizes={product.sizes}
            color={color}
            selected={size}
            onSelect={selectSize}
            error={sizeError}
          />
        </div>

        <div className="mt-4">
          <p className="mb-3 text-sm">จำนวน</p>
          <QuantitySelector
            value={quantity}
            max={size ? stock : 1}
            onChange={setQuantity}
            disabled={!size}
          />
        </div>

        <div className="mt-8 grid gap-3">
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={colorSoldOut} className="btn-primary flex-1">
              {colorSoldOut ? (
                "สินค้าหมด"
              ) : justAdded ? (
                <>
                  <Check className="size-4" /> เพิ่มแล้ว
                </>
              ) : (
                "เพิ่มลงตะกร้า"
              )}
            </button>
            <LikeButton productId={product.id} productName={product.name} variant="square" />
          </div>
          <button onClick={handleBuyNow} disabled={colorSoldOut} className="btn-secondary">
            ซื้อเลย
          </button>
        </div>

        {isModal ? (
          <Link
            href={`/product/${product.slug}?color=${encodeURIComponent(color.name)}`}
            onClick={onNavigate}
            className="mt-6 text-center text-xs uppercase tracking-wide underline underline-offset-4 hover:opacity-60"
          >
            ดูรายละเอียดสินค้าทั้งหมด
          </Link>
        ) : (
          <ProductAccordion product={product} />
        )}
      </div>
    </div>
  );
}
