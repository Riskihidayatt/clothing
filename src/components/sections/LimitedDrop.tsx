import { BellRing, CalendarClock, Flame } from "lucide-react";
import { siteConfig } from "@/config/site";
import { dropImage } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DropCountdown } from "./DropCountdown";

const dropDateLabel = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
}).format(new Date(siteConfig.nextDrop.date));

export function LimitedDrop() {
  const { name, quantity, date } = siteConfig.nextDrop;

  return (
    <section id="drops" aria-labelledby="drops-title" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
            <SafeImage
              src={dropImage.src}
              alt={dropImage.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
            />
          </div>
          <div className="absolute -right-2 -top-4 rotate-6 bg-acid px-4 py-3 text-ink shadow-[6px_6px_0_0_#f2efe9] md:-right-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Limited</p>
            <p className="font-display text-3xl uppercase leading-none">Only {quantity} pcs</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-acid">
              <Flame className="h-4 w-4" aria-hidden />
              Next limited drop
            </p>
            <h2 id="drops-title" className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              {name}
            </h2>
            <p className="mt-6 max-w-lg text-bone/80">
              Koleksi malam buat yang hidupnya baru mulai pas lampu jalan nyala. Cuma {quantity} pcs per artikel,
              nomor seri di tiap label. Abis ya abis — kita nggak restock.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-smoke">
              <CalendarClock className="h-4 w-4" aria-hidden />
              <time dateTime={date}>{dropDateLabel} WIB</time>
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <DropCountdown target={date} />
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#newsletter" variant="primary">
              <BellRing className="h-4 w-4" aria-hidden />
              Ingetin Gue
            </ButtonLink>
            <ButtonLink href="#lookbook" variant="outline">
              Preview koleksi
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
