import { validateEmail } from "@/lib/validation";

/**
 * POST /api/subscribe
 * Request:  { email: string, company?: string }   // `company` = honeypot, must stay empty
 * Response: 201 { ok: true, message } | 400 { ok: false, error } | 415/500 { ok: false, error }
 *
 * Public endpoint (no auth). TODO before production:
 *  - forward the email to the mailing provider (Mailchimp/Brevo/Resend) via a server-only env var
 *  - add rate limiting per IP (e.g. Upstash Ratelimit / edge middleware)
 */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, error: "Content-Type harus application/json." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Request body tidak valid." }, { status: 400 });
  }

  const data = (body ?? {}) as { email?: unknown; company?: unknown };

  // Bots fill every field; humans never see this one. Pretend success.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return Response.json({ ok: true, message: "Welcome to the club." }, { status: 201 });
  }

  const result = validateEmail(data.email);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  // Placeholder: persist / forward `result.email` here.
  return Response.json(
    { ok: true, message: "You're in. Cek inbox buat akses early drop." },
    { status: 201 },
  );
}
