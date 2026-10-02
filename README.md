# KALCER — Streetwear Landing Page

Landing page untuk brand streetwear lokal (placeholder: **KALCER**). Target: Gen Z 17–28 tahun, mobile-first.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · lucide-react · Vitest + Testing Library

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Build & jalankan production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types + `tsc --noEmit` |
| `npm test` | Unit + component test (Vitest) |

## Kustomisasi cepat

| Mau ganti apa | File |
|---|---|
| Nama brand, tagline, sosmed, kontak, **tanggal & jumlah drop** | `src/config/site.ts` |
| Warna, font, animasi marquee, grain | `src/app/globals.css` (`@theme`) + `src/app/layout.tsx` (font) |
| Produk (nama, harga, label New/Sold Out, foto depan/belakang) | `src/data/products.ts` |
| Foto hero/drop/story | `src/data/images.ts` |
| Lookbook, UGC, testimoni | `src/data/lookbook.ts`, `community.ts`, `testimonials.ts` |
| Copy tiap section | `src/components/sections/*.tsx` |

Gambar saat ini placeholder dari Unsplash. Kalau ada URL yang mati, `SafeImage` otomatis menampilkan fallback bergaya brand (bukan ikon gambar rusak). Untuk foto lokal, taruh di `public/images/` lalu pakai path `/images/nama.jpg`.

## Struktur

```
src/
├── app/
│   ├── layout.tsx              # font (Anton, Space Grotesk, Space Mono), metadata, skip-link, grain
│   ├── page.tsx                # susunan section landing page
│   ├── globals.css             # design tokens (@theme), grain overlay, marquee keyframes
│   └── api/subscribe/route.ts  # POST newsletter (validasi + honeypot)
├── config/site.ts              # identitas brand & jadwal drop
├── data/                       # konten: produk, lookbook, UGC, testimoni, gambar
├── components/
│   ├── layout/                 # Navbar (sticky, transparan di atas hero), Footer
│   ├── sections/               # Hero, Marquee, LimitedDrop(+DropCountdown), FeaturedCollection(+ProductCard),
│   │                           # Lookbook, BrandStory, Community, Testimonials, Newsletter
│   ├── ui/                     # Reveal, SafeImage, SectionHeading, Button
│   ├── icons/SocialIcons.tsx   # Instagram & TikTok (tidak ada di lucide)
│   └── providers/              # MotionConfig (reduced motion) + CartProvider
├── hooks/                      # useCountdown, useScrolledPast
├── lib/                        # formatRupiah, getTimeLeft, validateEmail, image loader, cn
└── test/setup.tsx              # setup Vitest
```

## Catatan

- **Performa:** server components secara default; JS client hanya untuk bagian interaktif. Gambar `next/image` lazy (kecuali hero yang di-preload) dengan `sizes` responsif; resize dilakukan CDN via `src/lib/image-loader.ts`.
- **Aksesibilitas:** skip link, landmark & heading berurutan, alt text di semua gambar, `focus-visible` lime, menu mobile bisa ditutup dengan Esc, live region untuk keranjang & form, `prefers-reduced-motion` dihormati (marquee berhenti, parallax mati).
- **Newsletter:** `/api/subscribe` baru memvalidasi. Sebelum produksi: sambungkan ke email provider dan tambahkan rate limiting (lihat TODO di file route).
