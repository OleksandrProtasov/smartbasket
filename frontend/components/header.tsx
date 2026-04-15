"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { useMounted } from "@/lib/use-mounted";

export function Header() {
  const mounted = useMounted();
  const cartCountState = useCartStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const wishlistCountState = useWishlistStore((state) => state.ids.length);
  const compareCountState = useCompareStore((state) => state.ids.length);

  const cartCount = mounted ? cartCountState : 0;
  const wishlistCount = mounted ? wishlistCountState : 0;
  const compareCount = mounted ? compareCountState : 0;

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-surface/95 text-foreground backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-neutral-950 dark:text-neutral-100">
          SmartBasket
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-neutral-700">
          <Link href="/catalog" className="rounded-full px-3 py-1.5 transition hover:bg-neutral-100">Catalog</Link>
          <Link href="/profile" className="rounded-full px-3 py-1.5 transition hover:bg-neutral-100">Profile</Link>
          <Link href="/compare" className="rounded-full px-3 py-1.5 transition hover:bg-neutral-100">Compare {compareCount}</Link>
          <Link href="/cart" className="flex items-center gap-1 rounded-full bg-[#ff6a00] px-3 py-1.5 text-white transition hover:bg-[#e95f00]">
            <ShoppingCart size={15} /> {cartCount}
          </Link>
          <Link href="/profile" className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5">
            <Heart size={15} /> {wishlistCount}
          </Link>
        </nav>
      </div>
    </header>
  );
}
