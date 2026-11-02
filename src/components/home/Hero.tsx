import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/products";

export function Hero() {
  return (
    <section className="relative h-[calc(100svh-4rem)] min-h-[520px] overflow-hidden bg-stone-200">
      <Image
        src={IMAGES.hero}
        alt="คอลเลกชันฤดูหนาว 2026"
        fill
        priority
        sizes="100vw"
        className="animate-hero-zoom object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="container-page relative flex h-full flex-col justify-end pb-14 text-white sm:pb-20">
        <p className="animate-fade-up text-xs uppercase tracking-[0.3em]">Autumn / Winter 2026</p>
        <h1 className="animate-fade-up mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.1] [animation-delay:100ms] sm:text-6xl lg:text-7xl">
          ความเรียบง่าย
          <br />
          ที่อยู่เหนือกาลเวลา
        </h1>
        <p className="animate-fade-up mt-5 max-w-md text-sm leading-relaxed text-white/85 [animation-delay:200ms] sm:text-base">
          เลเยอร์อุ่น ๆ โทนสีธรรมชาติ และโครงทรงที่ตัดเย็บอย่างประณีต สำหรับทุกวันของฤดูกาลใหม่
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:300ms]">
          <Link href="/shop" className="btn-primary bg-white text-ink hover:bg-white/85">
            ช้อปเลย
          </Link>
          <Link href="/shop?category=women" className="btn-outline-light">
            คอลเลกชันผู้หญิง
          </Link>
        </div>
      </div>
    </section>
  );
}
