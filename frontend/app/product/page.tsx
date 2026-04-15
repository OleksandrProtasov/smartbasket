import { Suspense } from "react";
import { ProductPageClient } from "./product-page-client";

export default function ProductPage() {
  return (
    <Suspense fallback={<p className="text-neutral-500">Loading product...</p>}>
      <ProductPageClient />
    </Suspense>
  );
}
