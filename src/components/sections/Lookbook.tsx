import { lookbook, type LookbookItem } from "@/data/lookbook";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const spanClasses: Record<LookbookItem["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

const spanSizes: Record<LookbookItem["span"], string> = {
  tall: "(min-width: 768px) 25vw, 50vw",
  wide: "(min-width: 768px) 50vw, 100vw",
  square: "(min-width: 768px) 25vw, 50vw",
};

export function Lookbook() {
  return (
    <section id="lookbook" aria-labelledby="lookbook-title" className="bg-bone py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          id="lookbook-title"
          eyebrow="Lookbook — SS26"
          title="After dark."
          tone="light"
          action={
            <p className="max-w-xs text-sm text-ink/70">
              Dipotret di sudut-sudut Bandung jam 2 pagi. Raw, no filter, no drama.
            </p>
          }
        />

        <ul className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[240px] md:auto-rows-[280px] md:grid-cols-4 md:gap-3">
          {lookbook.map((look, i) => (
            <Reveal as="li" key={look.id} delay={i * 0.05} className={cn("relative", spanClasses[look.span])}>
              <figure className="group relative h-full w-full overflow-hidden bg-ink">
                <SafeImage
                  src={look.src}
                  alt={look.alt}
                  fill
                  sizes={spanSizes[look.span]}
                  className="object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone md:translate-y-2 md:p-4 md:text-xs md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <span>{look.caption}</span>
                  <span className="text-acid">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
