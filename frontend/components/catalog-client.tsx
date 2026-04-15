"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { ProductCard } from "./product-card";

export function CatalogClient() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timeout);
  }, [query]);

  const productsQuery = useQuery({
    queryKey: ["products", debouncedQuery, category, sortBy],
    queryFn: () => fetchProducts({ q: debouncedQuery, category, sortBy, limit: 24 }),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const products = useMemo(() => productsQuery.data?.data || [], [productsQuery.data]);

  return (
    <section className="space-y-5">
      <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-surface p-4 text-foreground shadow-sm md:grid-cols-3 dark:border-neutral-800">
        <input
          placeholder="Search products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded-xl border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
          <option value="">All categories</option>
          {categoriesQuery.data?.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
          <option value="newest">Newest</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="title">Name</option>
        </select>
      </div>

      {productsQuery.isLoading ? (
        <p className="text-neutral-500 dark:text-neutral-400">Loading catalog...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
