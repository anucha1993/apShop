"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/format";
import { useLike } from "@/store/wishlist";

interface LikeButtonProps {
  productId: string;
  productName: string;
  /** "overlay" sits on a product image; "square" sits beside the Add to Bag button. */
  variant?: "overlay" | "square";
  className?: string;
}

export function LikeButton({ productId, productName, variant = "overlay", className }: LikeButtonProps) {
  const { liked, toggleLike } = useLike(productId);

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? `เลิกถูกใจ ${productName}` : `ถูกใจ ${productName}`}
      title={liked ? "เลิกถูกใจ" : "ถูกใจ"}
      className={cn(
        "group/like flex items-center justify-center transition-colors",
        variant === "overlay"
          ? "rounded-full bg-white/90 p-2 backdrop-blur hover:bg-white"
          : "size-12 shrink-0 border border-line hover:border-ink",
        className,
      )}
    >
      <Heart
        strokeWidth={1.5}
        className={cn(
          "size-4 transition-transform group-active/like:scale-75",
          variant === "square" && "size-5",
          liked ? "fill-red-600 stroke-red-600" : "group-hover/like:scale-110",
        )}
      />
    </button>
  );
}
