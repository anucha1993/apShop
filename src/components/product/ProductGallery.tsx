"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/format";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

export function ProductGallery({ images, alt, priority }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  // Clamp in case the image list shrinks after a colour change.
  const current = Math.min(index, images.length - 1);
  const go = (delta: number) => setIndex((current + delta + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 && (
        <div className="flex gap-2 md:flex-col">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              aria-label={`ดูรูปที่ ${i + 1}`}
              className={cn(
                "relative aspect-[3/4] w-16 overflow-hidden bg-stone-100 transition-opacity md:w-20",
                i === current ? "ring-1 ring-ink" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="group relative aspect-[3/4] flex-1 overflow-hidden bg-stone-100">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} รูปที่ ${i + 1}`}
            fill
            priority={priority && i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === current ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {images.length > 1 && (
          <>
            <GalleryArrow side="left" onClick={() => go(-1)} />
            <GalleryArrow side="right" onClick={() => go(1)} />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 px-2 py-0.5 text-[11px] tabular-nums">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "รูปก่อนหน้า" : "รูปถัดไป"}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 bg-white/80 p-2 opacity-100 transition-opacity hover:bg-white md:opacity-0 md:group-hover:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
