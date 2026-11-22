"use client";

import { useMemo, useState } from "react";
import { productCategories, type ProductCategory } from "@/data/products";
import { useProducts } from "@/lib/storage";
import { ProductCard } from "@/components/ProductCard";
import { Chip } from "@/components/ui";

type Sort = "featured" | "price-asc" | "price-desc";

export function ShopCatalog() {
  const all = useProducts();
  const [cat, setCat] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const filtered = cat === "All" ? all : all.filter((p) => p.category === cat);
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [all, cat, sort]);

  return (
    <section className="container-x py-14">
      <div className="mb-12 flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {(["All", ...productCategories] as const).map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="eyebrow">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line bg-transparent px-3 py-2 text-sm focus:border-ink focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "product" : "products"}
      </p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center font-display text-2xl text-muted">Nothing here just yet.</p>
      )}
    </section>
  );
}
