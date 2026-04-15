import Link from "next/link";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";
import { FeaturedProducts } from "@/components/featured-products";
import { PromoBanner } from "@/components/promo-banner";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-neutral-950 px-6 py-14 text-white md:px-12">
        <p className="inline-flex rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-wider text-neutral-300">
          New season
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight md:text-5xl">Modern essentials for your smart basket</h1>
        <p className="mt-3 max-w-xl text-neutral-300">Clean design, real products, and a premium shopping flow inspired by top fashion marketplaces.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/catalog" className="rounded-xl bg-[#ff6a00] px-5 py-2.5 font-semibold text-white transition hover:bg-[#e95f00]">
            Browse catalog
          </Link>
          <Link href="/cart" className="rounded-xl border border-neutral-500 px-5 py-2.5 font-semibold text-neutral-100 transition hover:border-neutral-300">
            Open cart
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground shadow-sm dark:border-neutral-800">
          <Sparkles className="text-[#ff6a00]" />
          <h3 className="mt-2 font-semibold text-foreground">Smart search</h3>
          <p className="text-sm text-neutral-500">Filters, sorting, and quick product discovery.</p>
        </article>
        <article className="rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground shadow-sm dark:border-neutral-800">
          <Truck className="text-[#ff6a00]" />
          <h3 className="mt-2 font-semibold text-foreground">Fast delivery</h3>
          <p className="text-sm text-neutral-500">Free shipping on orders over €120.</p>
        </article>
        <article className="rounded-2xl border border-neutral-200 bg-surface p-5 text-foreground shadow-sm dark:border-neutral-800">
          <ShieldCheck className="text-[#ff6a00]" />
          <h3 className="mt-2 font-semibold text-foreground">Secure checkout</h3>
          <p className="text-sm text-neutral-500">Demo checkout flow for purchase testing.</p>
        </article>
      </section>

      <PromoBanner />
      <FeaturedProducts />
    </div>
  );
}
