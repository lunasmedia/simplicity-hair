"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/lib/storage";
import { useCart } from "@/lib/cart";
import { gbp } from "@/lib/format";
import { site } from "@/data/site";
import { SmartImage } from "@/components/SmartImage";
import { QtyStepper } from "@/components/QtyStepper";

export function ProductConfigurator({ slug }: { slug: string }) {
  const product = useProducts(true).find((p) => p.slug === slug)!;
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0].label]))
  );

  const extras = product.options.reduce((sum, o) => {
    const v = o.values.find((v) => v.label === selected[o.name]);
    return sum + (v?.priceDelta ?? 0);
  }, 0);
  const unitPrice = product.price + extras;

  const onAdd = () =>
    add({
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      unitPrice,
      qty,
      options: Object.fromEntries(
        product.options
          .map((o) => {
            const v = o.values.find((x) => x.label === selected[o.name])!;
            return [o.name, v.priceDelta ? `${v.label} (+${gbp(v.priceDelta)})` : v.label] as const;
          })
          .filter(([name, label]) => !(name.includes("optional") && label === "None"))
      ),
    });

  return (
    <section className="container-x grid gap-10 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-14">
      {/* Gallery */}
      <div className="grid gap-3 sm:grid-cols-[88px_1fr]">
        <div className="order-2 flex gap-3 sm:order-1 sm:flex-col" role="tablist" aria-label="Product images">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`w-20 shrink-0 border transition sm:w-full ${active === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <SmartImage src={src} alt="" className="aspect-[4/5] w-full object-top" />
            </button>
          ))}
        </div>
        <div className="relative order-1 sm:order-2">
          <SmartImage key={active} src={product.images[active]} alt={`${product.name} — image ${active + 1}`} eager className="aspect-[4/5] w-full object-top animate-fade-up" />
          <span className="absolute left-4 top-4 bg-cream/95 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em]">{product.tag}</span>
        </div>
      </div>

      {/* Details */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">{product.category}</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">{product.name}</h1>
        <p className="mt-4 font-display text-3xl" aria-live="polite">
          {gbp(unitPrice)}
          {extras > 0 && <span className="ml-3 font-sans text-sm text-muted">Base {gbp(product.price)} + {gbp(extras)}</span>}
        </p>
        <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

        <div className="mt-8 space-y-7 border-t border-line pt-8">
          {product.options.map((opt) => (
            <fieldset key={opt.name}>
              <legend className="label">
                {opt.name}
                <span className="ml-2 normal-case tracking-normal text-muted">— {selected[opt.name]}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((v) => {
                  const id = `${opt.name}-${v.label}`.replace(/\W+/g, "-");
                  const checked = selected[opt.name] === v.label;
                  return (
                    <label
                      key={v.label}
                      htmlFor={id}
                      className={`cursor-pointer border px-4 py-2.5 text-sm transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cocoa ${
                        checked ? "border-ink bg-ink text-cream" : "border-line hover:border-ink"
                      }`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={opt.name}
                        value={v.label}
                        checked={checked}
                        onChange={() => setSelected((s) => ({ ...s, [opt.name]: v.label }))}
                        className="sr-only"
                      />
                      {v.label}
                      {v.priceDelta > 0 && <span className={checked ? "text-cream/70" : "text-muted"}> +{gbp(v.priceDelta)}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <div>
            <p className="label" id="qty-label">Quantity</p>
            <div className="flex flex-wrap items-stretch gap-3">
              <QtyStepper value={qty} onChange={setQty} label="Quantity" />
              <button type="button" onClick={onAdd} className="btn-primary flex-1">
                Add to cart — {gbp(unitPrice * qty)}
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-10 space-y-2 border-t border-line pt-8 text-sm text-ink-soft">
          {product.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span aria-hidden className="text-clay">—</span>
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-muted">{site.delivery}</p>
        <p className="mt-2 text-xs text-muted">
          Want it installed?{" "}
          <Link href="/booking?service=wig-install" className="link-underline text-ink">
            Book a wig install
          </Link>
        </p>
      </div>
    </section>
  );
}
