import { Factory, Recycle, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { storyImage } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    icon: Factory,
    title: "100% lokal",
    body: "Dijahit dan disablon sama workshop partner di Bandung. Kita kenal tiap orang yang bikin baju lo.",
  },
  {
    icon: Recycle,
    title: "Small batch",
    body: "Produksi terbatas tiap drop. Nggak ada overproduction, nggak ada stok numpuk yang ujungnya dibuang.",
  },
  {
    icon: Users,
    title: "Community first",
    body: "Desain lahir dari obrolan tongkrongan. Member club dapet suara buat nentuin drop berikutnya.",
  },
];

const stats = [
  { value: `${siteConfig.foundedYear}`, label: "Est." },
  { value: "07", label: "Drops" },
  { value: "12K+", label: "Club members" },
];

export function BrandStory() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-acid">Our story</p>
          <h2 id="about-title" className="max-w-5xl font-display text-4xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">
            Lahir dari tongkrongan, <span className="text-outline">bukan</span> dari{" "}
            <span className="bg-acid px-2 text-ink">boardroom.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-ink-2 lg:aspect-auto lg:min-h-[480px]">
            <SafeImage
              src={storyImage.src}
              alt={storyImage.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale"
            />
            <span className="absolute bottom-4 left-4 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone">
              Workshop — Bandung
            </span>
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <Reveal delay={0.1} className="space-y-5 text-bone/80 md:text-lg">
              <p>
                {siteConfig.name} mulai tahun {siteConfig.foundedYear} dari kamar kos 3×4 meter, satu meja sablon
                manual, dan modal nekat. Kita capek lihat semua orang pake baju yang sama dari mall yang sama.
              </p>
              <p>
                Jadi kita bikin sendiri: potongan boxy, bahan heavyweight, grafis yang berisik. Tiap drop dibikin
                terbatas — bukan buat gimmick, tapi karena kita lebih milih bikin sedikit yang bener daripada banyak yang
                biasa aja.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="grid grid-cols-3 border-y border-bone/15">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse py-6 pr-4">
                    <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke md:text-xs">{stat.label}</dt>
                    <dd className="font-display text-4xl md:text-5xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-px bg-bone/15 md:mt-24 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i * 0.08} className="bg-ink p-6 md:p-8">
              <value.icon className="h-8 w-8 text-acid" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 font-display text-3xl uppercase">{value.title}</h3>
              <p className="mt-3 text-sm text-bone/70 md:text-base">{value.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
