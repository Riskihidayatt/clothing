"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Product, ProductBadge } from "@/data/products";
import { SafeImage } from "@/components/ui/SafeImage";
import { useCart } from "@/components/providers/CartProvider";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/cn";

const badgeStyles: Record<ProductBadge, { label: string; className: string }> = {
  new: { label: "New", className: "bg-acid text-ink" },
  "sold-out": { label: "Sold Out", className: "bg-bone text-ink" },
  "low-stock": { label: "Low Stock", className: "border border-acid bg-ink text-acid" },
};

const sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.badge === "sold-out";
  const badge = product.badge ? badgeStyles[product.badge] : null;

  const handleAdd = () => {
    addItem(product.name);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-2">
        <SafeImage
          src={product.image}
          alt={`${product.alt} — tampak depan`}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0 group-focus-within:opacity-0",
            soldOut && "grayscale",
          )}
        />
        <SafeImage
          src={product.imageAlt}
          alt={`${product.alt} — tampak belakang`}
          fill
          sizes={sizes}
          className={cn(
            "object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-focus-within:opacity-100",
            soldOut && "grayscale",
          )}
        />

        {badge && (
          <span
            className={cn(
              "absolute left-2 top-2 z-10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] sm:left-3 sm:top-3",
              badge.className,
            )}
          >
            {badge.label}
          </span>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          aria-label={soldOut ? `${product.name} sudah sold out` : `Tambah ${product.name} ke keranjang`}
          className={cn(
            "absolute inset-x-2 bottom-2 z-10 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 sm:inset-x-3 sm:bottom-3",
            "md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100",
            soldOut ? "cursor-not-allowed bg-ink/80 text-smoke" : "bg-bone text-ink hover:bg-acid",
          )}
        >
          {soldOut ? (
            "Sold Out"
          ) : added ? (
            <>
              <Check className="h-4 w-4" aria-hidden /> Masuk keranjang
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" aria-hidden /> Quick Add
            </>
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="text-sm font-medium uppercase leading-snug tracking-wide sm:text-base">{product.name}</h3>
        <p className={cn("shrink-0 font-mono text-sm", soldOut ? "text-smoke line-through" : "text-acid")}>
          {formatRupiah(product.price)}
        </p>
      </div>
    </article>
  );
}
