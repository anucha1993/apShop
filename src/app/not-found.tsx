import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="mt-3 font-display text-3xl">ไม่พบหน้าที่คุณต้องการ</h1>
      <Link href="/shop" className="btn-primary mt-8">กลับไปที่ร้านค้า</Link>
    </div>
  );
}
