import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/products";

export function EditorialBanner() {
  return (
    <section className="container-page mt-20 sm:mt-28">
      <div className="grid items-center gap-8 bg-stone-100 md:grid-cols-2 md:gap-0">
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[480px]">
          <Image src={IMAGES.editorial} alt="ตู้เสื้อผ้าพื้นฐาน" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="px-6 pb-10 md:px-14 md:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">The Essentials</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
            ตู้เสื้อผ้าที่น้อยแต่มาก
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            ชิ้นพื้นฐานที่เลือกวัสดุอย่างพิถีพิถัน ผสมผสานกันได้ไม่รู้จบ
            ลงทุนครั้งเดียวแต่ใส่ได้หลายปี — นี่คือหัวใจของ APSHOP
          </p>
          <Link href="/shop?category=unisex" className="btn-primary mt-8">
            ดูคอลเลกชันพื้นฐาน
          </Link>
        </div>
      </div>
    </section>
  );
}
