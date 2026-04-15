"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="rounded-2xl bg-emerald-50 p-6 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
        Order successfully placed (demo).
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form className="space-y-3 rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <input placeholder="Full name" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
        <input placeholder="Email" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
        <input placeholder="Shipping address" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
        <button type="button" onClick={() => setDone(true)} className="rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">
          Confirm order
        </button>
      </form>
      <aside className="rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground dark:border-neutral-800">
        <h2 className="text-xl font-semibold text-foreground">Items in your order</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
