import type { ImageLoaderProps } from "next/image";

/** Asks the image CDN (Unsplash) for the exact width next/image needs; local paths are served as-is. */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.toString();
}
