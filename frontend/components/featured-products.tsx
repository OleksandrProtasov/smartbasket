"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "./product-card";

export function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => fetchProducts({ sortBy: "rating", order: "desc", limit: 8 }),
  });

  if (isLoading) {
    return <p className="text-neutral-500 dark:text-neutral-400">Loading trending products...</p>;
  }

  const items = data?.data || [];

  if (!items.length) {
    return <p className="text-neutral-500 dark:text-neutral-400">No featured products yet.</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Trending now</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Top rated picks</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
