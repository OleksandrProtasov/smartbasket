export function PromoBanner() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-2xl bg-neutral-900 p-6 text-white">
        <p className="text-sm uppercase tracking-wide text-neutral-300">Spring Deal</p>
        <h3 className="mt-2 text-2xl font-bold">-15% on your first order</h3>
        <p className="mt-2 text-sm text-neutral-300">Use coupon WELCOME15 at checkout.</p>
      </article>
      <article className="rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground dark:border-neutral-800">
        <p className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Free Shipping</p>
        <h3 className="mt-2 text-2xl font-bold">Free shipping over €120</h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Add more items to unlock savings.</p>
      </article>
    </section>
  );
}
