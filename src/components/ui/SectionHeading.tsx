import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  action?: ReactNode;
  className?: string;
  /** "light" = heading sits on the off-white background */
  tone?: "dark" | "light";
};

export function SectionHeading({ eyebrow, title, id, action, className, tone = "dark" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p className={cn("mb-3 font-mono text-xs uppercase tracking-[0.3em]", tone === "dark" ? "text-acid" : "text-ink/60")}>{eyebrow}</p>
        <h2 id={id} className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h2>
      </div>
      {action}
    </Reveal>
  );
}
