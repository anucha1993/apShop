# APSHOP — Storefront (Phase 1)

เว็บร้านขายเสื้อผ้าออนไลน์สไตล์มินิมอล/พรีเมียม ส่วนหน้าร้านสำหรับลูกค้า

**Tech stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zustand (เก็บตะกร้าใน localStorage) · lucide-react (ไอคอน)

## การติดตั้งและรัน

ต้องมี Node.js 18.18 ขึ้นไป (แนะนำ 20+)

```bash
npm install        # ติดตั้ง dependencies
npm run dev        # โหมดพัฒนา → http://localhost:3000

npm run build      # build สำหรับ production
npm start          # รัน production build

npm run lint       # ตรวจ TypeScript
```

> รูปสินค้าโหลดจาก images.unsplash.com และฟอนต์จาก Google Fonts จึงต้องต่ออินเทอร์เน็ตตอน dev/build

## ฟีเจอร์

| ส่วน | รายละเอียด |
| --- | --- |
| Header | โลโก้, เมนู (หน้าแรก / ร้านค้า / หมวดหมู่ dropdown / เกี่ยวกับเรา), ช่องค้นหา, ไอคอนตะกร้าพร้อมตัวเลข, เมนูแบบสไลด์บนมือถือ |
| หน้าแรก | Hero แบนเนอร์ + ปุ่ม "ช้อปเลย", สินค้ามาใหม่, หมวดหมู่, แบนเนอร์ editorial |
| ร้านค้า `/shop` | กรองตามหมวดหมู่ / ไซส์ / สี / ช่วงราคา, เรียงตามมาใหม่หรือราคา, ค้นหา; ตัวกรองเก็บใน URL (แชร์ลิงก์ได้) |
| การ์ดสินค้า | Hover เปลี่ยนเป็นรูปที่สอง, ปุ่ม "ดูด่วน" (Quick View), สลับสีด้วย swatch, ป้าย ใหม่/ลดราคา/หมด |
| รายละเอียดสินค้า `/product/[slug]` | แกลเลอรีหลายรูป, เลือกสี, เลือกไซส์พร้อมสถานะสต็อก (ไซส์หมดถูกขีดฆ่า, แจ้งเตือนเหลือน้อย), เลือกจำนวน, "เพิ่มลงตะกร้า" และ "ซื้อเลย" |
| ตะกร้า (Drawer) | ปรับจำนวน (จำกัดตามสต็อก), ลบสินค้า, ยอดรวม, แถบความคืบหน้าส่งฟรี, ปุ่ม "ดำเนินการชำระเงิน" → `/checkout` |
| `/checkout` | หน้าสรุปคำสั่งซื้อ (placeholder สำหรับ Payment Gateway ใน Phase 2) |
| สมาชิก `/login` `/register` `/account` | สมัคร/เข้าสู่ระบบ/ออกจากระบบ, ตรวจสอบฟอร์ม, กันอีเมลซ้ำ, แก้ไขชื่อและเบอร์โทร, หน้าที่ต้องล็อกอินจะพาไปหน้า login แล้วกลับมาที่เดิม |
| ถูกใจสินค้า `/wishlist` | ปุ่มหัวใจบนการ์ดสินค้า, Quick View และหน้าสินค้า; ตัวเลขบน Header; ถ้ายังไม่ล็อกอินจะพาไปล็อกอินแล้วบันทึกสินค้าชิ้นนั้นให้อัตโนมัติ; รายการถูกใจแยกตามบัญชี |

> **หมายเหตุระบบสมาชิก (Phase 1):** ยังไม่มี backend — บัญชีผู้ใช้เก็บใน localStorage ของเบราว์เซอร์ (รหัสผ่านเก็บเป็น SHA-256 hash) จึงใช้ได้เฉพาะเบราว์เซอร์เครื่องนั้น
> ตรรกะทั้งหมดอยู่ใน `src/lib/auth-service.ts` เมื่อมี API จริงให้แทนที่ฟังก์ชันในไฟล์นั้นด้วย `fetch()` (และย้ายการ hash รหัสผ่านไปทำฝั่ง server ด้วย bcrypt/argon2)

## โครงสร้างโปรเจกต์

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Header, Footer, CartDrawer, QuickView, ฟอนต์
│   ├── page.tsx              # หน้าแรก
│   ├── shop/page.tsx         # แค็ตตาล็อก + ตัวกรอง
│   ├── product/[slug]/       # หน้ารายละเอียดสินค้า (SSG)
│   ├── about/  checkout/
│   └── globals.css           # Design tokens (สี, ฟอนต์, ปุ่ม, animation)
├── components/
│   ├── layout/               # Header, MobileMenu, Footer
│   ├── home/                 # Hero, CategoryTiles, EditorialBanner
│   ├── shop/                 # ShopView, FilterPanel, ActiveFilters, SortSelect
│   ├── product/              # ProductCard, ProductGrid, ProductDetail, Gallery,
│   │                         # ColorSwatches, SizeSelector, QuantitySelector, QuickViewModal
│   ├── cart/                 # CartDrawer, CartLine
│   ├── account/              # LoginForm, RegisterForm, AccountView, WishlistView, RequireAuth
│   ├── StoreHydrator.tsx     # โหลด state ที่เก็บไว้ (ตะกร้า, session, wishlist) หลัง mount
│   └── ui/                   # Drawer, Modal, TextField (ใช้ซ้ำได้)
├── data/
│   ├── products.ts           # Mock data สินค้า 14 รายการ (สี, รูป, สต็อกต่อไซส์)
│   ├── catalog-options.ts    # หมวดหมู่, ไซส์, กลุ่มสี, ช่วงราคา, ตัวเลือกการเรียง
│   └── navigation.ts
├── lib/                      # catalog.ts (filter/sort/URL), product.ts (สต็อก), format.ts,
│                             # auth-service.ts (mock API สมาชิก — จุดเปลี่ยนเป็น backend จริง)
├── store/                    # cart.ts, auth.ts (session), wishlist.ts (ถูกใจ), ui.ts (Quick View)
├── hooks/useOverlay.ts       # ล็อกการเลื่อน + ปิดด้วย Esc
└── types/product.ts
```

## การแก้ไขข้อมูลสินค้า

แก้ใน `src/data/products.ts` — สต็อกกำหนดแยกตาม **สี × ไซส์** ผ่านฟิลด์ `stock` (ค่า 0 หรือไม่ใส่ = หมด)

## เตรียมไว้สำหรับ Phase ถัดไป

- `data/products.ts` แทนที่ด้วยการเรียก API/ฐานข้อมูลได้ทันที (โครงสร้าง type อยู่ใน `types/product.ts`)
- ตะกร้าเก็บ `productId`, สี, ไซส์ และ `maxQuantity` ต่อรายการ พร้อมส่งไปสร้าง order
- `/checkout` เป็นจุดเชื่อม Payment Gateway (Phase 2) และระบบ Inventory/Admin (Phase 3)
