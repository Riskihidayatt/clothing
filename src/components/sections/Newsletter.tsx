"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle, Lock, Mail } from "lucide-react";
import { validateEmail, EMAIL_MAX_LENGTH } from "@/lib/validation";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const perks = ["Akses early drop 24 jam lebih dulu", "Diskon member-only", "Voting desain drop berikutnya"];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "loading") return;

    const result = validateEmail(email);
    if (!result.ok) {
      setStatus({ state: "error", message: result.error });
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("company");
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.email, company: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; message?: string; error?: string } | null;
      if (res.ok && data?.ok) {
        setStatus({ state: "success", message: data.message ?? "You're in." });
        setEmail("");
      } else if (res.status < 500 && data?.error) {
        setStatus({ state: "error", message: data.error });
      } else {
        setStatus({ state: "error", message: "Server lagi sibuk. Coba lagi bentar ya." });
      }
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Cek internet lo terus coba lagi." });
    }
  }

  const isError = status.state === "error";

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="relative overflow-hidden bg-acid py-24 text-ink md:py-32">
      {/* Giant background word */}
      <p aria-hidden className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[28vw] uppercase leading-none text-ink/[0.06]">
        Club
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em]">Join the club — gratis</p>
          <h2 id="newsletter-title" className="font-display text-6xl uppercase leading-[0.85] sm:text-7xl md:text-8xl">
            Jangan sampe <br />
            telat lagi.
          </h2>
          <ul className="mt-8 space-y-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 font-medium">
                <CircleCheck className="h-5 w-5 shrink-0" aria-hidden />
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <label htmlFor="newsletter-email" className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.25em]">
              Email lo
            </label>
            <div className={cn("flex flex-col border-2 bg-bone sm:flex-row", isError ? "border-red-700" : "border-ink")}>
              <div className="flex flex-1 items-center gap-3 px-4">
                <Mail className="h-5 w-5 shrink-0 text-ink/60" aria-hidden />
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  maxLength={EMAIL_MAX_LENGTH}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isError) setStatus({ state: "idle" });
                  }}
                  aria-invalid={isError}
                  aria-describedby="newsletter-status"
                  className="h-14 w-full bg-transparent text-base text-ink placeholder:text-ink/45 focus:outline-none"
                />
              </div>
              {/* Honeypot: hidden from humans and assistive tech */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <button
                type="submit"
                disabled={status.state === "loading"}
                className={buttonClasses("dark", "h-14 shrink-0 py-0")}
              >
                {status.state === "loading" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                    Loading
                  </>
                ) : (
                  <>
                    Gabung
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </>
                )}
              </button>
            </div>

            <p id="newsletter-status" aria-live="polite" className="mt-3 min-h-6 text-sm font-medium">
              {status.state === "error" && (
                <span className="inline-flex items-center gap-2 text-red-800">
                  <CircleAlert className="h-4 w-4" aria-hidden />
                  {status.message}
                </span>
              )}
              {status.state === "success" && (
                <span className="inline-flex items-center gap-2">
                  <CircleCheck className="h-4 w-4" aria-hidden />
                  {status.message}
                </span>
              )}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-ink/70">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              No spam. Unsubscribe kapan aja.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
