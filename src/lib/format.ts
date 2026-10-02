const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** 349000 -> "Rp 349.000" (ICU emits a non-breaking space; normalise it). */
export function formatRupiah(amount: number): string {
  return rupiahFormatter.format(amount).replace(/^Rp\s*/, "Rp ");
}

/** 7 -> "07" */
export function padTwo(value: number): string {
  return String(Math.max(0, value)).padStart(2, "0");
}
