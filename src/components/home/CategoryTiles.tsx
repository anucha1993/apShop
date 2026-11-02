import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/products";

const TILES = [
  { href: "/shop?category=women", label: "ผู้หญิง", image: IMAGES.women },
  { href: "/shop?category=men", label: "ผู้ชาย", image: IMAGES.men },
  { href: "/shop?category=unisex", label: "ยูนิเซ็กส์", image: IMAGES.unisex },
];

export function CategoryTiles() {
  return (
    <section className="container-page mt-20 sm:mt-28">
      <h2 className="section-title">เลือกช้อปตามหมวดหมู่</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-5">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href} className="group relative aspect-[4/5] overflow-hidden bg-stone-200 sm:aspect-[3/4]">
            <Image
              src={t.image}
              alt={t.label}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white">
              <span className="font-display text-2xl">{t.label}</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
