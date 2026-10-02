/**
 * Placeholder photography (Unsplash). Ganti dengan foto produk/model asli
 * — cukup ubah URL di file ini dan di file data lainnya.
 */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const heroImage = {
  src: unsplash("1523398002811-999ca8dec234"),
  alt: "Model memakai hoodie hitam oversized dan celana kargo di jalanan kota pada malam hari",
};

export const dropImage = {
  src: unsplash("1551028719-00167b16eac5"),
  alt: "Close-up jaket hitam dari koleksi Night Shift dengan latar gelap",
};

export const storyImage = {
  src: unsplash("1490481651871-ab68de25d43d"),
  alt: "Rak baju di studio produksi berisi tumpukan kaos dan jaket",
};
