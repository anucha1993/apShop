import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/products";

export const metadata: Metadata = { title: "เกี่ยวกับเรา" };

const VALUES = [
  ["ออกแบบให้อยู่นาน", "เราเลือกทรงที่ไม่ตามกระแส เพื่อให้ทุกชิ้นใส่ได้หลายปีโดยไม่ตกยุค"],
  ["วัสดุที่ดีกว่า", "คัดสรรเส้นใยธรรมชาติและผ้าคุณภาพสูงจากโรงงานที่ได้มาตรฐาน"],
  ["ผลิตอย่างรับผิดชอบ", "ผลิตจำนวนจำกัดเพื่อลดของเหลือทิ้ง และดูแลแรงงานอย่างเป็นธรรม"],
];

export default function AboutPage() {
  return (
    <div className="container-page pt-12 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Our Story</p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
          เสื้อผ้าที่ดี ไม่จำเป็นต้องซับซ้อน
        </h1>
        <p className="mt-6 leading-relaxed text-muted">
          APSHOP เริ่มต้นจากความเชื่อว่าตู้เสื้อผ้าที่ดีควรเต็มไปด้วยชิ้นที่คุณหยิบใส่ซ้ำได้ทุกสัปดาห์
          เราจึงตั้งใจออกแบบเสื้อผ้าที่เรียบง่าย สวมสบาย และตัดเย็บอย่างประณีต
        </p>
      </div>

      <div className="relative mt-14 aspect-[16/9] overflow-hidden bg-stone-200">
        <Image src={IMAGES.editorial} alt="สตูดิโอ APSHOP" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {VALUES.map(([title, body], i) => (
          <div key={title}>
            <p className="font-display text-3xl text-muted">0{i + 1}</p>
            <h2 className="mt-3 text-sm font-medium uppercase tracking-wide">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link href="/shop" className="btn-primary">เลือกชมสินค้า</Link>
      </div>
    </div>
  );
}
