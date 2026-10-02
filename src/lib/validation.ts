// Shared by the newsletter form (client) and /api/subscribe (server)
// so both sides enforce the exact same rule.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const EMAIL_MAX_LENGTH = 254;

export type EmailValidation = { ok: true; email: string } | { ok: false; error: string };

export function validateEmail(input: unknown): EmailValidation {
  if (typeof input !== "string" || input.trim() === "") {
    return { ok: false, error: "Email-nya diisi dulu ya." };
  }
  const email = input.trim().toLowerCase();
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Format email-nya belum bener, cek lagi deh." };
  }
  return { ok: true, email };
}
