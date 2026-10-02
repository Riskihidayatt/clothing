"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Shirt } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * next/image with a branded fallback, so a dead placeholder URL
 * never leaves a broken-image icon in the layout.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#1a1a1a,#0a0a0a_60%,#1f2a00)]",
          props.fill && "absolute inset-0",
          className,
        )}
      >
        <Shirt aria-hidden className="h-10 w-10 text-acid/60" strokeWidth={1.25} />
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
