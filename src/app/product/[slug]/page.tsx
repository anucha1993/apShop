import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CATEGORIES } from "@/data/catalog-options";
import { getProductBySlug, products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const { color } = await searchParams;

  const category = CATEGORIES.find((c) => c.value === product.category)!;
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
    .slice(0, 4);

  return (
    <div className="container-page pt-6 sm:pt-10">
      <nav aria-label="breadcrumb" className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-ink">หน้าแรก</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${category.value}`} className="hover:text-ink">{category.label}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductDetail key={product.id} product={product} initialColor={color} />

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="section-title">คุณอาจจะชอบ</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
