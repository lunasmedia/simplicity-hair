import Link from "next/link";
import type { Product } from "@/data/products";
import { gbp } from "@/lib/format";
import { SmartImage } from "./SmartImage";

export function ProductCard({ product }: { product: Product }) {
  const hasOptions = product.options.length > 0;
  return (
    <article className="group relative flex flex-col">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden" aria-label={`${product.name}, from ${gbp(product.price)}`}>
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          className="aspect-[4/5] w-full object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 bg-cream/95 px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.2em] text-ink">
          {product.tag}
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-tight">
            <Link href={`/shop/${product.slug}`} className="hover:text-cocoa">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {hasOptions ? "From " : ""}
            <span className="text-ink">{gbp(product.price)}</span>
          </p>
        </div>
      </div>
      <Link
        href={`/shop/${product.slug}`}
        className="mt-4 border border-line py-3 text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] transition hover:border-ink hover:bg-ink hover:text-cream"
      >
        {hasOptions ? "Choose options" : "View product"}
      </Link>
    </article>
  );
}
