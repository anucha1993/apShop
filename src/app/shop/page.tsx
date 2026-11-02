import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop/ShopView";

export const metadata: Metadata = { title: "ร้านค้า" };

export default function ShopPage() {
  // ShopView reads the URL with useSearchParams, which needs a Suspense boundary.
  return (
    <Suspense fallback={<div className="container-page min-h-[60vh] pt-12" />}>
      <ShopView />
    </Suspense>
  );
}
