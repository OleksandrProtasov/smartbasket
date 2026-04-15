"use client";

import { useSearchParams } from "next/navigation";
import { ProductDetailsClient } from "@/components/product-details-client";

export function ProductPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <p className="text-neutral-500">Product ID is missing.</p>;
  }

  return <ProductDetailsClient id={id} />;
}
