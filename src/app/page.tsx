import Link from "next/link";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

const newArrivals = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-page mt-20 sm:mt-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">New In</p>
            <h2 className="section-title mt-2">สินค้ามาใหม่</h2>
          </div>
          <Link href="/shop" className="shrink-0 text-xs uppercase tracking-wide underline underline-offset-4 hover:opacity-60">
            ดูทั้งหมด
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <CategoryTiles />
      <EditorialBanner />

      <section className="container-page mt-20 grid gap-8 border-y border-line py-12 text-center sm:mt-28 sm:grid-cols-3">
        {[
          ["จัดส่งฟรี", "เมื่อซื้อครบ ฿1,500"],
          ["คืนสินค้าได้ 30 วัน", "เปลี่ยนไซส์ได้ไม่มีค่าใช้จ่าย"],
          ["ชำระเงินปลอดภัย", "รองรับบัตรและพร้อมเพย์"],
        ].map(([title, sub]) => (
          <div key={title}>
            <p className="text-sm font-medium uppercase tracking-wide">{title}</p>
            <p className="mt-1 text-sm text-muted">{sub}</p>
          </div>
        ))}
      </section>
    </>
  );
}
