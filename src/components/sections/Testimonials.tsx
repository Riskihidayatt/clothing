import { BadgeCheck, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rating ${value} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < value ? "fill-acid text-acid" : "text-bone/25")}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="reviews-title"
          eyebrow="Reviews — 4.9/5 dari 2.300+ order"
          title={
            <>
              Kata <span className="text-outline">mereka</span>
            </>
          }
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i * 0.08}
              className="flex flex-col justify-between gap-8 border border-bone/15 bg-ink-2 p-6 transition-colors duration-300 hover:border-acid"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Rating value={t.rating} />
                  <Quote className="h-6 w-6 text-bone/20" aria-hidden />
                </div>
                <blockquote className="mt-5 text-bone/90">&ldquo;{t.quote}&rdquo;</blockquote>
              </div>
              <footer className="border-t border-bone/10 pt-4">
                <p className="flex items-center gap-1.5 font-medium">
                  {t.name}
                  <BadgeCheck className="h-4 w-4 text-acid" aria-hidden />
                  <span className="sr-only">(pembeli terverifikasi)</span>
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-smoke">
                  {t.city} · {t.product}
                </p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
