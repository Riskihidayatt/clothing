"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ButtonLink } from "@/components/ui/Button";
import { heroImage } from "@/data/images";
import { siteConfig } from "@/config/site";

const headline = ["Wear", "the noise."];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <SafeImage
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[60%_30%] grayscale-[35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </motion.div>

      {/* Vertical edge label — desktop flourish */}
      <p className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-xs uppercase tracking-[0.4em] text-bone/60 lg:block">
        {siteConfig.nextDrop.name} · Bandung, ID
      </p>

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-8 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 inline-flex items-center gap-2 bg-acid px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" aria-hidden />
          New drop — live now
        </motion.p>

        <h1 id="hero-title" className="font-display uppercase leading-[0.82] tracking-tight">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                className={
                  i === 1
                    ? "block text-[19vw] text-acid md:text-[13vw] xl:text-[11.5rem]"
                    : "block text-[19vw] md:text-[13vw] xl:text-[11.5rem]"
                }
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-6 flex flex-col gap-8 md:mt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-base text-bone/85 md:text-lg">
            Streetwear lokal buat yang nggak mau kelihatan sama. Limited run, no restock —
            <span className="text-bone"> sekali sold out, ya udah, legend.</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#shop" variant="primary">
              Shop the Drop
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#lookbook" variant="outline">
              Lihat Lookbook
              <ArrowDownRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
