"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type CartContextValue = {
  count: number;
  /** last item added — announced to screen readers */
  lastAdded: string | null;
  addItem: (name: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Minimal client-side cart state for the landing page.
 * Swap with a real cart/checkout integration (Shopify, Midtrans, dsb) later.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addItem = useCallback((name: string) => {
    setCount((c) => c + 1);
    setLastAdded(name);
  }, []);

  const value = useMemo(() => ({ count, lastAdded, addItem }), [count, lastAdded, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
