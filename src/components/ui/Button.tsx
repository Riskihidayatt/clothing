import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-acid text-ink hover:bg-bone",
  outline: "border border-bone/40 text-bone hover:border-acid hover:text-acid",
  dark: "bg-ink text-bone hover:bg-ink/80",
};

export const buttonBase =
  "group inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(buttonBase, variants[variant], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
