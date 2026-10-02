import { describe, expect, it } from "vitest";
import { formatRupiah, padTwo } from "./format";

describe("formatRupiah", () => {
  it("formats with Indonesian thousand separators", () => {
    expect(formatRupiah(349_000)).toBe("Rp 349.000");
    expect(formatRupiah(1_250_000)).toBe("Rp 1.250.000");
  });

  it("handles zero", () => {
    expect(formatRupiah(0)).toBe("Rp 0");
  });
});

describe("padTwo", () => {
  it("pads single digits and clamps negatives to 00", () => {
    expect(padTwo(7)).toBe("07");
    expect(padTwo(42)).toBe("42");
    expect(padTwo(-3)).toBe("00");
  });
});
