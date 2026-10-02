"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { padTwo } from "@/lib/format";

export function DropCountdown({ target }: { target: string }) {
  const timeLeft = useCountdown(target);

  if (timeLeft?.isOver) {
    return (
      <p className="border border-acid px-6 py-8 font-display text-5xl uppercase text-acid">The drop is live.</p>
    );
  }

  const units = [
    { label: "Hari", value: timeLeft?.days },
    { label: "Jam", value: timeLeft?.hours },
    { label: "Menit", value: timeLeft?.minutes },
    { label: "Detik", value: timeLeft?.seconds },
  ];

  return (
    <div role="timer" aria-label="Hitung mundur menuju drop" className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="border border-bone/15 bg-ink-2 px-2 py-4 text-center sm:py-6">
          <span className="block font-display text-4xl tabular-nums sm:text-6xl">
            {unit.value === undefined ? "--" : padTwo(unit.value)}
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-smoke sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
