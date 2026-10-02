"use client";

import { useEffect, useState } from "react";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";

/**
 * Live countdown to `target`. Returns `null` until mounted so the server
 * render and the first client render match (no hydration mismatch).
 */
export function useCountdown(target: string | number | Date): TimeLeft | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return now === null ? null : getTimeLeft(target, now);
}
