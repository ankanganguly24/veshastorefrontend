"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart-service";
import { CartItemCard } from "@/components/storefront/cart/cart-item-card";
import { CartSummary } from "@/components/storefront/cart/cart-summary";
import { CartEmptyState } from "@/components/storefront/cart/cart-empty-state";

/**
 * Cart Page
 * Main cart page that orchestrates cart display
 * Refactored to use React Query and component separation
 */
export default function CartPage() {
  // Fetch cart with React Query
  const { data: cart, isLoading, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await CartService.getCart();
      return res?.data?.cart || res?.data?.data?.cart || { items: [] };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center flex items-center justify-center gap-2 text-lg min-h-screen">
        <Loader2 className="animate-spin" />
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cart</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price_snapshot ?? 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{items.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} onUpdate={refetch} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary items={items} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
