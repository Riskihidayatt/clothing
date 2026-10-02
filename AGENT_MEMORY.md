# AGENT MEMORY — KALCER Landing Page

> File ini WAJIB dibaca AI agent di awal sesi kerja, dan WAJIB diupdate di akhir sesi setelah fitur selesai+ditest.
> Terakhir diupdate: 2026-10-02 oleh sesi: initial build landing page

## 1. Ringkasan Project
- Landing page satu halaman untuk brand streetwear lokal (nama placeholder "KALCER", ganti di `src/config/site.ts`).
- Target: Gen Z 17–28, mayoritas traffic mobile. Copy: Bahasa Indonesia santai + English slang.
- Stack: Next.js 16.3 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 (config via `@theme` di `globals.css`, tidak ada `tailwind.config`), `motion` v14 (import dari `motion/react`), `lucide-react`, Vitest + Testing Library.
- Single repo, kode di `src/`. Lihat struktur di README.md.

## 2. Keputusan Arsitektur
- Konten (produk, lookbook, UGC, testimoni) di `src/data/*.ts` statis, belum ada CMS/backend — cukup buat landing page; nanti ganti ke fetch di server component.
- Section default = server component; `"use client"` hanya untuk yang interaktif (Navbar, Hero parallax, FeaturedCollection/ProductCard, DropCountdown, Newsletter, SafeImage, Reveal).
- `LimitedDrop` (server) memformat tanggal drop; `DropCountdown` (client) hanya angka timer → menghindari hydration mismatch dari perbedaan ICU server vs browser.
- Gambar via `next/image` + custom loader (`src/lib/image-loader.ts`) yang resize lewat CDN Unsplash; tidak lewat optimizer Next.
- `SafeImage` = next/image + fallback branded saat onError (placeholder URL bisa mati).
- Mobile menu dirender DI LUAR `<header>`: header pakai `backdrop-filter` yang jadi containing block untuk elemen `fixed` di dalamnya (overlay jadi tinggi 0). Jangan dipindah balik.
- Next 16: pakai prop `preload` (bukan `priority`) di next/image. `LayoutProps` global hasil `next typegen`.

## 3. Konvensi
- Warna token: `ink` #0a0a0a, `ink-2` #141414, `bone` #f2efe9, `acid` #c6ff00, `smoke` #a3a3a3. Teks lime di atas bone dilarang (kontras jelek) → `SectionHeading tone="light"`.
- Font: `font-display` Anton, `font-sans` Space Grotesk, `font-mono` Space Mono.
- Icon: lucide-react; Instagram/TikTok di `components/icons/SocialIcons.tsx`. **Tidak ada emoji di UI.**
- Animasi reveal pakai `<Reveal>`; `MotionConfig reducedMotion="user"` di `AppProviders`.
- API error format: `{ ok: false, error: string }`, sukses `{ ok: true, message }`.
- Validasi email dipakai bersama FE & BE: `src/lib/validation.ts`.

## 4. Status Fitur
| Fitur | Status | Catatan |
|---|---|---|
| 11 section landing page | Done, tested | lint + typecheck + build OK, dicek visual desktop/mobile via Playwright |
| Countdown drop | Done, tested | `DropCountdown.test.tsx`, `countdown.test.ts` |
| Grid produk + filter + quick add | Done, tested | `FeaturedCollection.test.tsx`; keranjang = counter client-side saja |
| Newsletter + `POST /api/subscribe` | Done (stub), tested | Belum terhubung ke email provider |

## 5. Next step yang disarankan
- Ganti foto placeholder dengan foto produk asli (front/back) dan nama brand final.
- Sambungkan `/api/subscribe` ke Mailchimp/Brevo/Resend + rate limiting per IP.
- Cart/checkout sungguhan (Shopify Storefront / Midtrans) menggantikan `CartProvider`.
- Halaman detail produk (`/shop/[slug]`).

## 6. Known issues / hutang teknis
- Sandbox cloud memblokir images.unsplash.com, jadi screenshot di sana menampilkan fallback; di browser user normal.
- Testimoni & angka statistik (12K+ members, 4.9/5) masih dummy.

## 7. Catatan untuk agent berikutnya
- Jalankan `npm run lint && npm run typecheck && npm test && npm run build` sebelum commit (CI menjalankan hal yang sama).
- Baca `node_modules/next/dist/docs/` sebelum memakai API Next yang belum dikenal (lihat AGENTS.md).
- Tidak ada env var wajib; lihat `.env.example`.
