import type { Metadata } from "next";
import { WishlistView } from "@/components/account/WishlistView";

export const metadata: Metadata = { title: "สินค้าที่ถูกใจ" };

export default function WishlistPage() {
  return <WishlistView />;
}
