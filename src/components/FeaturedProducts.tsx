"use client";

import { useProducts } from "@/lib/storage";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const products = useProducts().filter((p) => p.featured);
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
