import { Asterisk } from "lucide-react";
import { cn } from "@/lib/cn";

const defaultItems = ["New Drop", "Limited Stock", "Free Ongkir", "No Restock", "Made in Bandung"];

type MarqueeProps = {
  items?: string[];
  variant?: "acid" | "ink";
  reverse?: boolean;
  /** seconds per loop */
  duration?: number;
  className?: string;
};

function MarqueeRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-5 font-display text-2xl uppercase tracking-wide md:px-8 md:text-4xl">{item}</span>
          <Asterisk className="h-6 w-6 shrink-0 md:h-8 md:w-8" strokeWidth={2.5} aria-hidden />
        </li>
      ))}
    </ul>
  );
}

/** Infinite running text strip. Pauses on hover and for reduced-motion users. */
export function Marquee({ items = defaultItems, variant = "acid", reverse, duration = 32, className }: MarqueeProps) {
  // Repeat so one row is always wider than the viewport, then render it twice
  // and translate by -50% for a seamless loop.
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden border-y py-3 md:py-4",
        variant === "acid" ? "border-acid bg-acid text-ink" : "border-bone/15 bg-ink text-bone",
        className,
      )}
    >
      <p className="sr-only">{items.join(" • ")}</p>
      <div
        aria-hidden
        className={cn("marquee-track flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <MarqueeRow items={row} hidden />
        <MarqueeRow items={row} hidden />
      </div>
    </div>
  );
}
