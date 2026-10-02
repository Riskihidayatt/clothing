/**
 * Single source of truth for brand identity.
 * Ganti nama brand, handle sosmed, kontak, dan jadwal drop di sini.
 */
export const siteConfig = {
  name: "KALCER",
  tagline: "Wear the noise.",
  description:
    "KALCER — streetwear lokal limited run. Bold, raw, dan dibuat buat yang nggak mau kelihatan sama.",
  url: "https://kalcer.id",
  handle: "@kalcer.id",
  email: "hello@kalcer.id",
  whatsapp: "+62 812-0000-0000",
  whatsappLink: "https://wa.me/6281200000000",
  address: "Jl. Braga No. 00, Bandung, Jawa Barat",
  foundedYear: 2021,
  socials: {
    instagram: "https://instagram.com/kalcer.id",
    tiktok: "https://tiktok.com/@kalcer.id",
  },
  nextDrop: {
    name: "DROP 07 — NIGHT SHIFT",
    // ISO timestamp with WIB offset. Update tiap ada drop baru.
    date: "2026-11-11T19:00:00+07:00",
    quantity: 100,
  },
} as const;

export const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Drops", href: "#drops" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "About", href: "#about" },
] as const;
