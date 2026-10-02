"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { CartProvider } from "./CartProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    // "user" = honour the OS "reduce motion" setting for every animation.
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
