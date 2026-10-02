"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { categories, products, type ProductCategory } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

export function FeaturedCollection() {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section id="shop" aria-labelledby="shop-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="shop-title"
          eyebrow="Featured collection"
          title={
            <>
              Fresh off <span className="text-outline">the</span> rack
            </>
          }
          action={
            <div role="group" aria-label="Filter kategori" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  aria-pressed={active === cat.value}
                  onClick={() => setActive(cat.value)}
                  className={cn(
                    "shrink-0 border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
                    active === cat.value
                      ? "border-acid bg-acid text-ink"
                      : "border-bone/20 text-bone/80 hover:border-bone hover:text-bone",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          }
        />

        <motion.ul layout className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((product, i) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="#shop" variant="outline">
            Lihat semua produk
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
