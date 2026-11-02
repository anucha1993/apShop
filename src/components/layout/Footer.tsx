import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORIES } from "@/data/catalog-options";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-stone-50">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.35em]">APSHOP</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            เสื้อผ้าเรียบง่าย ตัดเย็บอย่างตั้งใจ ออกแบบมาเพื่อใส่ได้นานหลายฤดูกาล
          </p>
        </div>
        <FooterCol title="ช้อป">
          {CATEGORIES.map((c) => (
            <Link key={c.value} href={`/shop?category=${c.value}`}>
              {c.label}
            </Link>
          ))}
          <Link href="/shop?sort=newest">มาใหม่</Link>
        </FooterCol>
        <FooterCol title="ช่วยเหลือ">
          <span>การจัดส่ง</span>
          <span>การคืนและเปลี่ยนสินค้า</span>
          <span>คู่มือเลือกไซส์</span>
          <span>ติดต่อเรา</span>
        </FooterCol>
        <FooterCol title="จดหมายข่าว">
          <p className="text-muted">รับข่าวคอลเลกชันใหม่และสิทธิพิเศษก่อนใคร</p>
          <form className="mt-2 flex border-b border-ink">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted"
            />
            <button type="button" className="text-xs uppercase tracking-wide">
              สมัคร
            </button>
          </form>
        </FooterCol>
      </div>
      <div className="container-page border-t border-line py-6 text-xs text-muted">
        © {new Date().getFullYear()} APSHOP. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide">{title}</p>
      <div className="mt-4 flex flex-col gap-2.5 text-sm [&_a:hover]:underline">{children}</div>
    </div>
  );
}
