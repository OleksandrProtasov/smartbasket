"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "@/lib/api";
import { useCartStore } from "@/store/cart-store";
import { useRecentStore } from "@/store/recent-store";
import { ProductCard } from "./product-card";
import { formatEuro } from "@/lib/currency";

export function ProductDetailsClient({ id }: { id: string }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const pushViewed = useRecentStore((state) => state.pushViewed);

  const productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const recommendationsQuery = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => fetchProducts({ limit: 4 }),
  });

  useEffect(() => {
    if (productQuery.data?.id) {
      pushViewed(productQuery.data.id);
    }
  }, [productQuery.data, pushViewed]);

  if (productQuery.isLoading) {
    return <p className="text-neutral-500 dark:text-neutral-400">Loading product...</p>;
  }

  if (!productQuery.data) {
    return <p className="text-red-500">Product not found.</p>;
  }

  const product = productQuery.data;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground md:grid-cols-2 dark:border-neutral-800">
        <Image src={product.image} alt={product.title} width={640} height={420} className="h-80 w-full rounded-xl object-cover" />
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{product.title}</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">{product.description}</p>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">Category: {product.category}</p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Rating: {product.rating}</p>
          <p className="mt-6 text-2xl font-bold text-[#ff6a00]">{formatEuro(product.price)}</p>
          <button onClick={() => addToCart(product)} className="mt-6 rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">
            Add to cart
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">You may also like</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {recommendationsQuery.data?.data
            ?.filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
}
