import { describe, expect, it } from "vitest";
import { validateEmail } from "./validation";

describe("validateEmail", () => {
  it("accepts and normalises a valid email", () => {
    expect(validateEmail("  Raka@Mail.COM ")).toEqual({ ok: true, email: "raka@mail.com" });
  });

  it.each<[unknown, string]>([
    ["", "kosong"],
    ["   ", "spasi"],
    [undefined, "undefined"],
    [123, "angka"],
  ])("rejects empty / non-string input (%s — %s)", (input) => {
    expect(validateEmail(input).ok).toBe(false);
  });

  it.each(["raka", "raka@", "raka@mail", "ra ka@mail.com", "raka@mail.c"])("rejects malformed email %s", (input) => {
    expect(validateEmail(input).ok).toBe(false);
  });

  it("rejects emails longer than 254 chars", () => {
    expect(validateEmail(`${"a".repeat(250)}@x.com`).ok).toBe(false);
  });
});
