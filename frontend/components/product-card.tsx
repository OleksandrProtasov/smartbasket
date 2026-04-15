"use client";

import Link from "next/link";
import Image from "next/image";
import { GitCompareArrows, Heart, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { formatEuro } from "@/lib/currency";
import { useMounted } from "@/lib/use-mounted";

export function ProductCard({ product }: { product: Product }) {
  const mounted = useMounted();
  const addToCart = useCartStore((state) => state.addToCart);
  const wishlist = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const compareIds = useCompareStore((state) => state.ids);
  const toggleCompare = useCompareStore((state) => state.toggle);
  const isFav = mounted ? wishlist.includes(product.id) : false;
  const isCompared = mounted ? compareIds.includes(product.id) : false;

  return (
    <article className="group rounded-2xl border border-neutral-200 bg-surface p-4 text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800">
      <Link href={`/product?id=${encodeURIComponent(product.id)}`} className="block">
        <Image src={product.image} alt={product.title} width={320} height={176} className="h-44 w-full rounded-xl object-cover transition group-hover:scale-[1.02]" />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">{product.category}</span>
          <span className="rounded-full bg-[#ff6a00] px-2 py-1 text-white">Rating {product.rating.toFixed(1)}</span>
        </div>
        <h3 className="mt-3 line-clamp-1 font-semibold text-neutral-900 dark:text-neutral-100">{product.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">{product.description}</p>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-black text-neutral-950 dark:text-neutral-100">{formatEuro(product.price)}</span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={clsx(
              "rounded-lg border p-2",
              isFav ? "border-rose-300 bg-rose-50 text-rose-600" : "border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300",
            )}
          >
            <Heart size={16} />
          </button>
          <button onClick={() => addToCart(product)} className="rounded-lg bg-[#ff6a00] p-2 text-white transition hover:bg-[#e95f00]">
            <ShoppingBag size={16} />
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={clsx(
              "rounded-lg border p-2",
              isCompared ? "border-emerald-300 bg-emerald-50 text-emerald-600" : "border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300",
            )}
            title="Compare product"
          >
            <GitCompareArrows size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
