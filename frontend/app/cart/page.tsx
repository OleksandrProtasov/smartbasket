import { CartClient } from "@/components/cart-client";

export default function CartPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Cart</h1>
      <CartClient />
    </div>
  );
}
