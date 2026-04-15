"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { ProductCard } from "@/components/product-card";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentStore } from "@/store/recent-store";
import { useMounted } from "@/lib/use-mounted";

export default function ProfilePage() {
  const mounted = useMounted();
  const wishlist = useWishlistStore((state) => state.ids);
  const recent = useRecentStore((state) => state.viewed);
  const recentIds = (mounted ? recent : []).slice(0, 4);
  const wishlistIds = (mounted ? wishlist : []).slice(0, 4);

  const [recentProductsQuery, wishlistProductsQuery] = useQueries({
    queries: [
      {
        queryKey: ["recent-products", recentIds],
        queryFn: () => Promise.all(recentIds.map((id) => fetchProductById(id))),
        enabled: recentIds.length > 0,
      },
      {
        queryKey: ["wishlist-products", wishlistIds],
        queryFn: () => Promise.all(wishlistIds.map((id) => fetchProductById(id))),
        enabled: wishlistIds.length > 0,
      },
    ],
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground dark:border-neutral-800">
          <h2 className="font-semibold text-foreground">Wishlist</h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Wishlist items: {wishlist.length}</p>
          {wishlistProductsQuery.data && wishlistProductsQuery.data.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {wishlistProductsQuery.data.map((product) => (
                <Link key={product.id} href={`/product?id=${encodeURIComponent(product.id)}`} className="text-sm text-[#ff6a00] hover:text-[#e95f00]">
                  {product.title}
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">You have not added any wishlist items yet.</p>
          )}
        </section>
        <section className="rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground dark:border-neutral-800">
          <h2 className="font-semibold text-foreground">Recently viewed</h2>
          {recentProductsQuery.data && recentProductsQuery.data.length > 0 ? (
            <ul className="mt-2 space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
              {recentProductsQuery.data.map((product) => (
                <li key={product.id}>
                  <Link href={`/product?id=${encodeURIComponent(product.id)}`}>{product.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Your viewing history is empty.</p>
          )}
        </section>
      </div>

      {wishlistProductsQuery.data && wishlistProductsQuery.data.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Wishlist products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProductsQuery.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
