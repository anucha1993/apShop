"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

/** Loads persisted stores after mount so server and client markup match on first render. */
export function StoreHydrator() {
  useEffect(() => {
    useCart.persist.rehydrate();
    useAuth.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);
  return null;
}
