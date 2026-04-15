import { CatalogClient } from "@/components/catalog-client";

export default function CatalogPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Product catalog</h1>
      <CatalogClient />
    </div>
  );
}
