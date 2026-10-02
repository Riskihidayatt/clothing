"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/cn";

export function Navbar() {
  const solid = useScrolledPast(0.85);
  const [open, setOpen] = useState(false);
  const { count, lastAdded } = useCart();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Mobile menu: lock scroll, focus first link, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          solid || open
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent",
        )}
      >
        <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          <Link href="#top" className="font-display text-2xl tracking-wide md:text-3xl" aria-label={`${siteConfig.name} — kembali ke atas`}>
            {siteConfig.name}
            <sup className="ml-0.5 align-super text-[0.5em] text-acid">®</sup>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-bone after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-acid after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <Link
              href="#shop"
              className="relative flex h-11 w-11 items-center justify-center transition-colors hover:text-acid"
              aria-label={`Keranjang, ${count} item`}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-acid px-1 font-mono text-[10px] font-bold text-ink"
                    aria-hidden
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </nav>
      </header>

      {/* Lives outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink md:hidden"
          >
            <ul className="flex flex-col gap-2 px-4 pt-8">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-bone/10 py-4 font-display text-6xl uppercase transition-colors hover:text-acid focus-visible:text-acid"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="px-4 pt-8 font-mono text-xs uppercase tracking-[0.3em] text-smoke">{siteConfig.handle}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen-reader announcement for quick-add */}
      <p className="sr-only" aria-live="polite">
        {lastAdded ? `${lastAdded} ditambahkan ke keranjang. Total ${count} item.` : ""}
      </p>
    </>
  );
}
