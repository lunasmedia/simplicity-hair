"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useStore } from "./storage";

export type CartItem = {
  key: string; // slug + options signature
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  options: Record<string, string>;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "key">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const keyFor = (slug: string, options: Record<string, string>) =>
  slug + "|" + Object.entries(options).map(([k, v]) => `${k}=${v}`).sort().join("&");

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useStore<CartItem[]>("cart", []);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback<CartContextValue["add"]>(
    (item) => {
      const key = keyFor(item.slug, item.options);
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
        }
        return [...prev, { ...item, key }];
      });
      setOpen(true);
    },
    [setItems]
  );

  const setQty = useCallback(
    (key: string, qty: number) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))
      ),
    [setItems]
  );

  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), [setItems]);
  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.unitPrice, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, isOpen, add, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
