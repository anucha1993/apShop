import type { Product } from "@/types/product";

export function ProductAccordion({ product }: { product: Product }) {
  const sections = [
    { title: "รายละเอียดสินค้า", body: <p>{product.description}</p>, open: true },
    {
      title: "วัสดุและการดูแล",
      body: (
        <>
          <p>{product.material}</p>
          <ul className="mt-2 list-inside list-disc">
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "การจัดส่งและการคืนสินค้า",
      body: (
        <p>
          จัดส่งฟรีเมื่อซื้อครบ ฿1,500 ภายใน 2–4 วันทำการ เปลี่ยนหรือคืนสินค้าได้ภายใน 30
          วันหากสินค้ายังไม่ผ่านการใช้งานและป้ายยังอยู่ครบ
        </p>
      ),
    },
  ];

  return (
    <div className="mt-10 border-t border-line">
      {sections.map((s) => (
        <details key={s.title} open={s.open} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm [&::-webkit-details-marker]:hidden">
            {s.title}
            <span className="text-lg leading-none text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="pb-5 text-sm leading-relaxed text-muted">{s.body}</div>
        </details>
      ))}
    </div>
  );
}
