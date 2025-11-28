"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart-service";
import { CartItemCard } from "@/components/storefront/cart/cart-item-card";
import { CartSummary } from "@/components/storefront/cart/cart-summary";
import { CartEmptyState } from "@/components/storefront/cart/cart-empty-state";

/**
 * Cart Page
 * Main cart page with minimal, sophisticated design
 */
export default function CartPage() {
  // Fetch cart with React Query
  const { data: cart, isLoading, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await CartService.getCart();
      return res?.data?.cart || res?.data?.data?.cart || { items: [] };
    },
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Loading cart...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Error Loading Cart</h2>
          <p className="text-sm text-gray-600 mb-6">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="px-6 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light mb-2 text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <div className="w-12 h-px bg-primary mb-3"></div>
          <p className="text-sm text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
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
