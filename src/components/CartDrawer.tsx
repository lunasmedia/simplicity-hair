"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { gbp } from "@/lib/format";
import { SmartImage } from "./SmartImage";
import { QtyStepper } from "./QtyStepper";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [isOpen, close]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="cart-title" className="font-display text-2xl">
            Your cart {count > 0 && <span className="text-base text-muted">({count})</span>}
          </h2>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close cart" className="-mr-2 p-2">
            <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-2xl">Your cart is empty.</p>
            <p className="mt-2 text-sm text-muted">Custom units, made to reflect you.</p>
            <Link href="/shop" onClick={close} className="btn-outline mt-8">
              Shop products
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link href={`/shop/${item.slug}`} onClick={close} className="shrink-0">
                    <SmartImage src={item.image} alt={item.name} className="h-28 w-22 object-cover object-top" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/shop/${item.slug}`} onClick={close} className="font-display text-xl leading-tight">
                        {item.name}
                      </Link>
                      <p className="text-sm font-medium">{gbp(item.unitPrice * item.qty)}</p>
                    </div>
                    <dl className="mt-1 space-y-0.5 text-xs text-muted">
                      {Object.entries(item.options).map(([k, v]) => (
                        <div key={k} className="flex gap-1">
                          <dt>{k.replace(" (optional)", "")}:</dt>
                          <dd className="text-ink-soft">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper
                        size="sm"
                        value={item.qty}
                        onChange={(q) => setQty(item.key, q)}
                        min={0}
                        label={`Quantity for ${item.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        className="text-xs uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-2xl">{gbp(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">Tracked UK delivery calculated at checkout.</p>
              <Link href="/checkout" onClick={close} className="btn-primary mt-5 w-full">
                Checkout
              </Link>
              <button type="button" onClick={close} className="mt-3 w-full py-2 text-xs uppercase tracking-[0.18em] text-muted hover:text-ink">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
