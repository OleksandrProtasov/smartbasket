"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { useCompareStore } from "@/store/compare-store";
import { formatEuro } from "@/lib/currency";
import { useMounted } from "@/lib/use-mounted";

export default function ComparePage() {
  const mounted = useMounted();
  const ids = useCompareStore((state) => state.ids);
  const clear = useCompareStore((state) => state.clear);
  const visibleIds = mounted ? ids : [];

  const { data, isLoading } = useQuery({
    queryKey: ["compare-products", visibleIds],
    queryFn: () => Promise.all(visibleIds.map((id) => fetchProductById(id))),
    enabled: visibleIds.length > 0,
  });

  if (!visibleIds.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-surface p-8 text-foreground dark:border-neutral-700">
        <h1 className="text-2xl font-bold text-foreground">Product comparison</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">Add products from the catalog to compare them.</p>
        <Link href="/catalog" className="mt-4 inline-flex rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Product comparison</h1>
        <button onClick={clear} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-700">
          Clear all
        </button>
      </div>
      {isLoading ? <p className="text-neutral-500 dark:text-neutral-400">Loading...</p> : null}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-surface text-foreground dark:border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-100 text-left dark:border-neutral-800 dark:bg-neutral-950">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              {data?.map((item) => (
                <th key={item.id} className="px-4 py-3 font-semibold">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100 dark:border-neutral-800">
              <td className="px-4 py-3 font-medium">Price</td>
              {data?.map((item) => (
                <td key={item.id} className="px-4 py-3">
                  {formatEuro(item.price)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100 dark:border-neutral-800">
              <td className="px-4 py-3 font-medium">Rating</td>
              {data?.map((item) => (
                <td key={item.id} className="px-4 py-3">
                  {item.rating.toFixed(1)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100 dark:border-neutral-800">
              <td className="px-4 py-3 font-medium">Category</td>
              {data?.map((item) => (
                <td key={item.id} className="px-4 py-3">
                  {item.category}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">In stock</td>
              {data?.map((item) => (
                <td key={item.id} className="px-4 py-3">
                  {item.stock}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
