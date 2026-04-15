"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatEuro } from "@/lib/currency";
import { useMounted } from "@/lib/use-mounted";

const COUPON_DISCOUNT: Record<string, number> = {
  SAVE10: 0.1,
  WELCOME15: 0.15,
};

export function CartClient() {
  const mounted = useMounted();
  const { cart, removeFromCart, updateQuantity, coupon, applyCoupon, clearCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const visibleCart = mounted ? cart : [];

  const subtotal = useMemo(() => visibleCart.reduce((sum, item) => sum + item.price * item.quantity, 0), [visibleCart]);
  const discountRate = coupon ? COUPON_DISCOUNT[coupon] || 0 : 0;
  const discount = subtotal * discountRate;
  const shipping = subtotal > 120 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discount + shipping);

  if (visibleCart.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-neutral-300 bg-surface p-8 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        {visibleCart.map((item) => (
          <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-surface p-4 text-foreground dark:border-neutral-800">
            <Image src={item.image} alt={item.title} width={80} height={80} className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{formatEuro(item.price)}</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
              className="w-20 rounded-lg border border-neutral-200 bg-transparent px-2 py-1 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100"
            />
            <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500">
              Remove
            </button>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground dark:border-neutral-800">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Your order</h3>
        <div className="mt-3 space-y-1 text-sm">
          <p>Subtotal: {formatEuro(subtotal)}</p>
          <p>Discount: -{formatEuro(discount)}</p>
          <p>Shipping: {formatEuro(shipping)}</p>
          <p className="pt-2 text-base font-bold">Total: {formatEuro(total)}</p>
        </div>
        <div className="mt-4 space-y-2">
          <input
            value={couponInput}
            onChange={(event) => setCouponInput(event.target.value)}
            placeholder="Coupon: SAVE10"
            className="w-full rounded-xl border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400"
          />
          <div className="flex gap-2">
            <button onClick={() => applyCoupon(couponInput)} className="rounded-lg bg-[#ff6a00] px-3 py-2 text-sm text-white transition hover:bg-[#e95f00]">
              Apply
            </button>
            <button onClick={clearCoupon} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-700">
              Reset
            </button>
          </div>
        </div>
        <Link href="/checkout" className="mt-4 inline-flex w-full justify-center rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}
