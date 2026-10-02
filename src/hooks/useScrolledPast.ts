"use client";

import { useEffect, useState } from "react";

/**
 * True once the page is scrolled past `ratio` × viewport height.
 * Used by the navbar to stay transparent while the hero is on screen.
 */
export function useScrolledPast(ratio = 0.85): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPast(window.scrollY > window.innerHeight * ratio);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ratio]);

  return past;
}
