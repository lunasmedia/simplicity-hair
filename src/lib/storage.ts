"use client";

import { useCallback, useEffect, useState } from "react";
import { products as seedProducts, type Product } from "@/data/products";
import { services as seedServices, type Service } from "@/data/services";

/**
 * Tiny localStorage-backed store. Every key is namespaced and changes are
 * broadcast so all components using the same key stay in sync.
 * Swap these helpers for API calls to move to a real backend.
 */
const NS = "simplicity:";
const EVT = "simplicity-storage";

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(NS + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory only */
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: key }));
}

export function useStore<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(readStore(key, fallback));
    setReady(true);
    const sync = (e: Event) => {
      const k = e instanceof CustomEvent ? e.detail : (e as StorageEvent).key?.slice(NS.length);
      if (k === key) setValue(readStore(key, fallback));
    };
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (p: T) => T)(readStore(key, fallback))
          : next;
      setValue(resolved);
      writeStore(key, resolved);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  return [value, update, ready] as const;
}

/* ---------- Domain records ---------- */

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  duration: number;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
};

export type OrderEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  items: { name: string; options: Record<string, string>; qty: number; unitPrice: number }[];
  subtotal: number;
  status: "new" | "contacted" | "fulfilled";
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export const useBookings = () => useStore<Booking[]>("bookings", []);
export const useOrders = () => useStore<OrderEnquiry[]>("orders", []);
export const useMessages = () => useStore<ContactMessage[]>("messages", []);

/* ---------- Catalogue overrides (optional local edits layered over seed data) ---------- */

type ProductOverride = Partial<Pick<Product, "price" | "tag" | "short">> & { hidden?: boolean };
type ServiceOverride = Partial<Pick<Service, "price" | "duration" | "description">> & { hidden?: boolean };

export const useProductOverrides = () =>
  useStore<Record<string, ProductOverride>>("product-overrides", {});
export const useServiceOverrides = () =>
  useStore<Record<string, ServiceOverride>>("service-overrides", {});

export function useProducts(includeHidden = false) {
  const [ov] = useProductOverrides();
  return seedProducts
    .map((p) => ({ ...p, ...ov[p.slug], hidden: !!ov[p.slug]?.hidden }))
    .filter((p) => includeHidden || !p.hidden);
}

export function useServices(includeHidden = false) {
  const [ov] = useServiceOverrides();
  return seedServices
    .map((s) => ({ ...s, ...ov[s.id], hidden: !!ov[s.id]?.hidden }))
    .filter((s) => includeHidden || !s.hidden);
}
