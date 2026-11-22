"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useOrders, type OrderEnquiry } from "@/lib/storage";
import { gbp, uid } from "@/lib/format";
import { SmartImage } from "@/components/SmartImage";

const DELIVERY = 9.95;

export function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [, setOrders] = useOrders();
  const [done, setDone] = useState<OrderEnquiry | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: OrderEnquiry = {
      id: uid(),
      ...form,
      items: items.map((i) => ({ name: i.name, options: i.options, qty: i.qty, unitPrice: i.unitPrice })),
      subtotal,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, order]);
    clear();
    setDone(order);
  };

  if (done) {
    return (
      <section className="container-x py-16">
        <div className="max-w-2xl border border-line bg-white/50 p-10" role="status">
          <p className="eyebrow">Order request received</p>
          <h2 className="display mt-4 text-5xl">Thank you, {done.name.split(" ")[0]}.</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            We&apos;ll email {done.email} shortly to confirm your measurements, finalise your options and send a secure
            payment link. Reference <strong className="font-medium text-ink">{done.id.toUpperCase()}</strong>.
          </p>
          <Link href="/shop" className="btn-primary mt-8">Continue shopping</Link>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="container-x py-24 text-center">
        <p className="font-display text-3xl">Your cart is empty.</p>
        <Link href="/shop" className="btn-outline mt-8">Shop products</Link>
      </section>
    );
  }

  return (
    <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_400px]">
      <form onSubmit={submit} className="grid h-fit gap-5 sm:grid-cols-2">
        <h2 className="display text-3xl sm:col-span-2">Delivery details</h2>
        <div className="sm:col-span-2">
          <label htmlFor="o-name" className="label">Full name</label>
          <input id="o-name" required autoComplete="name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="o-email" className="label">Email</label>
          <input id="o-email" type="email" required autoComplete="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label htmlFor="o-phone" className="label">Phone</label>
          <input id="o-phone" type="tel" required autoComplete="tel" className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-address" className="label">UK delivery address</label>
          <textarea id="o-address" required rows={3} autoComplete="street-address" className="field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-notes" className="label">Notes (optional)</label>
          <textarea id="o-notes" rows={3} className="field" placeholder="Head measurements, styling requests…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        <p className="text-xs leading-relaxed text-muted sm:col-span-2">
          Placing an order request does not take payment. We&apos;ll confirm the details with you and send a secure payment link.
          By continuing you agree to our <Link href="/client-agreement" className="link-underline text-ink">client agreement</Link>.
        </p>
        <button type="submit" className="btn-primary sm:col-span-2">Place order request</button>
      </form>

      <aside className="h-fit border border-line bg-sand/50 p-7 lg:sticky lg:top-28" aria-label="Order summary">
        <p className="eyebrow mb-5">Order summary</p>
        <ul className="divide-y divide-line">
          {items.map((i) => (
            <li key={i.key} className="flex gap-4 py-4">
              <SmartImage src={i.image} alt={i.name} className="h-20 w-16" />
              <div className="flex-1 text-sm">
                <p className="font-display text-lg leading-tight">{i.name} × {i.qty}</p>
                <p className="text-xs text-muted">{Object.values(i.options).join(" · ")}</p>
              </div>
              <p className="text-sm">{gbp(i.unitPrice * i.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{gbp(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Tracked UK delivery</dt><dd>{gbp(DELIVERY)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3"><dt className="eyebrow self-center">Total</dt><dd className="font-display text-2xl">{gbp(subtotal + DELIVERY)}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
